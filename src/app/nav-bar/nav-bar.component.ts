import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  searchTerm: string;
  private router : Router;

  constructor(router : Router) {
    this.router = router;
   }

  ngOnInit() {
  }

  search(form: NgForm) {
    let search = form.value.searchTerm;
    if (search === "") {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate([`/home/${search}`]);
    }
  }

  getUser(){
    return localStorage.getItem("userToken");
  }

  signOut(){
    localStorage.removeItem("userToken");
    this.router.navigate(["/home"]);
  }
}
