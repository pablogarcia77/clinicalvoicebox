import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { emptyPerceptual, Perceptual } from 'src/app/models/evaluaciones/perceptual';
import { Persona } from 'src/app/models/persona';
import { PerceptualService } from 'src/app/services/evaluaciones/perceptual.service';

@Component({
  selector: 'app-evaluacion-perceptual',
  templateUrl: './evaluacion-perceptual.component.html',
  styleUrls: ['./evaluacion-perceptual.component.css']
})
export class EvaluacionPerceptualComponent implements OnInit, OnDestroy {

  public paciente: Persona;
  public perceptual: Perceptual = emptyPerceptual();

  perceptualSubscription!: Subscription;

  form: FormGroup = this.fb.group({
    g: [''],
    r: [''],
    b: [''],
    a: [''],
    s: [''],
    i: [''],
    rg: [''],
    rr: [''],
    rb: [''],
    ra: [''],
    rs: [''],
    ri: ['']
  });

  constructor(
    private activatedRouter: ActivatedRoute,
    private perceptualService: PerceptualService,
    private fb: FormBuilder
  ) {
    this.paciente = new Persona()
  }

  ngOnInit(): void {
    this.paciente = JSON.parse(localStorage.getItem('paciente'))
    this.activatedRouter.params.subscribe(
      response => {
        this.perceptualSubscription = this.perceptualService.getEvaluacionPerceptualByPacienteAndSesion(response.paciente, response.sesion).subscribe(
          resp => {
            this.perceptual = resp
            if (resp) {
              this.setValues();
            }
          }
        );
      }
    )
  }

  ngOnDestroy(): void {
    this.perceptualSubscription && this.perceptualSubscription.unsubscribe();
  }

  setValues(): void {
    this.form.patchValue({
      g: this.perceptual.g,
      r: this.perceptual.r,
      b: this.perceptual.b,
      a: this.perceptual.a,
      s: this.perceptual.s,
      i: this.perceptual.i,
      rg: this.perceptual.rg,
      rr: this.perceptual.rr,
      rb: this.perceptual.rb,
      ra: this.perceptual.ra,
      rs: this.perceptual.rs,
      ri: this.perceptual.ri
    })
  }

  submitForm(): void {
    
  }

}
