import { Component, OnInit } from '@angular/core';
import {Bassin} from "./bassin";
import {BassinService} from "./bassin.service";

@Component({
  selector: 'app-bassins',
  templateUrl: './bassins.component.html',
  styleUrls: ['./bassins.component.css']
})
export class BassinsComponent implements OnInit {
  private bassins : Array<Bassin>;
  constructor(private bassinService : BassinService) { }

  ngOnInit() {
    this.refreshBassins();
  }

  refreshBassins(){
    this.bassinService.getAllBassins().subscribe(
      data => this.bassins = data


    );
  }


}
