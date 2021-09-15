import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainPacienteComponent } from './components/paciente/main-paciente/main-paciente.component';
import { PrincipalTerapeutaComponent } from './components/terapeuta/principal-terapeuta/principal-terapeuta.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MainComponent } from './components/terapeuta/main/main.component';
import { RegistroPacienteComponent } from './components/terapeuta/registro-paciente/registro-paciente.component';
import { ListaPacientesComponent } from './components/terapeuta/lista-pacientes/lista-pacientes.component';
import { AgendaComponent } from './components/terapeuta/agenda/agenda.component';
import { AboutComponent } from './components/about/about.component';
import { SesionesComponent } from './components/terapeuta/sesiones/sesiones.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'terapeutas', component: MainComponent, children: 
    [
      {path: '', component: PrincipalTerapeutaComponent},
      {path: 'nuevo-paciente',component: RegistroPacienteComponent},
      {path: 'editar-paciente/:paciente',component: RegistroPacienteComponent},
      {path: 'lista-pacientes', component: ListaPacientesComponent},
      {path: 'agenda', component: AgendaComponent},
      {path: 'about', component: AboutComponent},
      {path: 'sesiones/:id', component: SesionesComponent},
    ]
  },
  {path: 'pacientes', component: MainPacienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
