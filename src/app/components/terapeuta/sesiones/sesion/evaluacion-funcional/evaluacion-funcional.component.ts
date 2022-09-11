import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { emptyPSesion, PSesion } from 'src/app/models/body/psesion';
import { Persona } from 'src/app/models/persona';
import { FuncionalService } from 'src/app/services/evaluaciones/funcional.service';
import { HabilidadesFonatoriasService } from 'src/app/services/habilidades-fonatorias.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-evaluacion-funcional',
  templateUrl: './evaluacion-funcional.component.html',
  styleUrls: ['./evaluacion-funcional.component.css'],
})
export class EvaluacionFuncionalComponent implements OnInit, OnDestroy {

  form: FormGroup = this.fb.group({
    e_sostenida: [false],
    i_sostenida: [false],
    fonacion_debil: [false],
    fonacion_media: [false],
    fonacion_intensa: [false],
    fonacion_aguda: [false],
    fonacion_media1: [false],
    fonacion_grave: [false],
    fon_reg_falsete: [false],
    fon_reg_modal: [false],
    fon_reg_frito: [false],
    gli_asc: [false],
    gli_desc: [false],

    actividad_supraglotica: [false],
    amplitud: [false],
    bordes_pliegues: [false],
    cierre_glo: [false],
    coloracion: [false],
    fon_inspirada: [false],
    observaciones: '',
    onda_mucosa: [false],
    respiracion: [false],
    simetria: [false],
    tos: [false]
  });

  public paciente: Persona
  
  public bordesLibres = ['Liso','Abultamiento localizado uniteral','Abultamiento localizado bilateral','Arqueado','Irregular']

  public plieguesVocales = ['Blanco nacardo','Rosa pálido','Rosa intenso','Vascularizada','Hemorragica']

  public simetria = ['Simétrico','Asimétrico']

  public respiracion = ['Normal','Alteración unilateral','Alteración bilateral']

  public tos = ['Presente','Ausente']

  public fonacion = ['Presente','Ausente']

  public cierreGlotico = ['Completo','Longitudinal','En reloj de arena','Fusiforme','Arqueado','Hendidura posterior','Hendidura anterior']

  public ondaMucosa = ['Disminuida','Normal','Aumentada']

  public amplitud = ['Disminuida','Normal','Aumentada']

  public actividadSupraglotica = ['Sin actividad durante la fonación','Tensión Isométrica','Contracción lateral','Contracción antero-posterior','En forma de rombo']

  public habilidadesArray: any

  pSesion: PSesion = emptyPSesion();
  
  habilidadesSubscription!: Subscription;
  funcionalSubscription!: Subscription;
  habilidades: any;

  constructor(
    private fb: FormBuilder,
    private habilidadesServices: HabilidadesFonatoriasService,
    private funcionalService: FuncionalService,
    private activatedRoute: ActivatedRoute,
    private pacientesService: PacientesService
  ) {
    this.paciente = new Persona()
    this.habilidadesArray = []
  }

  ngOnInit(): void {
    this.habilidadesSubscription = this.habilidadesServices.getHabilidades().pipe(
      finalize( () => this.parseHabilidades()),
    ).subscribe(
      response => {
        this.habilidadesArray = response
        console.log(response)
      }
    );

    this.activatedRoute.params.subscribe(
      response => this.pSesion = { paciente: response.paciente, sesion: response.sesion }
    );

    this.paciente = this.pacientesService.getPacienteLocalStorage();

    this.funcionalSubscription = this.funcionalService.getEvaluacionFuncionalBySesionAndPaciente(this.pSesion.sesion, this.pSesion.paciente).subscribe(
      response => {
        console.log(response)
        this.form.patchValue({
          e_sostenida: response.e_sostenida,
          i_sostenida: response.i_sostenida,
          fonacion_debil: response.fonacion_debil,
          fonacion_media: response.fonacion_media,
          fonacion_intensa: response.fonacion_intensa,
          fonacion_aguda: response.fonacion_aguda,
          fonacion_media1: response.fonacion_media1,
          fonacion_grave: response.fonacion_grave,
          fon_reg_falsete: response.fon_reg_falsete,
          fon_reg_modal: response.fon_reg_modal,
          fon_reg_frito: response.fon_reg_frito,
          gli_asc: response.gli_asc,
          gli_desc: response.gli_desc,

          actividad_supraglotica: response.actividad_supraglotica,
          amplitud: response.amplitud,
          bordes_pliegues: response.bordes_pliegues,
          cierre_glo: response.cierre_glo,
          coloracion: response.coloracion,
          fon_inspirada: response.fon_inspirada,
          observaciones: response.observaciones,
          onda_mucosa: response.onda_mucosa,
          respiracion: response.respiracion,
          simetria: response.simetria,
          tos: response.tos
        });
      }
    );

  }

  ngOnDestroy(): void {
    this.habilidadesSubscription && this.habilidadesSubscription.unsubscribe();
    this.funcionalSubscription && this.funcionalSubscription.unsubscribe();
  }

  parseHabilidades(): void {
    let arrFCN = [
      { id: 1, fcn: 'e_sostenida' },
      { id: 2, fcn: 'i_sostenida' },
      { id: 3, fcn: 'fonacion_debil' },
      { id: 4, fcn: 'fonacion_media' },
      { id: 5, fcn: 'fonacion_intensa' },
      { id: 6, fcn: 'fonacion_aguda' },
      { id: 7, fcn: 'fonacion_media1' },
      { id: 8, fcn: 'fonacion_grave' },
      { id: 9, fcn: 'fon_reg_falsete' },
      { id: 10, fcn: 'fon_reg_modal' },
      { id: 11, fcn: 'fon_reg_frito' },
      { id: 12, fcn: 'gli_asc' },
      { id: 13, fcn: 'gli_desc' },
    ];
    this.habilidades = []
    this.habilidadesArray.forEach( hab => {
      arrFCN.forEach(oFCN => {
        if (oFCN.id == hab.id_habilidad) {
          this.habilidades.push({
            id: hab.id_habilidad,
            formName: oFCN.fcn,
            label: hab.nombre
          })
        }
      })
    })
    console.log(this.habilidades)
  }

  submitForm(): void {
    console.log(this.form.value)
    this.funcionalService.postEvaluacionFuncional(this.pSesion.sesion, this.form.value).subscribe();
  }
}
