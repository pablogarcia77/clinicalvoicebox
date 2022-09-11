import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grabacion',
  templateUrl: './grabacion.component.html',
  styleUrls: ['./grabacion.component.css']
})
export class GrabacionComponent implements OnInit {

  recordDisabled: boolean = false;
  pauseDisabled: boolean = true;
  stopDisabled: boolean = true;

  @Input() indicacion: any;
  @Input() sesion: any;

  constructor() { }

  ngOnInit(): void {
  }

  record(): void {
    this.pauseDisabled = false;
    this.stopDisabled = false;
    this.recordDisabled = true;
  }

  pause(): void {
    this.pauseDisabled = true;
    this.recordDisabled = false;
  }

  stopRecord(): void {
    this.recordDisabled = false;
    this.pauseDisabled = true;
    this.stopDisabled = true;
  }

}
