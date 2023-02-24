import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Valoracion } from '../models/evaluaciones/valoracion';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {

  private urlBase = environment.url + 'valoraciones.php'

  constructor(
    private http: HttpClient
  ) { }

  getValoracionesIT():Observable<any>{
    return this.http.get(this.urlBase + '?indicaciones')
  }

  getVocales():Observable<any>{
    return this.http.get(this.urlBase + '?vocales')
  }

  getGlissandos():Observable<any>{
    return this.http.get(this.urlBase + '?glissandos')
  }

  getValoracionesCuestionarios(id: number): Observable<Valoracion[]> {
    return this.http.get<Valoracion[]>(`${this.urlBase}?id_tipo_test=${id}`);
  }
}
