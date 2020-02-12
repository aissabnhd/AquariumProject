import {Espece } from '../especes/espece';

export enum State{
   propre='propre', sale='sale'
}

export interface Bassin{
  id : number;
  nom : string;
  capacite_max : number;
  volume : number;
  etat : State;
  lst : Array<Espece>;
}

