import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../Services/jarwis.service';
import { TokenService } from '../../Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { SnotifyService } from 'ng-snotify';

import {
  AuthService as SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error = null;

  constructor(

    private Jarwis:JarwisService,
    private Token:TokenService,
    private router : Router,
    private auth: AuthService,
    private notify: SnotifyService,
    private socialAuthService: SocialAuthService
    
  ) { }

  public form = {
    email: null,
    password: null
  };

  public socialform = {
    name: null,
    email: null,
    password: null,
    action: null
  };

  onSubmit() {
    this.notify.info('Processing..', {timeout:2000});
    this.Jarwis.login(this.form).subscribe( 
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error, {timeout:0})
    );
  }

  handleResponse(data) {
    this.notify.success('You are now logged in.');
    this.Token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/dashboard');
  }

  facebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.socialform.name = userData.name;
        this.socialform.email = userData.email;
        this.socialform.password = '123456';
        this.socialform.action = 'social';
        this.notify.info('Processing..', {timeout:2000});
        this.Jarwis.login(this.socialform).subscribe( 
          data => this.handleResponse(data),
          error => this.notify.error(error.error.error, {timeout:0})
        ); 
      }
    );
  }

  google() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.socialform.name = userData.name;
        this.socialform.email = userData.email;
        this.socialform.password = '123456';
        this.socialform.action = 'social';
        this.notify.info('Processing..', {timeout:2000});
        this.Jarwis.login(this.socialform).subscribe( 
          data => this.handleResponse(data),
          error => this.notify.error(error.error.error, {timeout:0})
        ); 
      }
    );
  }

  ngOnInit() {
  }

}
