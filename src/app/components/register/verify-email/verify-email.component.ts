import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../Services/jarwis.service';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  public form = {
    token: null,
    email: null
  };

  constructor(
    private route: ActivatedRoute,
    private __verifyService: JarwisService,
    private notify: SnotifyService,
    private router: Router
  ) { 
    route.queryParams.subscribe(params => {
      [
        this.form.token = params['token'],
        this.form.email = params['email']
      ]
    });
  }

  public error = null;

  ngOnInit() {
    this.notify.info('Wait..', {timeout:3000});
    this.__verifyService.verifyEmail(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(res) {
    this.notify.success(res.data, {timeout:0});
    let _router = this.router;
    _router.navigateByUrl('/login');
  }

  handleError(error){
    this.error = error.error.error;
    this.notify.error( this.error, {timeout:0});
    let _router = this.router;
    _router.navigateByUrl('/login');
  }

}
