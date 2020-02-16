import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EmployeService} from "../employes/employe.service";
import {Employe} from "../employes/employe";

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

  show = false;
  private employe: Employe = null;

  @Output()
  connectEmploye = new EventEmitter<Employe | boolean >();

  constructor(private formBuilder : FormBuilder, private employeService : EmployeService) { }

  ngOnInit() {
  }

  onSubmit() {
    let login = this.connexionForm.get('login').value;
    let password = this.connexionForm.get('password').value;
    let e = this.employeService.connect(login, password);
    e.subscribe(
      data => this.connectEmploye.emit(data),

            error => console.log("error")
    )
    this.connexionForm.get('password').reset();


  }

  cancel(){
    this.connectEmploye.emit(false);
  }

  showPassword() {
    this.show = !this.show;
  }
}
