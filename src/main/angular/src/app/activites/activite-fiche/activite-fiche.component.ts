import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActiviteService} from "../activite.service";
import {Activite} from "../activite";

@Component({
  selector: 'app-activite-fiche',
  templateUrl: './activite-fiche.component.html',
  styleUrls: ['./activite-fiche.component.css']
})
export class ActiviteFicheComponent implements OnInit {

  activite: Activite;
    constructor(private activiteService : ActiviteService, private route: ActivatedRoute) { }

    ngOnInit() {
      let id = this.route.snapshot.params['id'];
      this.activiteService.getActivite(id).subscribe(data => this.activite = data );

    }

}
