import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {

  public paciente: Persona

  public sesion: number

  constructor(
    private activatedRouter: ActivatedRoute,
    private pacientesService: PacientesService
  ) {
    this.paciente = new Persona()
  }

  ngOnInit(): void {
    this.paciente = JSON.parse(localStorage.getItem('paciente'))
    console.log(this.paciente)
    this.activatedRouter.params.subscribe(
      response => {
        console.log(response)
        this.sesion = response.sesion
      }
    )
  }

}
