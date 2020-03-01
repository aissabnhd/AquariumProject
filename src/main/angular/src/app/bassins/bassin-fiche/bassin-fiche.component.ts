import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BassinService} from "../bassin.service";
import {Bassin} from "../bassin";
import {Role} from "../../employes/employe";
@Component({
  selector: 'app-bassin-fiche',
  templateUrl: './bassin-fiche.component.html',
  styleUrls: ['./bassin-fiche.component.css']
})
export class BassinFicheComponent implements OnInit {
  role: Role;
  bassin: Bassin;
  constructor(private bassinService : BassinService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    this.role = this.route.snapshot.params['role']
    this.bassinService.getBassin(id).subscribe(data => this.bassin = data );

  }
}
