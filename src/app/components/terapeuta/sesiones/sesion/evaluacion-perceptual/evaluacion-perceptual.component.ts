import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-evaluacion-perceptual',
  templateUrl: './evaluacion-perceptual.component.html',
  styleUrls: ['./evaluacion-perceptual.component.css']
})
export class EvaluacionPerceptualComponent implements OnInit {

  public paciente: Persona


  constructor() {
    this.paciente = new Persona()
  }

  ngOnInit(): void {
    this.paciente = JSON.parse(localStorage.getItem('paciente'))
  }

}
