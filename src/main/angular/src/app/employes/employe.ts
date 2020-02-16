export enum Role{
  employe='employe', gestionnaire='gestionnaire', admin='admin'

}

export interface Employe{
  id : number;
  nom : string;
  prenom : string;
  adresse : string;
  date_naissance : Date;
  num_secu_sociale : number;
  role : Role;
}
