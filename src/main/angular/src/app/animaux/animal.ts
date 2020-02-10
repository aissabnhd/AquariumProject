import {Espece} from "../especes/espece";

export enum Sexe{
  M='M', F="F"

}

export interface Animal{
  id : number;
  nom : string;
  sexe : Sexe;
  espece : Espece;
  signe_distinctif : string;
  date_arrive : Date;
  date_depart : Date;
}
