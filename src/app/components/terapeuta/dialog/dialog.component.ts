import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Persona } from 'src/app/models/persona';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public paciente: Persona

  public share!: boolean

  public delete!: boolean

  public registroPaciente!: boolean

  public registroSuccess!: boolean

  public editarPaciente!: boolean

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      paciente: any,
      share: boolean,
      delete: boolean,
      registroPaciente: boolean,
      registroSuccess: boolean,
      editarPaciente: boolean,
    },
    private pacientesService: PacientesService,
    private snackBar: MatSnackBar
  ) {
    this.share = this.data.share
    this.delete = this.data.delete
    this.registroPaciente = this.data.registroPaciente
    this.registroSuccess = this.data.registroSuccess
    this.editarPaciente = this.data.editarPaciente
    this.paciente = new Persona()
    this.paciente = data.paciente
  }

  ngOnInit(): void {
    // console.log(this.paciente.paciente)
    
  }

  deletePaciente(){
    if(this.delete){
      this.pacientesService.deletePaciente(this.paciente.paciente).subscribe(
        response => {
          if(response){
            this.snackBar.open('Paciente ','Aceptar')
          }
        }
      )
    }
  }

}
