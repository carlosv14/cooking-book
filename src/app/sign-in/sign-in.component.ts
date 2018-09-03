import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user/user.model';
import { UserService } from '../shared/user/user.service';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User;
  private userService: UserService
  errors: Array<string> = [];
  private router : Router;

  constructor(userService: UserService, router : Router) {
    this.userService = userService;
    this.router = router;
  }

  ngOnInit() {
    window.document.body.style.background = "#93c33d";
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      Email: '',
      Password: '',
      ConfirmPassword: '',
      UserName: ''
    };

    this.errors= [];
  }

  onSubmit(form: NgForm) {
    this.userService.signinUser(form.value)
      .subscribe((data : any )=> {
        localStorage.setItem('userToken',data.access_token);
        this.router.navigate(['/home']);
      },
        err => {
          this.resetForm();
          if (err.status === 400) {
            this.errors.push(err.error.error_description)
          }
          else {
            this.errors.push("Upss algo salió mal");
          }
        });
  }
}
