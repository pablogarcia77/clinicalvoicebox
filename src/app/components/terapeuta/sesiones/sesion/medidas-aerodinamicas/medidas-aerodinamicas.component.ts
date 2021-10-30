import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-medidas-aerodinamicas',
  templateUrl: './medidas-aerodinamicas.component.html',
  styleUrls: ['./medidas-aerodinamicas.component.css']
})
export class MedidasAerodinamicasComponent implements OnInit {

  public paciente: Persona
  
  constructor() {
    this.paciente = new Persona()
  }

  ngOnInit(): void {
    this.paciente = JSON.parse(localStorage.getItem('paciente'))
  }

}
