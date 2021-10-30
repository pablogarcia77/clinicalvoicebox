import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoperceptualService {

  private urlBase = environment.url + 'autoperceptual.php'
  
  constructor(
    private http: HttpClient,
  ) { }

  getEvaluaciones():Observable<any>{
    return this.http.get(this.urlBase)
  }

  getEvaluacionesDone(sesion: any):Observable<any>{
    return this.http.get(this.urlBase + '?sesion=' + sesion)
  }
}
