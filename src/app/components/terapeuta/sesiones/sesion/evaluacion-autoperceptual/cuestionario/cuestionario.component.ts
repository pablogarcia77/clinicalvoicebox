import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cuestionario, emptyCuestionario } from 'src/app/models/evaluaciones/cuestionario';
import { Resultado } from 'src/app/models/evaluaciones/resultado';
import { Valoracion } from 'src/app/models/evaluaciones/valoracion';
import { Persona } from 'src/app/models/persona';
import { AutoperceptualService } from 'src/app/services/autoperceptual.service';
import { ValoracionesService } from 'src/app/services/valoraciones.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit, OnDestroy {

  id_tarea!: number;
  paciente: Persona;
  cuestionario: Cuestionario = emptyCuestionario();
  valoraciones: Array<Valoracion> = new Array<Valoracion>();
  isAnswer: boolean = false;
  isSave: boolean = false;

  resultados: Array<Resultado> = new Array<Resultado>();

  puntajes = {
    // EDTV
    frecuencia: null,
    intensidad: null,
    // VRQOL
    fisico: null,
    emocional: null,
    bruto: null,
    // VHI-30
    totalVHI: null,
    subescalaFuncional: null,
    subescalaOrganica: null,
    subescalaEmocional: null,
    indiceDiscapacidadVocal: null,
    indiceDiscapacidad1: null,
    indiceDiscapacidad2: null,
    indiceDiscapacidad3: null,
    // p-VHI pediatric
    parteFuncional: null,
    parteFisica: null,
    parteEmocional: null,
  }

  autoperceptualSubscription!: Subscription;
  valoracionSubscription!: Subscription;

  constructor(
    private autoperceptualService: AutoperceptualService,
    private valoracionesService: ValoracionesService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.paciente = JSON.parse(localStorage.getItem('paciente'));
    this.loadCuestionario();
  }

  ngOnDestroy(): void {
    this.autoperceptualSubscription && this.autoperceptualSubscription.unsubscribe();
    this.valoracionSubscription && this.valoracionSubscription.unsubscribe();
  }

  loadCuestionario(): void {
    this.activatedRoute.params.subscribe(
      response => this.id_tarea = response.id_tarea
    );
    this.autoperceptualSubscription = this.autoperceptualService.getCuestionario(this.id_tarea)
      .subscribe(
        response => {
          this.cuestionario = response;
          this.loadValoraciones(this.cuestionario.id_tipo_test);
        }
    )
  }

  loadValoraciones(id: number): void {
    this.valoracionSubscription = this.valoracionesService.getValoracionesCuestionarios(id)
      .subscribe(
        response => this.valoraciones = response
      );
  }

  answer(): void {
    this.isAnswer = true;
  }

  review(): void {
    this.isAnswer = false;
    this.isSave = true;
  }

  save(resultados: TemplateRef<any>): void {
    this.calculateEDTV();
    this.dialog.open(resultados)
  }

  addValoracion(id_pregunta: number, event: any): void {
    this.resultados = [...this.resultados, {id_pregunta, valoracion: event.value}]
    this.resultados = this.removeDuplicates(this.resultados, 'id_pregunta');
    console.log(this.resultados)
  }

  removeDuplicates(originalArray, prop) {
    let newArray = [];
    let lookupObject  = {};

    for(let i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(let i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
     return newArray;
  }

  calculateEDTV(): void {
    /** calculo de resultados para EDTV */
    this.resultados.forEach(res => {
      if (res.id_pregunta >= 332 && res.id_pregunta <= 339){
        this.puntajes.frecuencia += res.valoracion.puntos;
      }
      if (res.id_pregunta >= 340 && res.id_pregunta <= 347){
        this.puntajes.intensidad += res.valoracion.puntos;
      }
    });
    this.puntajes.frecuencia = (this.puntajes.frecuencia / 8).toFixed(2);
    this.puntajes.intensidad = (this.puntajes.intensidad / 8).toFixed(2);
  }

  calculateVRQOL(): void {
    let p1: number = 0;
    let p2: number = 0;
    let bruto: number = 0;

    this.resultados.forEach((res, index) => {
      index >= 0 && index < 6 ? p1 += res.valoracion.puntos : p2 += res.valoracion.puntos;
      bruto += res.valoracion.puntos;
    });

    // Formula dominio funcionamiento fisico, la cantidad de items es 6
    let fisico = 100 - ((7 - 6) / (p1 - 6) * 100);

    // Formula dominio socioemocional, la cantidad de items es 4
    let emocional = 100 - ((5 - 4) / (p2 - 4) * 100);

    this.puntajes.fisico = fisico.toFixed(2);
    this.puntajes.emocional = emocional.toFixed(2);
    this.puntajes.bruto = bruto;
  }

  calculateVHIAndVFHQ(): void {
    // Cuuestionarios VHI-30 / VHI-Partner / VFQH
    // constan de 30 preguntas que se toman grupos de 10
    // Inicio de puntajes parciales
    // Rangos de indices:
    // primero: [0 ; 10)
    let f: number = 0;
    // segundo: [10 ; 20)
    let o: number = 0;
    // tercero: [20 : lenght)
    let e: number = 0;

    this.resultados.forEach((res, index) => {
      (index >= 0 && index < 10) ?
        f += res.valoracion.puntos :
        (index >= 10 && index < 20) ?
          o += res.valoracion.puntos :
          e += res.valoracion.puntos;
    });

    // Si el cuestionario es VHI-30 se formatea el puntaje
    if(this.cuestionario.id_titulo == 2){
      this.formatVHI30(f, o, e);
    } else {
      // Cuestionario p-VHI pediatric 23 preguntas
      if(this.cuestionario.id_titulo == 5){
        this.formatPediatric();
      } else {
        // Cuestionario VOISS
        if(this.cuestionario.id_titulo == 7){
          this.formatVOISS();
        } else {
          // Cuestionario 16
          if(this.cuestionario.id_titulo == 16){

          } else {
            // todos los otros cuestionarios
          }
        }
      }
    }

  }

  formatVOISS(): void {
    // Calcular totales parciales
    // Impedimento/Limitacion
    let indexes = {
      impedimento: [0,1,3,4,5,7,8,13,15,16,19,22,23,24,26],
      emocional: [9,12,14,17,20,27,28,29],
      fisico: [2,6,10,11,18,21,25]
    }
    let impedimento: number = 0;
    let emocional: number = 0;
    let fisico: number = 0;
    this.resultados.forEach((res, index) => {
      if(res.valoracion.puntos)
    })
  }

  formatPediatric(): void {
    let funcional: number = 0;
    let fisica: number = 0;
    let emocional: number = 0;
    // Parte 1 - Funcional del 1 al 7
    // Parte 2 - Fisica del 8 al 16
    // Parte 3 - Emocional del 17 al 23
    this.resultados.forEach((res, index) => {
      (index < 7) ? funcional += res.valoracion.puntos :
        (index >= 7 && index < 16) ? fisica += res.valoracion.puntos :
          emocional += res.valoracion.puntos;
    })
  }

  formatVHI30(f: number, o: number, e: number): void {
    let total = f + o + e;
    this.puntajes.totalVHI = total;
    // Si el total es 10 o menor el indice es normal
    // Interpreto resultados de discapacidad vocal general
    this.puntajes.indiceDiscapacidadVocal = (total <= 10) ? "Normal" :
      (total > 10 && total <= 30) ? "Leve" :
        (total > 30 && total <= 60) ? "Moderada" :
          (total > 60 && total <= 90) ? "Severa" : "Grave";

    // Interpreto resultados de discapacidad f
    this.puntajes.indiceDiscapacidad1 = this.getResultadoDiscapacidad(f);
    
    // Interpreto resultados de discapacidad o
    this.puntajes.indiceDiscapacidad2 = this.getResultadoDiscapacidad(o);

    // Interpreto resultados de discapacidad e
    this.puntajes.indiceDiscapacidad3 = this.getResultadoDiscapacidad(e);

    this.puntajes.subescalaFuncional = f;
    this.puntajes.subescalaOrganica = o;
    this.puntajes.subescalaEmocional = e;
  }

  getResultadoDiscapacidad(a: number): string {
    let indice = "Normal";
    indice = (a > 5 && a <= 20) ? "Leve" :
      (a > 20 && a <= 30) ? "Moderada" : "Severa";
    return indice;
  }

  calculateSpecial(): void {
    
  }


}
