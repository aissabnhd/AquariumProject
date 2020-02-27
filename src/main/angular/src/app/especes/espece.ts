import {Bassin} from "../bassins/bassin";

export interface Espece{
    id : number;
    nom : string;
    esperance : number;
    regime : string;
    menace : number;
    bassin : Bassin;
}
