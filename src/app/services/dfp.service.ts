import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DfpService {

  private urlBase = environment.url + 'dfp.php'

  constructor(
    private http: HttpClient
  ) { }

  getDfp():Observable<any>{
    return this.http.get(this.urlBase)
  }
}
