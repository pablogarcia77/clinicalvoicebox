import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-medidas-acusticas',
  templateUrl: './medidas-acusticas.component.html',
  styleUrls: ['./medidas-acusticas.component.css']
})
export class MedidasAcusticasComponent implements OnInit {

  public paciente: Persona
  
  constructor() {
    this.paciente = new Persona()
  }

  ngOnInit(): void {
    this.paciente = JSON.parse(localStorage.getItem('paciente'))
  }

}
