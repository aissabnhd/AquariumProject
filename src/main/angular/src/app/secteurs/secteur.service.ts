import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Secteur} from "./secteur";


@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  constructor(private httpClient: HttpClient) { }

  getAllSecteurs() : Observable<Array<Secteur>> {
    return this.httpClient.get<Array<Secteur>>('/secteur')
  }

  deleteSecteur(id: number) : Observable<any>{
    return this.httpClient.delete('/secteur/' + id);
  }

  createSecteur(secteur : Secteur) : Observable<Secteur>{
    return this.httpClient.post<Secteur>('/secteur', secteur);
  }

  updateSecteur(secteur : Secteur, id : number) : Observable<Secteur>{
    return this.httpClient.post<Secteur>('/secteur/' + id, secteur);
  }

  getSecteur(id: number) : Observable<Secteur>{
    return this.httpClient.get<Secteur>('/secteur/' + id);
  }

   assignBassinSecteur(idSecteur : number, idBassin : number) : Observable<any>{
      return this.httpClient.get<Secteur>('/secteurs/' + idSecteur + '/' + idBassin);
    }

    removeBassinSecteur(idSecteur : number, idBassin : number) : Observable<any>{
          return this.httpClient.delete<Secteur>('/secteurs/' + idSecteur + '/' + idBassin);
        }


}
