import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bassin} from "./bassin";


@Injectable({
  providedIn: 'root'
})
export class BassinService {

  constructor(private httpClient: HttpClient) { }

  getAllBassins() : Observable<Array<Bassin>> {
    return this.httpClient.get<Array<Bassin>>('/bassin')
  }

  deleteBassin(id: number) : Observable<any>{
    return this.httpClient.delete('/bassin/' + id);
  }

  createBassin(bassin : Bassin, idEmploye : number) : Observable<Bassin>{
    return this.httpClient.post<Bassin>('/bassinCreate/' + idEmploye, bassin);
  }

  updateBassin(bassin : Bassin, id : number, idEmploye : number) : Observable<Bassin>{
    return this.httpClient.post<Bassin>('/bassin/' + id + '/' + idEmploye, bassin);
  }

  getBassin(id: number) : Observable<Bassin>{
    return this.httpClient.get<Bassin>('/bassin/' + id);
  }

   assignEspeceBassin(idBassin : number, idEspece : number) : Observable<any>{
      return this.httpClient.get<Bassin>('/bassins/' + idBassin + '/' + idEspece);
    }

    removeEspeceBassin(idBassin : number, idEspece : number) : Observable<any>{
          return this.httpClient.delete<Bassin>('/bassins/' + idBassin + '/' + idEspece);
        }


}
