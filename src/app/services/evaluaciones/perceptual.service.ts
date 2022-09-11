import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perceptual } from 'src/app/models/evaluaciones/perceptual';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerceptualService {

  private urlBase = environment.url + 'perceptual.php'

  constructor(
    private http: HttpClient
  ) { }

  getEvaluacionPerceptualByPacienteAndSesion(paciente: number, sesion: number): Observable<Perceptual> {
    return this.http.get<Perceptual>(`${this.urlBase}?paciente=${paciente}&sesion=${sesion}`);
  }
  
}
