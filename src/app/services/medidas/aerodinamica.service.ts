import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aerodinamica } from 'src/app/models/medidas/aerodinamicas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AerodinamicaService {

  private urlBase = environment.url + 'aerodinamicas.php'

  constructor(
    private http: HttpClient
  ) { }

  getMedidasAerodinamicasByPacienteAndSesion(paciente: number, sesion: number): Observable<Aerodinamica> {
    return this.http.get<Aerodinamica>(`${this.urlBase}?paciente=${paciente}&sesion=${sesion}`);
  }

  createMedidasAerodinamicas(medidas: any): Observable<Aerodinamica> {
    return this.http.post<Aerodinamica>(`${this.urlBase}`, medidas);
  }
}
