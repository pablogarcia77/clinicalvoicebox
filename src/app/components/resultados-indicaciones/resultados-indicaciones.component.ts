import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-resultados-indicaciones',
  templateUrl: './resultados-indicaciones.component.html',
  styleUrls: ['./resultados-indicaciones.component.css']
})
export class ResultadosIndicacionesComponent implements OnInit {
  
  indicaciones: any;

  form: FormGroup = this.fb.group({
    ejercicios: [[]],
    dateProxima: []
  });

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.indicaciones = this.data.indicaciones
  }

  setIndicacion(event: any, indicacion: any): void {
    // console.log('event:', event)
    // console.log('indicacion', indicacion)
    let arr = this.form.controls['ejercicios'].value;
    let resultados = event.checked ? [...arr, indicacion.id] : arr.filter(indi => indi !== indicacion.id);

    this.form.patchValue({
      ejercicios: resultados
    });
    console.log(this.form.value)
  }

  formSubmit(): void {
    const results = this.form.getRawValue();
    console.log(results);
    this.dialog.closeAll();
  }
}
