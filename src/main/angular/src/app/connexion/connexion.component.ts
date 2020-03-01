import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EmployeService} from "../employes/employe.service";
import {Employe} from "../employes/employe";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private snackBar : MatSnackBar, private router : Router, private formBuilder : FormBuilder, private employeService : EmployeService) { }

  ngOnInit() {
  }

  onSubmit() {
    let login = this.connexionForm.get('login').value;
    let password = this.connexionForm.get('password').value;
    let e = this.employeService.connect(login, password);
    e.subscribe(
      data => {
        this.snackBar.open("Connexion effectuée !", 'OK', { verticalPosition: 'top', duration:5000 })
        this.router.navigate(['/home/'+data.role]);
        this.connectEmploye.emit(data)
      },

      error =>{
        this.snackBar.open(error.error.message, 'OK', { verticalPosition: 'top', duration:5000 })

      }  )

    this.connexionForm.get('password').reset();


  }

  cancel(){
    this.connectEmploye.emit(false);
  }

  showPassword() {
    this.show = !this.show;
  }
}
