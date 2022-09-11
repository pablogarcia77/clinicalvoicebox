import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { Persona } from 'src/app/models/persona';
import { Terapeuta } from 'src/app/models/terapeuta';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.formBuilder.group({
    username: ['',[Validators.required]],
    password: ['',[Validators.required]]
  });
  
  public persona: Persona

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.persona = new Persona()
  }

  ngOnInit(): void {
    this.persona = JSON.parse(localStorage.getItem('user'))
    if(this.persona){
      if(this.persona.terapeuta != undefined){
        this.router.navigate(['/terapeutas'])
      }else{
        this.router.navigate(['/pacientes'])
      }
    }
  }


  login(){
    let login = {
      telefono: this.loginForm.get('username').value,
      documento: this.loginForm.get('password').value
    }
    
    this.loginService.postLogin(login).subscribe(
      response => {
        localStorage.setItem('user',JSON.stringify(response))
        if(response){
          if(response.terapeuta != undefined){
            this.router.navigate(['/terapeutas'])
          }else{
            this.router.navigate(['/pacientes'])
          }
        }else{
          this.snackBar.open('Datos incorrectos, intente nuevamente','Aceptar')
        }
      }
    )
  }

}
