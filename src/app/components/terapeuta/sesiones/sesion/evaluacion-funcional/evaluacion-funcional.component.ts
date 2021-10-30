import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-evaluacion-funcional',
  templateUrl: './evaluacion-funcional.component.html',
  styleUrls: ['./evaluacion-funcional.component.css']
})
export class EvaluacionFuncionalComponent implements OnInit {

  public paciente: Persona
  
  public bordesLibres = ['Liso','Abultamiento localizado uniteral','Abultamiento localizado bilateral','Arqueado','Irregular']

  constructor() {
    this.paciente = new Persona()
  }

  ngOnInit(): void {
    this.paciente = JSON.parse(localStorage.getItem('paciente'))
  }

}
