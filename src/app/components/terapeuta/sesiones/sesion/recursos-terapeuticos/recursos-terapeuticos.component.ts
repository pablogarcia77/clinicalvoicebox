import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResultadosIndicacionesComponent } from 'src/app/components/resultados-indicaciones/resultados-indicaciones.component';
import { Indicacion } from 'src/app/models/indicacion';
import { Persona } from 'src/app/models/persona';
import { IndicacionesService } from 'src/app/services/indicaciones.service';
import { ValoracionesService } from 'src/app/services/valoraciones.service';

@Component({
  selector: 'app-recursos-terapeuticos',
  templateUrl: './recursos-terapeuticos.component.html',
  styleUrls: ['./recursos-terapeuticos.component.css']
})
export class RecursosTerapeuticosComponent implements OnInit, OnDestroy {
  
  public paciente: Persona

  public indicacionEnviar: Indicacion

  public objetivos = ['Habilitación vocal','Entrenamiento vocal','Preparación vocal','Rehabilitación vocal']

  public indicaciones: Array<any>

  public indirecta: any;

  public auditivas: Array<any>

  public somatosensoriales: Array<any>

  public muscoloesqueleticas: Array<any>

  public respiratorias: Array<any>

  public vocales: Array<any>
  
  public funcionVocales: Array<any> = Array<any>();

  public otros: Array<any>

  public externos: Array<any>

  public sesion: any

  valoraciones: Array<any> = new Array<any>();

  public glissandos: Array<any> = new Array<any>();

  form: FormGroup = this.fb.group({
    sesion: [],
    paciente: [],
    tipo: ['', [Validators.required]],
    indicaciones: [''],
    evolucion: ['']
  });

  valoracionesSubscription!: Subscription;
  glissandosSubscription!: Subscription;
  vocalesSubscription!: Subscription;
  indicacionesSubscription!: Subscription;

  constructor(
    private indicacionesService: IndicacionesService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private valoracionesService: ValoracionesService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.paciente = new Persona()
    this.indicacionEnviar = new Indicacion()
    this.indicacionEnviar.indicaciones = new Array<number>()
    this.indicaciones = new Array<any>()
    this.auditivas = new Array<any>()
    this.somatosensoriales = new Array<any>()
    this.muscoloesqueleticas = new Array<any>()
    this.respiratorias = new Array<any>()
    this.vocales = new Array<any>()
    this.otros = new Array<any>()
    this.externos = new Array<any>()
  }

  ngOnInit(): void {
    this.paciente = JSON.parse(localStorage.getItem('paciente'))

    this.activatedRouter.params.subscribe(
      response => {
        // console.log(response)
        this.sesion = response.sesion
      }
    )

    this.loadIndicaciones();
  }

  ngOnDestroy(): void {
    this.valoracionesSubscription && this.valoracionesSubscription.unsubscribe();
    this.glissandosSubscription && this.glissandosSubscription.unsubscribe();
    this.vocalesSubscription && this.vocalesSubscription.unsubscribe();
  }

  addIndicacion(e: any){
    if(e.checked){
      this.indicacionEnviar.indicaciones.push({id: e.source.value})
    }else{
      this.indicacionEnviar.indicaciones = this.indicacionEnviar.indicaciones.filter(ind => ind.id != e.source.value);
    }
  }

  loadIndicaciones(): void {

    this.indicacionesSubscription = this.indicacionesService.getIndicaciones().subscribe(
      response => {
        this.indicaciones = response
        this.indirecta = response[0]
        let idAuditivas = [1,2,3];
        this.auditivas = this.createArray(idAuditivas);
        
        let idSematosensoriales = [4,5,6,7,8,9,10,11,12,13];
        this.somatosensoriales = this.createArray(idSematosensoriales);

        let idMucoso = [14,15,16];
        this.muscoloesqueleticas = this.createArray(idMucoso);

        let idRespiratoria = [17,18];
        this.respiratorias = this.createArray(idRespiratoria);


        let idVocales = [19,20,21,22,23];
        this.funcionVocales = this.createArray(idVocales);

        let idOtros = [24,25,26,27,28,29,30,31,32,33];
        this.otros = this.createArray(idOtros);

        let idExternos = [34,35,36,37,38];
        this.externos = this.createArray(idExternos);
        // console.log(this.externos)
        // console.log(this.indicaciones)
      }
    )

    

    this.valoracionesSubscription = this.valoracionesService.getValoracionesIT().subscribe(
      response => {
        this.valoraciones = response
        // console.log(this.valoraciones)
      }
    )

    this.glissandosSubscription = this.valoracionesService.getGlissandos().subscribe(
      response => {
        this.glissandos = response
        // console.log(this.glissandos)
      }
    )

    this.vocalesSubscription = this.valoracionesService.getVocales().subscribe(
      response => {
        this.vocales = response
        // console.log(this.vocales)
      }
    )
  }

  createArray(arrayFilter: any): Array<any> {
    return this.indicaciones.filter((indicacion: any) => arrayFilter.some(index => index === indicacion.id_tarea));
  }

  obtenerResultados(event: any, indicacion: any): void {
    this.indicacionEnviar.indicaciones.push({id: indicacion.id_tarea, nombre: indicacion.nombre, indicacion: event})
    // console.log('indice', indicacion.id_tarea + 1);
    // console.log('resultados', event)
  }

  submitForm(): void {
    let arr = this.removeDuplicates(this.indicacionEnviar.indicaciones, 'id')
    this.form.patchValue({
      tipo: this.form.get('tipo').value.charAt(0),
      paciente: this.paciente.id,
      sesion: this.sesion,
      indicaciones: arr
    });
    this.dialog.open(ResultadosIndicacionesComponent, {width: '95%', data: this.form.value});
    // console.log(this.form.value);
  }

  addValoracionIndirecta(event: any, indirecta: any): void {
    let higiene = {
      id: indirecta.id_tarea,
      nombre: indirecta.nombre,
      indicacion: {
        valoracion: null
      }
    }
    higiene.indicacion.valoracion = event.value.id_valoracion;
    this.indicacionEnviar.indicaciones.filter(ind => ind.id !== 0)
    this.indicacionEnviar.indicaciones = [...this.indicacionEnviar.indicaciones, higiene]
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
}
