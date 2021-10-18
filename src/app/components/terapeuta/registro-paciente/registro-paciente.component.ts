import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Pais } from 'src/app/models/pais';
import { Persona } from 'src/app/models/persona';
import { Profesion } from 'src/app/models/profesion';
import { PacientesService } from 'src/app/services/pacientes.service';
import { PaisesService } from 'src/app/services/paises.service';
import { ProfesionesService } from 'src/app/services/profesiones.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {

  public generos = [
    {
      sexo: 'Masculino',
      valor: 'M'
    },
    {
      sexo: 'Femenino',
      valor: 'F'
    },
    {
      sexo: 'Otro',
      valor: 'No me indentifico con los anteriores'
    }
  ]

  public registroForm: any

  public paises: Array<Pais>

  public profesiones: Array<Profesion>

  public paciente: Persona

  public editMode: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private paisesService: PaisesService,
    private profesionesService: ProfesionesService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private pacientesService: PacientesService
  ) {
    this.paises = new Array<Pais>()
    this.profesiones = new Array<Profesion>()
  }

  ngOnInit(): void {
    

    this.registroForm = this.formBuilder.group({
      apellido: ['',[Validators.required,Validators.maxLength(50)]],
      nombre: ['',[Validators.required,Validators.maxLength(50)]],
      genero: ['',[Validators.required]],
      documento: ['',[Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]*$')]],
      profesion: ['',[Validators.required]],
      fechaNacimiento: ['',[Validators.required]],
      pais: ['',[Validators.required]],
      domicilio: ['',[Validators.required,Validators.maxLength(255)]],
      codArea: ['',[Validators.required]],
      nroTelefono: ['',[Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]*$')]],
      email: ['',[Validators.required,Validators.email,Validators.maxLength(100)]],
      telefono: ['']
    })

    this.paisesService.getAll().subscribe(
      response => {
        this.paises = response
        console.log(this.paises)
      }
    )

    this.profesionesService.getAll().subscribe(
      response => {
        this.profesiones = response
        console.log(this.profesiones)
      }
    )


    this.activatedRoute.params.subscribe(
      response => {
        console.log(response.id)
        // hay respuesta entonces se edita el paciente
        if(response.id){
          this.editMode = true
          this.pacientesService.getPacienteById(response.id).subscribe(
            response => {
              console.log(response)
              if(response){
                this.paciente = response;
                let fecha = new Date(this.paciente.fecha_nacimiento)
                this.registroForm.setValue({
                  apellido: this.paciente.apellido,
                  nombre: this.paciente.nombre,
                  genero: this.paciente.sexo,
                  documento: this.paciente.documento,
                  domicilio: this.paciente.domicilio,
                  profesion: this.paciente.paciente.profesion,
                  codArea: 'editMode',
                  nroTelefono: 'editMode',
                  fechaNacimiento: fecha,
                  pais: this.paciente.pais,
                  telefono: this.paciente.telefono,
                  email: this.paciente.email
                })
              }else{
                this.dialog.open(
                  DialogComponent,
                  {
                    data: {
                      registroPaciente: true
                    }
                  }
                )
              }
            }
          )
        }
      }
    )
    console.log(this.editMode)
  }

  register(){
    let paciente = {
      apellido: this.registroForm.get('apellido').value,
      nombre: this.registroForm.get('nombre').value,
      sexo: this.registroForm.get('genero').value,
      documento: this.registroForm.get('documento').value,
      domicilio: this.registroForm.get('domicilio').value,
      telefono: this.registroForm.get('nroTelefono').value,
      email: this.registroForm.get('email').value,
      fecha_nacimiento: this.registroForm.get('fechaNacimiento').value,
      id_pais: this.registroForm.get('pais').value,
      id_profesion: this.registroForm.get('profesion').value,
    }

    console.log(paciente)

    this.dialog.open(
      DialogComponent,
      {
        data: {
          paciente: paciente,
          registroSuccess: true
        }
      }
    )
  }

  changed(id: any){
    console.log(this.paises)
    console.log(id)
    const pais = this.paises.find( (pais) => {
      if(pais.id === id){
        this.registroForm.controls.codArea.setValue(pais.cod_telefonico)
      }
    })
    console.log(pais)
    // if(this.paciente){
    //   this.registroForm.controls.id_pais.setValue(pais.id)
    // }else{
    //   this.registroForm.controls.codArea.setValue(pais.cod_telefonico)
    // }
  }

  editarPaciente(){
    let paciente = {
      apellido: this.registroForm.get('apellido').value,
      nombre: this.registroForm.get('nombre').value,
      sexo: this.registroForm.get('genero').value,
      documento: this.registroForm.get('documento').value,
      domicilio: this.registroForm.get('domicilio').value,
      telefono: this.registroForm.get('nroTelefono').value,
      email: this.registroForm.get('email').value,
      fecha_nacimiento: this.registroForm.get('fechaNacimiento').value,
      id_pais: this.registroForm.get('pais').value,
      id_profesion: this.registroForm.get('profesion').value,
    }

    console.log(paciente)

    this.dialog.open(
      DialogComponent,
      {
        data: {
          paciente: paciente,
          editarPaciente: true
        }
      }
    )
  }

}
