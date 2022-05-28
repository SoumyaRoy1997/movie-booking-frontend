import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/auth/login.service';
import Swal from 'sweetalert2';
import { users } from 'src/entity/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/Services/authentication.service';
import { TokenStorageService } from 'src/auth/token-storage.service';
import { JwtResponse } from 'src/auth/jwt-response';
import { SharedService } from 'src/Shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registrationForm: FormGroup;
  loading = false;
  hide = true;
  loginInvalid = false;
  currentuser:users;
  constructor(private fb: FormBuilder,
              private service: LoginService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private tokenStorage: TokenStorageService,
              private sharedService:SharedService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });

    this.registrationForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  getLogin(username: string, password: string)
  {
    const user:users={username: username , password: password, rolemap: null}
    this.loading = true;
    this.service.getLogin(user).subscribe((data:JwtResponse) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.loading = false;
        Swal.fire('Successfully Logged In as: ' , username, 'success');
        this.router.navigateByUrl('home');
        this.sharedService.getuser(username).subscribe(value=>
            { this.currentuser=value;
              this.authenticationService.login(this.currentuser);});
    });
  }
  getRegistration(username: string, password: string)
  {
    const user: users = {username: null ,
                         password: null,
                         rolemap: null,
                         preferences:null,
                         bookings:null,
                         firstName:null,
                         lastName:null};
    user.username = username;
    user.password = password;
    this.service.getRegistration(user, 'User').subscribe((data) => {
      if (data){
        Swal.fire('Successfully Registered as: ' , username, 'success');
    }
    });
  }
  googlesignin() {
    this.loading = true;
    this.service.googleSignin().then(res => {
      if (res.user) {
          // Swal.fire('Successfully Logged in as: ' , res.user.displayName + ' with Admin previleges', 'success');
          // this.loading = false;
          // console.log(res.user.email);
          // this.sharedService.getuser(res.user.email).subscribe(data=>
          //   { this.user=data;
          //     console.log(this.user)});
          // const user:users={username: res.user.displayName , password: null, rolemap: null}
          // this.router.navigateByUrl('home');
      } else {
        this.authenticationService.logout();
      }
    });
}
}
