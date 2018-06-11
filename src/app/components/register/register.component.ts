import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarwisService } from '../../Services/jarwis.service';
import { TokenService } from '../../Services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  constructor(
    private Jarwis:JarwisService,
    private Token:TokenService,
    private router : Router
  ) { }

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public error = [];

  onSubmit() {
    return this.Jarwis.register(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}
