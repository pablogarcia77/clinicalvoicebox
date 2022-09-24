import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { NgAudioRecorderService, OutputFormat, RecorderState } from 'ng-audio-recorder';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grabacion',
  templateUrl: './grabacion.component.html',
  styleUrls: ['./grabacion.component.css']
})
export class GrabacionComponent implements OnInit, OnDestroy {

  recordDisabled: boolean = false;
  pauseDisabled: boolean = true;
  stopDisabled: boolean = true;

  @Input() indicacion: any;
  @Input() sesion: any;
  @Output() sendValues: EventEmitter<any> = new EventEmitter<any>();

  audioSubscription!: Subscription;
  blobUrl: any;

  constructor(
    private audioRecorderService: NgAudioRecorderService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {
    this.audioSubscription = this.audioRecorderService.recorderError.subscribe(
      response => {
        this.snackBar.open('Error al grabar audio', 'Aceptar');
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.audioSubscription && this.audioSubscription.unsubscribe();
  }

  record(): void {
    this.pauseDisabled = false;
    this.stopDisabled = false;
    this.recordDisabled = true;

    this.audioRecorderService.startRecording();
    this.audioRecorderService.getRecorderState() === RecorderState.PAUSED ?
    this.audioRecorderService.resume() : this.blobUrl = null;
  }

  pause(): void {
    this.pauseDisabled = true;
    this.recordDisabled = false;
    this.audioRecorderService.pause();
  }

  stopRecord(): void {
    this.recordDisabled = false;
    this.pauseDisabled = true;
    this.stopDisabled = true;

    this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output: Blob) => {
      let url = window.URL.createObjectURL(output);
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      const file = new File([output], "audio.wav");
      this.submitValue(file);
    }).catch(erroCase => {
      this.snackBar.open('Error al grabar audio', 'Aceptar');
    });
  }

  submitValue(grabacion: any): any {
    const object = {
      indicacion: this.indicacion,
      sesion: this.sesion,
      grabacion
    };
    this.sendValues.emit(object);
  }

}
