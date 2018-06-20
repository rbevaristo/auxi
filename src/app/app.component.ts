import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { TokenService } from './Services/token.service';
import { Router } from '@angular/router';
import { MenuPositionX, MenuPositionY } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loggedIn : boolean;
  constructor(
    private auth: AuthService, 
    private Token: TokenService,
    private router : Router
  ) { }
  ngOnInit(){
    this.auth.authStatus.subscribe(
      value => this.loggedIn = value
    );
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}


