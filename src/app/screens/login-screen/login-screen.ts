import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen implements OnInit {

  // Aquí van las variables globales
  public username: string = '';
  public password: string = '';
  public load: boolean = false;
  public errors: any = {};
  public type: string = "password";

  constructor(
    public router: Router
  ) { }

  ngOnInit() {

  }

  public login(){

  }

  public registrar() {

  }

  public showPassword() {

  }

}
