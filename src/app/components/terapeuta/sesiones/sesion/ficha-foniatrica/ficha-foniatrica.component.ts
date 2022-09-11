import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { AntecedentesService } from 'src/app/services/antecedentes.service';
import { DfpService } from 'src/app/services/dfp.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-ficha-foniatrica',
  templateUrl: './ficha-foniatrica.component.html',
  styleUrls: ['./ficha-foniatrica.component.css']
})
export class FichaFoniatricaComponent implements OnInit {

  public paciente: Persona

  public fumador = ['No fumador','Fumador actual','Ex fumador']

  public lesiones = ['Presente','Ausente']

  public interpreteVocal = ['Si','No']
  
  public selected: Array<any>

  public diagnosticos = ['Enfermedad por reflujo gastroesofágico','Reflujo laringofaríngeo','Otro']

  public antecedentes: Array<any>

  public tensionMuscular = ['Ninguna','Mandibula','Cuello','Espalda','Cara','Labios','Otros']

  public soporteLaringeo = ['Soporte neutral','Soporte alto','Soporte bajo']

  public sensibilidad = [
    {nombre: 'No', valor: false},
    {nombre: 'Si', valor: true}
  ]

  public isSensibilidad = false

  public sensibilidadSi = ['Derecha','Izquierda','Bilateral']

  public espacioTirohioideo = ['No','Si']

  public tensionFonar = ['No','Si']

  public tensionReposo = ['No','Si']

  public soporteReposo = ['Abdominal','Torácico','Clavicular','Abdominal invertido','Anclado','Mixto']

  public aireResidual = ['Si','No']

  public postura = ['Balanceada','Espalda arqueada (hundido)','Hiperextendido (tipo militar)','Cabeza adelantada','Cabeza hacia atrás','Inclinación derecha','Inclinación Izquierda']

  public cuello = ['Libre y suelto','Mandíbula protruida','Estático']

  public hombros = ['Simétricos','Derecho más alto que el izquierdo','Izquierdo más alto que el derecho','Ambos altos']

  public pelvis = ['Sin observación','Lordosis','Rodillas bloqueadas']

  public alteracionVocal = ['No','Leve','Moderado','Severo']

  public mejoria = ['Bueno','Justo','Pobre, basado en ']

  public referencias = ['Gastroenterología','Neurología','Otorrinolaringología','Psicología','Neumonología','Otros']

  public procedimientos = ['Endoscopía','Estroboscopía laríngea','Otros']

  // Higiene Vocal
  public ingestaAgua = [
    {
      label: '< 2 vasos',
      value: '2 vasos o menos'
    },
    {
      label: '3-4 vasos',
      value: '3-4 vasos'
    },
    {
      label: '5-7 vasos',
      value: '5-7 vasos'
    },
    {
      label: '8 o más vasos',
      value: '8 o más vasos'
    }
  ]

  public medidasAlcohol = [
    {
      label: '0',
      value: '0'
    },
    {
      label: '1',
      value: '1'
    },
    {
      label: '2',
      value: '2'
    },
    {
      label: '3',
      value: '3'
    },
    {
      label: '>3',
      value: 'Más de 3'
    },
    {
      label: 'Otro',
      value: 'otro'
    }
  ]

  public dfp: Array<any>
  
  constructor(
    private pacientesService: PacientesService,
    private antecedentesService: AntecedentesService,
    private dfpService: DfpService
  ) {
    this.paciente = new Persona()
    this.selected = new Array<any>()
    this.antecedentes = new Array<any>()
    this.dfp = new Array<any>()
  }

  ngOnInit(): void {
    this.selected.push({id_antecedente: 3,antecedente: 'Alergias'})
    this.selected.push({id_antecedente: 6,antecedente: 'Traqueotomía'})
    let id = JSON.parse(localStorage.getItem('paciente')).id
    this.pacientesService.getPacienteById(id).subscribe(
      response => {
        this.paciente = response
        console.log(this.paciente)
      }
    )
    this.antecedentesService.getAntecedentes().subscribe(
      response => {
        this.antecedentes = response
        console.log(this.antecedentes)
      }
    )
    this.dfpService.getDfp().subscribe(
      response => {
        this.dfp = response
        console.log(this.dfp)
      }
    )
  }

}
