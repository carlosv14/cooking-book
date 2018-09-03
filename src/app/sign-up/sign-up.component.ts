import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user/user.model';
import { NgForm } from '../../../node_modules/@angular/forms';
import { UserService } from '../shared/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user : User;
  private userService : UserService
  errors : Array<string> = [];
  private router : Router;

  constructor(userService : UserService, router : Router) {
    this.userService = userService;
    this.router = router;
  }

  ngOnInit() {
    window.document.body.style.background = "#93c33d";
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null){
      form.reset();
    }
    this.user = {
      Email: '',
      Password: '',
      ConfirmPassword: '',
      UserName: ''
    };
    this.errors = [];
  }

  onSubmit(form : NgForm){
    this.userService.registerUser(form.value)
    .subscribe(data => {
      this.router.navigate(['/signin']);
    },
    err => {
      this.resetForm();
      if(err.status === 400){
        for(let key in err.error.ModelState){
            for(let i = 0; i< err.error.ModelState[key].length; i++){
              this.errors.push(err.error.ModelState[key][i])
            }
        }
      }
      else{
        this.errors.push("Upss algo salió mal");
      }
    });
  }

}
