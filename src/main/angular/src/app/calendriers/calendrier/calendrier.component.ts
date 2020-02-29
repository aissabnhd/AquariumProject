import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActiviteService} from "../../activites/activite.service";
import {Activite} from "../../activites/activite";

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  id:number;
  activites : Array<Activite>;
  constructor(private route: ActivatedRoute, private activiteService : ActiviteService) { }

  ngOnInit() {
    console.log('here');
    this.id = this.route.snapshot.params['id'];
    this.activiteService.getActivitesOfEmploye(this.id).subscribe(
      data => {
        this.activites = data,
          console.log(data)
      }

    )
  }

}
