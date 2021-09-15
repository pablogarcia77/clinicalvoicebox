import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Pais } from 'src/app/models/pais';
import { Profesion } from 'src/app/models/profesion';
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

  constructor(
    private formBuilder: FormBuilder,
    private paisesService: PaisesService,
    private profesionesService: ProfesionesService,
    private dialog: MatDialog
  ) {
    this.paises = new Array<Pais>()
    this.profesiones = new Array<Profesion>()
  }

  ngOnInit(): void {

    this.dialog.open(
      DialogComponent,
      {
        data: {
          registroPaciente: true
        }
      }
    )

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
    })
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
      id_pais: this.registroForm.get('pais').value.id,
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

  changed(pais: any){
    this.registroForm.controls.codArea.setValue(pais.cod_telefonico)
    console.log(pais)
  }

}
