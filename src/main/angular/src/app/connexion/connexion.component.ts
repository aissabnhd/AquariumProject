import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  connexionForm =  this.formBuilder.group({
    login: [null, Validators.required],
    password: [null, Validators.required]
  })


  constructor(private formBuilder : FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("Login : " + this.connexionForm.get('login').value);
    console.log("Password : " + this.connexionForm.get('password').value);
  }
}
