import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RegistroPacienteComponent } from './components/terapeuta/registro-paciente/registro-paciente.component';
import { ListaPacientesComponent } from './components/terapeuta/lista-pacientes/lista-pacientes.component';
import { AgendaComponent } from './components/terapeuta/agenda/agenda.component';
import { MainComponent } from './components/terapeuta/main/main.component';
import { CompartirPacienteComponent } from './components/terapeuta/compartir-paciente/compartir-paciente.component';
import { SesionesComponent } from './components/terapeuta/sesiones/sesiones.component';
import { HistoriaClinicaComponent } from './components/terapeuta/sesiones/historia-clinica/historia-clinica.component';
import { ResumenTratamientoComponent } from './components/terapeuta/sesiones/resumen-tratamiento/resumen-tratamiento.component';
import { IndicacionesTerapeuticasComponent } from './components/terapeuta/sesiones/indicaciones-terapeuticas/indicaciones-terapeuticas.component';
import { SesionComponent } from './components/terapeuta/sesiones/sesion/sesion.component';
import { FichaFoniatricaComponent } from './components/terapeuta/sesiones/sesion/ficha-foniatrica/ficha-foniatrica.component';
import { EvaluacionPerceptualComponent } from './components/terapeuta/sesiones/sesion/evaluacion-perceptual/evaluacion-perceptual.component';
import { EvaluacionAutoperceptualComponent } from './components/terapeuta/sesiones/sesion/evaluacion-autoperceptual/evaluacion-autoperceptual.component';
import { EvaluacionFuncionalComponent } from './components/terapeuta/sesiones/sesion/evaluacion-funcional/evaluacion-funcional.component';
import { MedidasAerodinamicasComponent } from './components/terapeuta/sesiones/sesion/medidas-aerodinamicas/medidas-aerodinamicas.component';
import { MedidasAcusticasComponent } from './components/terapeuta/sesiones/sesion/medidas-acusticas/medidas-acusticas.component';
import { RecursosTerapeuticosComponent } from './components/terapeuta/sesiones/sesion/recursos-terapeuticos/recursos-terapeuticos.component';
import { PlanificacionTerapeuticaComponent } from './components/terapeuta/sesiones/planificacion-terapeutica/planificacion-terapeutica.component';
import { NotasPersonalesComponent } from './components/terapeuta/sesiones/notas-personales/notas-personales.component';
import { AboutComponent } from './components/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/modules/material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainPacienteComponent } from './components/paciente/main-paciente/main-paciente.component';
import { HeaderComponent } from './components/header/header.component';
import { PrincipalTerapeutaComponent } from './components/terapeuta/principal-terapeuta/principal-terapeuta.component';
import { PrincipalPacienteComponent } from './components/paciente/principal-paciente/principal-paciente.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DialogComponent } from './components/terapeuta/dialog/dialog.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './components/chart/chart.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    RegistroPacienteComponent,
    ListaPacientesComponent,
    AgendaComponent,
    MainComponent,
    CompartirPacienteComponent,
    SesionesComponent,
    HistoriaClinicaComponent,
    ResumenTratamientoComponent,
    IndicacionesTerapeuticasComponent,
    SesionComponent,
    FichaFoniatricaComponent,
    EvaluacionPerceptualComponent,
    EvaluacionAutoperceptualComponent,
    EvaluacionFuncionalComponent,
    MedidasAerodinamicasComponent,
    MedidasAcusticasComponent,
    RecursosTerapeuticosComponent,
    PlanificacionTerapeuticaComponent,
    NotasPersonalesComponent,
    AboutComponent,
    FooterComponent,
    MainPacienteComponent,
    HeaderComponent,
    PrincipalTerapeutaComponent,
    PrincipalPacienteComponent,
    SidenavComponent,
    DialogComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    MatCarouselModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1500,panelClass: ['blue-snackbar']}},
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {autoFocus: false,hasBackdrop: true,disableClose: true, width: '90%'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
