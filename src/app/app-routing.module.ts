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
import { SesionComponent } from './components/terapeuta/sesiones/sesion/sesion.component';
import { MedidasAerodinamicasComponent } from './components/terapeuta/sesiones/sesion/medidas-aerodinamicas/medidas-aerodinamicas.component';
import { MedidasAcusticasComponent } from './components/terapeuta/sesiones/sesion/medidas-acusticas/medidas-acusticas.component';
import { EvaluacionAutoperceptualComponent } from './components/terapeuta/sesiones/sesion/evaluacion-autoperceptual/evaluacion-autoperceptual.component';
import { EvaluacionPerceptualComponent } from './components/terapeuta/sesiones/sesion/evaluacion-perceptual/evaluacion-perceptual.component';
import { EvaluacionFuncionalComponent } from './components/terapeuta/sesiones/sesion/evaluacion-funcional/evaluacion-funcional.component';
import { RecursosTerapeuticosComponent } from './components/terapeuta/sesiones/sesion/recursos-terapeuticos/recursos-terapeuticos.component';
import { FichaFoniatricaComponent } from './components/terapeuta/sesiones/sesion/ficha-foniatrica/ficha-foniatrica.component';
import { IndicacionesTerapeuticasSesionComponent } from './components/terapeuta/sesiones/sesion/indicaciones-terapeuticas/indicaciones-sesion-terapeuticas.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'terapeutas', component: MainComponent, children: 
    [
      {path: '', component: PrincipalTerapeutaComponent},
      {path: 'nuevo-paciente',component: RegistroPacienteComponent},
      {path: 'editar-paciente/:id',component: RegistroPacienteComponent},
      {path: 'lista-pacientes', component: ListaPacientesComponent},
      {path: 'agenda', component: AgendaComponent},
      {path: 'about', component: AboutComponent},
      {path: 'sesiones/:id', component: SesionesComponent},
      {path: 'sesion/:paciente/:sesion', component: SesionComponent},
      // Medidas
      {path: 'aerodinamicas/:paciente/:sesion', component: MedidasAerodinamicasComponent},
      {path: 'acusticas/:paciente/:sesion', component: MedidasAcusticasComponent},
      // Evaluaciones
      {path: 'evaluacion/autoperceptual/:paciente/:sesion', component: EvaluacionAutoperceptualComponent},
      {path: 'evaluacion/perceptual/:paciente/:sesion', component: EvaluacionPerceptualComponent},
      {path: 'evaluacion/funcional/:paciente/:sesion', component: EvaluacionFuncionalComponent},
      // Recursos Terapeuticos
      {path: 'recursos/terapeuticos/:paciente/:sesion', component: RecursosTerapeuticosComponent},
      {path: 'indicaciones/terapeuticas/:paciente/:sesion', component: IndicacionesTerapeuticasSesionComponent},
      // Ficha Foniatrica
      {path: 'ficha/foniatrica/:paciente/:sesion', component: FichaFoniatricaComponent},
    ]
  },
  {path: 'pacientes', component: MainPacienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
