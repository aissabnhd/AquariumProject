import {Bassin } from '../bassins/bassin';


export interface Secteur{
  id : number;
  nom : string;
  localisation : string;
  lstBassin : Array<Bassin>;
}

