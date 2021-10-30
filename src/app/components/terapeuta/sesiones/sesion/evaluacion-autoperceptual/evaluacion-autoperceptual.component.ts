import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { AutoperceptualService } from 'src/app/services/autoperceptual.service';

@Component({
  selector: 'app-evaluacion-autoperceptual',
  templateUrl: './evaluacion-autoperceptual.component.html',
  styleUrls: ['./evaluacion-autoperceptual.component.css']
})
export class EvaluacionAutoperceptualComponent implements OnInit {

  public paciente: Persona

  public sesion: number

  public evaluaciones: Array<any>

  public realizadas: Array<any>
  
  constructor(
    private autoperceptualService: AutoperceptualService,
    private activatedRoute: ActivatedRoute
  ) {
    this.paciente = new Persona()
    this.evaluaciones = new Array<any>()
    this.realizadas = new Array<any>()
  }

  ngOnInit(): void {
    this.paciente = JSON.parse(localStorage.getItem('paciente'))

    this.activatedRoute.params.subscribe(
      response => {
        this.sesion = response.sesion
      }
    )

    this.autoperceptualService.getEvaluaciones().subscribe(
      response => {
        this.evaluaciones = response
        console.log(this.evaluaciones)
        
      }
    )

    this.autoperceptualService.getEvaluacionesDone(this.sesion).subscribe(
      response => {
        this.realizadas = this.unique(response)
        console.log(this.realizadas)
        this.evaluaciones.forEach((e) => {
        //   // console.log(this.realizadas.some(real => real.id_titulo === e.id_titulo))
        //   console.log(this.isInList(e.id_titulo))
          console.log(this.color(e.id_titulo)?.estado)
        })
      }
    )

    
  }

  unique(array){
    let hash = {}
    return array.filter( o => hash[o.id_titulo] ? false : hash[o.id_titulo] = true)
  }

  isInList(evaluacion){
    return this.realizadas.some(e => 
      e.id_titulo === evaluacion
    )
  }

  color(evaluacion){
    return this.realizadas.find( e =>
      e.id_titulo === evaluacion
    )
  }

}
