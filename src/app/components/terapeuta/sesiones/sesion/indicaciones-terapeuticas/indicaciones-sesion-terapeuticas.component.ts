import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { ValoracionesService } from 'src/app/services/valoraciones.service';

@Component({
  selector: 'app-indicaciones-sesion-terapeuticas',
  templateUrl: './indicaciones-sesion-terapeuticas.component.html',
  styleUrls: ['./indicaciones-sesion-terapeuticas.component.css']
})
export class IndicacionesTerapeuticasSesionComponent implements OnInit {

  public indicaciones: any

  public indicacionesRealizar: Array<any>

  public paciente: Persona

  public valoraciones: Array<any>

  public vocales: Array<any>

  public glissandos: Array<any>

  public vocalesElegidas: Array<string>

  constructor(
    private valoracionesService: ValoracionesService
  ) {
    this.paciente = new Persona()
    this.valoraciones = new Array<any>()
    this.indicacionesRealizar = new Array<any>()
    this.vocales = new Array<any>()
    this.vocalesElegidas = new Array<any>()
    this.glissandos = new Array<any>()
  }

  ngOnInit(): void {

    this.paciente = JSON.parse(localStorage.getItem('paciente'))

    
    this.indicaciones = JSON.parse(localStorage.getItem('indicaciones'))
    
    console.log(this.indicaciones)
    this.indicacionesRealizar = this.indicaciones.indicaciones

    this.valoracionesService.getValoracionesIT().subscribe(
      response => {
        this.valoraciones = response
        console.log(this.valoraciones)
      }
    )

    this.valoracionesService.getGlissandos().subscribe(
      response => {
        this.glissandos = response
        console.log(this.glissandos)
      }
    )

    this.valoracionesService.getVocales().subscribe(
      response => {
        this.vocales = response
        console.log(this.vocales)
      }
    )

  }

  mostrar(){
    console.log(this.vocalesElegidas)
  }

}
