import {Bassin} from "../bassins/bassin";


export interface Activite{
  id : number;
  nom : string;
  date_debut : Date;
  date_fin : Date;
  public_act : boolean;
  bassin : Bassin;
}
