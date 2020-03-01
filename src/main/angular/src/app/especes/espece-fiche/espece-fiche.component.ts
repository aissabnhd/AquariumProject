import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Espece } from '../espece';
import { EspeceService } from '../espece.service';
import {Role} from "../../employes/employe";

@Component({
  selector: 'app-espece-fiche',
  templateUrl: './espece-fiche.component.html',
  styleUrls: ['./espece-fiche.component.css']
})
export class EspeceFicheComponent implements OnInit {

  espece: Espece;

  role : Role;
  constructor(private especeService : EspeceService, private route: ActivatedRoute) { }

  ngOnInit() {
      let id = this.route.snapshot.params['id'];
      this.role = this.route.snapshot.params['role'];
      this.especeService.getEspece(id).subscribe(data => this.espece = data );

  }

}
