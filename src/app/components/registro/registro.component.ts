import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public registroForm: any

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

  public tos: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.generos)
    this.registroForm = this.formBuilder.group({
      apellido: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      genero: ['',[Validators.required]],
      documento: ['',[Validators.required]],
      pais: ['',[Validators.required]],
      consultorio: ['',[Validators.required]],
      codArea: ['',[Validators.required]],
      nroTelefono: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      fechaNacimiento: ['',[Validators.required]],
      matricula: ['',[Validators.required]],
      profesion: ['',[Validators.required]],
    })
  }

  register(){
    console.log('tos',this.tos)
      if(this.registroForm.valid){
        if(this.tos){
          console.log('valido')
        }else{
          console.log('debe aceptar tos')
        }
      }else{
        console.log('no valido')
      }

  }

  viewTOS(template: TemplateRef<any>){
    this.dialog.open(template,{disableClose:true});
  }

  changeCB(event: any){
    this.tos = event
  }
  
  acceptTOS(){
    this.tos = true
    this.dialog.closeAll()
  }

}
