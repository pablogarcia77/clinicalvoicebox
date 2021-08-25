import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public persona: Persona

  constructor() {
    this.persona = new Persona()
  }

  ngOnInit(): void {
    this.persona  = JSON.parse(localStorage.getItem('user'))
    // console.log(this.persona)
  }

  back(){
    window.history.back()
  }

}
