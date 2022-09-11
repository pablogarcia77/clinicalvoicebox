import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Acustica, emptyAcustica } from 'src/app/models/medidas/acusticas';
import { Persona } from 'src/app/models/persona';
import { AcusticaService } from 'src/app/services/medidas/acustica.service';

@Component({
  selector: 'app-medidas-acusticas',
  templateUrl: './medidas-acusticas.component.html',
  styleUrls: ['./medidas-acusticas.component.css']
})
export class MedidasAcusticasComponent implements OnInit, OnDestroy {

  public paciente: Persona

  acustica: Acustica = emptyAcustica();

  acusticaSubscription!: Subscription;

  sesion!: number;

  form: FormGroup = this.fb.group({
    fo: [''],
    jitter: [''],
    db: [''],
    shimmer: [''],
    hn: [''],
    cepstrum: [''],
    dsi: [''],
    software: [''],
    avqi: [''],
    f1: [''],
    f2: [''],
    f3: [''],
    f4: [''],
  });
  
  constructor(
    private activateRoute: ActivatedRoute,
    private acusticaService: AcusticaService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.paciente = new Persona()
  }

  ngOnInit(): void {
    this.paciente = JSON.parse(localStorage.getItem('paciente'));
    this.activateRoute.params.subscribe(resp => {
      this.sesion = resp.sesion;
      this.acusticaSubscription = this.acusticaService.getMedidasAcusticasByPacienteAndSesion(this.paciente.id, this.sesion).subscribe(
        response => {
          this.acustica = response;
          this.setValues(this.acustica);
        }
      )
    });
  }

  ngOnDestroy(): void {
    this.acusticaSubscription && this.acusticaSubscription.unsubscribe();
  }

  setValues(acustica: Acustica): void {
    this.form.patchValue({
      fo: acustica.fo,
      jitter: acustica.jitter,
      db: acustica.db,
      shimmer: acustica.shimmer,
      hn: acustica.hn,
      cepstrum: acustica.cepstrum,
      dsi: acustica.dsi,
      software: acustica.software,
      avqi: acustica.avqi,
      f1: acustica.f1,
      f2: acustica.f2,
      f3: acustica.f3,
      f4: acustica.f4
    });
  }

  formSubmit(resultados: TemplateRef<any>): void {
    this.acustica = this.form.value;
    let sendObject: any = this.acustica;
    sendObject = {...sendObject, sesion: this.sesion};
    this.acusticaSubscription = this.acusticaService.createMedidaAcustica(sendObject).subscribe(
      response => {
        if (response) {
          this.dialog.open(resultados);
        }
      }
    )
  }

}
