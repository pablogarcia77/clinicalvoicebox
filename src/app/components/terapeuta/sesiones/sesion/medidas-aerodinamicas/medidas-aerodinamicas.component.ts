import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Aerodinamica, emptyAerodinamica } from 'src/app/models/medidas/aerodinamicas';
import { Persona } from 'src/app/models/persona';
import { AerodinamicaService } from 'src/app/services/medidas/aerodinamica.service';

@Component({
  selector: 'app-medidas-aerodinamicas',
  templateUrl: './medidas-aerodinamicas.component.html',
  styleUrls: ['./medidas-aerodinamicas.component.css']
})
export class MedidasAerodinamicasComponent implements OnInit, OnDestroy {

  public paciente: Persona

  aerodinamicaSubscription!: Subscription;
  
  public aerodinamicas: Aerodinamica = emptyAerodinamica();

  form: FormGroup = this.fb.group({
    tms: ['', [Validators.required]],
    tmf: ['', [Validators.required]]
  });
  sesion!: number;
  values!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private aerodinamicasService: AerodinamicaService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.paciente = new Persona()
  }

  ngOnInit(): void {
    this.paciente = JSON.parse(localStorage.getItem('paciente'))
    this.activatedRoute.params.subscribe(
      response => {
        this.sesion = response.sesion;
        this.aerodinamicaSubscription = this.aerodinamicasService.getMedidasAerodinamicasByPacienteAndSesion(response.paciente, this.sesion).subscribe(
          aerodinamicas => {
            if (aerodinamicas) {
              this.aerodinamicas = aerodinamicas;
              this.setValues();
            }
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.aerodinamicaSubscription && this.aerodinamicaSubscription.unsubscribe();
  }

  setValues(): void {
    this.form.patchValue({
      tms: this.aerodinamicas.tms,
      tmf: this.aerodinamicas.tmf
    });
  }

  formSubmit(resultados: TemplateRef<any>): void {
    this.values = {
      sesion: this.sesion,
      tms: this.form.controls['tms'].value,
      tmf: this.form.controls['tmf'].value
    };
    this.aerodinamicaSubscription = this.aerodinamicasService.createMedidasAerodinamicas(this.values).subscribe(
      response => {
        if (response) {
          this.dialog.open(resultados);
        }
      }
    )
  }

  divide(): number{
    const tms = this.form.controls['tms'].value;
    const tmf = this.form.controls['tmf'].value;
    return  tmf !== '' && tmf ? tms/tmf : 0;
  }

}
