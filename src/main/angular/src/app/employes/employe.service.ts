import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employe} from './employe';


@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private httpClient: HttpClient) { }

  getAllEmployes() : Observable<Array<Employe>> {
    return this.httpClient.get<Array<Employe>>('/employe')
  }

  deleteEmploye(id: number) : Observable<any>{
    return this.httpClient.delete('/employe/' + id);
  }

  createEmploye(employe : Employe) : Observable<Employe>{
    return this.httpClient.post<Employe>('/employe', employe);
  }

  updateEmploye(employe : Employe, id : number) : Observable<Employe>{
    return this.httpClient.post<Employe>('/employe/' + id, employe);
  }

  getEmploye(id: number) : Observable<Employe>{
    return this.httpClient.get<Employe>('/employe/' + id);
  }
}
