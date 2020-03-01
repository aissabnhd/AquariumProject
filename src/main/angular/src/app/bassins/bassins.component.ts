import { Component, OnInit } from '@angular/core';
import {Bassin} from "./bassin";
import {BassinService} from "./bassin.service";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../employes/employe";

@Component({
  selector: 'app-bassins',
  templateUrl: './bassins.component.html',
  styleUrls: ['./bassins.component.css']
})
export class BassinsComponent implements OnInit {
  private bassins : Array<Bassin>;
  role : Role;
  constructor(private bassinService : BassinService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
    this.refreshBassins();
  }

  refreshBassins(){
    this.bassinService.getAllBassins().subscribe(
      data => this.bassins = data


    );
  }


}
