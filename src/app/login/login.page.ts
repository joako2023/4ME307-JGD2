import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpGenericService } from '../servics/http-generic.service';
import { SesionService } from '../servics/session.service';
import { UtileriasService } from '../servics/utileria.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private sesion: SesionService,
    private apiclient:HttpGenericService<any>,
    private utilerias:UtileriasService
  ) { }

  public formularioLogin!: FormGroup;
  ngOnInit() {
    this.formularioLogin = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public login() {
    if (this.formularioLogin.valid) {
      console.log(this.formularioLogin.value)
      this.apiclient.post(
        '/auth/local',
        this.formularioLogin.value
      ).subscribe((response: any) => {
        if (response.hasOwnProperty("jwt")) {
          
          this.sesion.set("usuarioSD", JSON.stringify(response.user))
          this.sesion.setToken(response.jwt)
          this.sesion.redirectIfLoggedIn('')
        } 
        
      })
    } else {
      this.utilerias.showIncorrectFormMessage()
    }
  }

  public get form() {
    return this.formularioLogin.controls;
  }


}
