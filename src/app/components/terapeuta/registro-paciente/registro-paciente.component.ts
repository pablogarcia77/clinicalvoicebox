import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Pais } from 'src/app/models/pais';
import { PaisesService } from 'src/app/services/paises.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private paisesService: PaisesService
  ) {
    this.paises = new Array<Pais>()
  }

  ngOnInit(): void {

    this.paisesService.getAll().subscribe(
      response => {
        this.paises = response
        console.log(this.paises)
      }
    )


    this.registroForm = this.formBuilder.group({
      apellido: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      genero: ['',[Validators.required]],
      documento: ['',[Validators.required]],
      profesion: ['',[Validators.required]],
      fechaNacimiento: ['',[Validators.required]],
      pais: ['',[Validators.required]],
      domicilio: ['',[Validators.required]],
      codArea: ['',[Validators.required]],
      nroTelefono: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
    })
  }

  register(){

  }

}
