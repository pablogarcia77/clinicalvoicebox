import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acustica } from 'src/app/models/medidas/acusticas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcusticaService {

  private urlBase = environment.url + 'acusticas.php'

  constructor(
    private http: HttpClient
  ) { }

  getMedidasAcusticasByPacienteAndSesion(paciente: number, sesion: number): Observable<Acustica> {
    return this.http.get<Acustica>(`${this.urlBase}?paciente=${paciente}&sesion=${sesion}`);
  }

  createMedidaAcustica(medidas: any): Observable<Acustica> {
    return this.http.post<Acustica>(`${this.urlBase}`, medidas);
  }
}
