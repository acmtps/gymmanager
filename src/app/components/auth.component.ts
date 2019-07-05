import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {GYMService} from '../services/heroes.service';

@Component({
  selector: 'auth-component',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  title = 'Login';
  username:string;
  password:string;
  showSpinner:any;
  constructor(private router:Router,private gymservice:GYMService) {
  }
  login(){
     let loginObj = {
      "password": this.password,
      "email": this.username
    }
this.showSpinner = true;
    this.gymservice.add(loginObj,"auth/signin").subscribe((res: any) => {
      this.showSpinner = false;
      this.router.navigate(['/dashboard']);
      localStorage.setItem("userData",JSON.stringify(res));
    });

  }
}
