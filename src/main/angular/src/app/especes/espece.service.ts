import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Espece} from './espece';


@Injectable({
  providedIn: 'root'
})
export class EspeceService {

  constructor(private httpClient: HttpClient) { }

  getAllEspeces() : Observable<Array<Espece>> {
      return this.httpClient.get<Array<Espece>>('/espece')
  }

  deleteEspece(id: number) : Observable<any>{
  return this.httpClient.delete('/espece/' + id);
  }

  createEspece(espece : Espece, idBassin : number) : Observable<Espece>{
    return this.httpClient.post<Espece>('/especeBassin/' + idBassin, espece);
  }

  updateEspece(espece : Espece, id : number) : Observable<Espece>{
      return this.httpClient.post<Espece>('/especeUpdate/' + espece.id + '/' + id, espece);
    }

    getEspece(id: number) : Observable<Espece>{
    return this.httpClient.get<Espece>('/espece/' + id);
    }
}
