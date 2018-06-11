import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../Services/jarwis.service';
import { TokenService } from '../../Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { SnotifyService } from 'ng-snotify';


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
    private notify: SnotifyService
  ) { }

  public form = {
    email: null,
    password: null
  };

  onSubmit() {
    this.notify.info('Processing..', {timeout:2000});
    let _router = this.router;
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error, {timeout:0})
    );
  }

  handleResponse(data) {
    this.notify.success('You are now logged in.');
    this.Token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  ngOnInit() {
  }

}
