import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { SesionesService } from 'src/app/services/sesiones.service';
import { MatCarousel, MatCarouselComponent } from '@ngbmodule/material-carousel';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {

  public terapeuta: Persona
  public paciente: Persona

  public sesiones: Array<any>

  public slides: Array<any>

  public matCarouselSlide: MatCarousel

  public idPaciente: number

  public practicasSemanales: number

  constructor(
    private sesionesService: SesionesService,
    private activatedRouter: ActivatedRoute
  ) {
    this.sesiones = new Array<any>()
    this.slides = [
      {
        "grafico": "pie"
      },
      {
        "grafico": "bar"
      }
    ]
  }

  ngOnInit(): void {
    this.terapeuta = JSON.parse(localStorage.getItem('user'))

    this.activatedRouter.params.subscribe(
      response => {
        this.idPaciente = response.id
        // console.log('PacienteId: ',response.id)
        // console.log('TerapeutaeId: ',this.terapeuta.terapeuta.id)
        this.sesionesService.getSesionesByPacienteAndTerapeuta(response.id,this.terapeuta.terapeuta.id).subscribe(
          response => {
            this.paciente = response
            this.sesiones = response.sesiones
            // console.log(this.paciente)
            // console.log(this.sesiones)
          }
        )
      }
    )
    // console.log(this.terapeuta)
  }

  recibirPracticas(cantidad){
    this.practicasSemanales = cantidad
  }

}
