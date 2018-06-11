import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarwisService } from '../../Services/jarwis.service';
import { TokenService } from '../../Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  constructor(
    private Jarwis:JarwisService,
    private Token:TokenService,
    private router : Router,
    private auth: AuthService,
    private notify: SnotifyService
  ) { }

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public error = [];

  onSubmit() {

    this.notify.info('Processing..', {timeout:2000});
    return this.Jarwis.register(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.checkError(error)
    );
  }

  handleResponse(res) {
    this.notify.success('Congratulations!!', {timeout:0});
    this.Token.handle(res.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('profile');
  }

  checkError(error) {
    this.error = error.error.errors;
    this.handleError(this.error);
  }

  handleError(error) {
    for(var i = 0; i < Object.keys(error).length; i++){
      this.notify.error(Object.keys(error).map(key=>error[key])[i], {timeout:0})
    }
  }

  ngOnInit() {
  }

}
