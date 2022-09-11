import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { emptyPiano, Piano } from 'src/app/models/body/piano';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.css']
})
export class PianoComponent implements OnInit {

  @Input() vocales: Array<any>;
  @Input() valoraciones: Array<any>;
  @Input() glissandos: Array<any>;

  @Output() results = new EventEmitter<any>();

  result: Piano = emptyPiano();

  // TODO: para refactorizar la construccion de la view del piano
  teclas = {
    octavaA: {
      negras: ['A2#','C3#','D3#','F3#','G3#','A3#'],
      blancas: ['A2','B2','C3','D3','E3','F3','G3','A3','B3']
    },
    octavaB: {
      negras: ['A3#','C4#','D4#','F4#','G4#','A4#'],
      blancas: ['A3','B3','C4','D4','E4','F4','G4','A4','B4']
    }
  };

  constructor() {
  }

  ngOnInit(): void {
    // console.log(this.glissandos)
  }

  addVocal(e: any){
    if (e.checked) {
      this.result.vocales.push(e.source.value);
    } else {
      this.result.vocales = this.result.vocales.filter(vocal => vocal != e.source.value);
    }
    this.emitResult(this.result);
  }

  addGlissando(e: any): void {
    if (e.checked) {
      this.result.glissandos.push(e.source.value);
    } else {
      this.result.glissandos = this.result.glissandos.filter(glissando => glissando != e.source.value);
    }
    this.emitResult(this.result);
  }

  addNota(e: any): void {
    if (e.checked) {
      this.result.notas.push(e.source.value);
    } else {
      this.result.notas = this.result.notas.filter(nota => nota != e.source.value);
    }
    this.emitResult(this.result);
  }

  addValoracion(e: any): void {
    this.result.valoracion = e.value.id_valoracion;
    this.emitResult(this.result);
  }

  emitResult(result: any): void {
    this.results.emit(result);
  }

}
