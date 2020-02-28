import {Bassin} from "../bassins/bassin";
import {Espece} from "../especes/espece";
import {Employe} from "../employes/employe";


export interface Activite{
  id : number;
  nom : string;
  date_debut : Date;
  date_fin : Date;
  public_act : boolean;
  bassin : Bassin;
  responsables : Array<Employe>;

}
