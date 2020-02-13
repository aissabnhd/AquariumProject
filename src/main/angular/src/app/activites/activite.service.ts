import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Activite} from "./activite";


@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  constructor(private httpClient: HttpClient) { }

  getAllActivites() : Observable<Array<Activite>> {
    return this.httpClient.get<Array<Activite>>('/activite')
  }

  deleteActivite(id: number) : Observable<any>{
    return this.httpClient.delete('/activite/' + id);
  }

  createActivite(activite : Activite, id : number) : Observable<Activite>{
    return this.httpClient.post<Activite>('/activite_bassin/' + id, activite);
  }

  updateActivite(activite : Activite, id : number, idBassin : number) : Observable<Activite>{
    return this.httpClient.post<Activite>('/activite_update/' + id + '/' + idBassin, activite);
  }

  getActivite(id: number) : Observable<Activite>{
    return this.httpClient.get<Activite>('/activite/' + id);
  }
}
