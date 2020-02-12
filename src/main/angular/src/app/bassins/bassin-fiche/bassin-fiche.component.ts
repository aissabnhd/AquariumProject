import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BassinService} from "../bassin.service";
import {Bassin} from "../bassin";
@Component({
  selector: 'app-bassin-fiche',
  templateUrl: './bassin-fiche.component.html',
  styleUrls: ['./bassin-fiche.component.css']
})
export class BassinFicheComponent implements OnInit {

  bassin: Bassin;
  constructor(private bassinService : BassinService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.bassinService.getBassin(id).subscribe(data => this.bassin = data );

  }
}
