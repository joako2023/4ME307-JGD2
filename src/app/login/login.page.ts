import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpGenericService } from '../servics/FAST-TRACK-FRONTEND/http-generic.service';
import { SessionService } from '../servics/FAST-TRACK-FRONTEND/session.service';
import { UtilsService } from '../servics/FAST-TRACK-FRONTEND/utils.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private sesion: SessionService,
    
  ) { }

  public formularioLogin!: FormGroup;
  ngOnInit() {
    this.formularioLogin = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public login() {
   this.sesion.up(this.formularioLogin.value)
  }

  public get form() {
    return this.formularioLogin.controls;
  }


}
