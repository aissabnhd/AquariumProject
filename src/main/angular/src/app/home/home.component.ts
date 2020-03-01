import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Role} from "../employes/employe";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role : Role;
  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.role = this.route.snapshot.params['role'];
  }

}
