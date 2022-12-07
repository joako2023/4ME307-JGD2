import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClikTools } from '../cliktools/cliktools';

import { UserInterface } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/servics/user.service';
import { HttpGenericService } from '../servics/FAST-TRACK-FRONTEND/http-generic.service';
@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {

  //public user = new User();
  
  constructor(
    private fb: FormBuilder,
    private apiclient: HttpGenericService<any>,
    private clicktools: ClikTools,
    private userService: UserService,
  ) { }

  public formCreateAccount!: FormGroup;

  ngOnInit() {
    this.formCreateAccount = this.fb.group({
      userName : ['',[Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(8)]],
      passwordConfirm : ['',[Validators.required]],
      terms : [false]
    });
 //this.formCreateAccount.patchValue()  ayuda a asignar valores a todo el objeto interno del formulario (username, email, etc)
 
     
     }
  public get form(){
    return this.formCreateAccount.controls;
  }

  onCreate(){

    if(this.formCreateAccount.invalid || this.validateEqualsPass() == false){
      this.clicktools.acceptMessage("Datos incompletos", 
        "Por favor ingresar todos los datos requeridos.");
    }
    else{

      if(this.form.terms.value == false){
        this.clicktools.acceptMessage("Datos incompletos", 
          "Debe aceptar las condiciones de uso.");

      }
      else{

      
        const data = {
          username: this.formCreateAccount.value.userName,
          email: this.formCreateAccount.value.email,
          password: this.formCreateAccount.value.password,
          telefono: '123456789',
          tipo: 'paciente',
          rol: 'paciente'
        } as UserInterface;

        // this.userService.saveUser(data)
        // .subscribe((response) => {
        //   if(response.hasOwnProperty('id')){
        //     this.formCreateAccount.reset();
        //     this.clicktools.alertMessageRouter("/login","Operación exitosa", "Se ha registrado exitosamente");
        //   }
        // });
      }

    }
  }

  validateEqualsPass(){
    if(this.form.password.value == this.form.passwordConfirm.value){
      return true;
    }
    else{
      return false;
    }
  }

}

