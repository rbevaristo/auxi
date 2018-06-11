import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from '../../../Services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };

  public error = [];

  constructor(private route:ActivatedRoute, private jarwis: JarwisService, private router: Router, private notify: SnotifyService) { 
    route.queryParams.subscribe(params => {
      [
        this.form.resetToken = params['token'],
        this.form.email = params['email']
      ]
    });
  }

  onSubmit() {
    this.notify.info('Wait..', {timeout:3000});
    this.jarwis.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.checkError(error)
    )
  }

  handleResponse(res) {
    this.notify.success(res.data, {timeout:0});
    let _router = this.router;
    this.notify.confirm('Done! You may now login with your new password.', {
      buttons:[
        {
          text: 'Okay', action: toster => {
            _router.navigateByUrl('/login'),
            this.notify.remove(toster.id)
          }
        }
      ]
    })
    this.router.navigateByUrl('/login')
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
