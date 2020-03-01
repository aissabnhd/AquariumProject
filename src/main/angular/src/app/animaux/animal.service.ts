import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Animal} from "./animal";


@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private httpClient: HttpClient) { }

  getAllAnimaux() : Observable<Array<Animal>> {
    return this.httpClient.get<Array<Animal>>('/animal')
  }

  getAnimauxOfEspece(idEspece : number) : Observable<Array<Animal>> {
    return this.httpClient.get<Array<Animal>>('/animauxOfEspece/' + idEspece)
  }



  deleteAnimal(id: number) : Observable<any>{
    return this.httpClient.delete('/animal/' + id);
  }

  createAnimal(animal : Animal, id : number) : Observable<Animal>{
    return this.httpClient.post<Animal>('/animal_espece/' + id, animal);
  }

  updateAnimal(animal : Animal, id : number) : Observable<Animal>{
    return this.httpClient.post<Animal>('/animal/' + id, animal);
  }

  getAnimal(id: number) : Observable<Animal>{
    return this.httpClient.get<Animal>('/animal/' + id);
  }
}
