import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe/recipe.service';
import { Recipe } from '../shared/recipe/recipe.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipeService: RecipeService;
  recipes: Array<Recipe> = [];
  route: ActivatedRoute;

  constructor(recipeService: RecipeService, route: ActivatedRoute, private router : Router) {
    this.recipeService = recipeService;
    this.route = route;
  }

  ngOnInit() {
    window.document.body.style.background = "white";
    this.route.params.subscribe(
      params => {
         let term = params['searchTerm'];
         this.getRecipes(term);
      });
  }

  getRecipes(searchTerm: string): void {
    if (searchTerm) {
      this.recipeService.searchRecipes(searchTerm)
        .subscribe((data: Array<Recipe>) => {
          this.recipes = data;
        },
          error => {
            console.error(error);
          });
    } else {
      this.recipeService.getRecipes()
        .subscribe((data: Array<Recipe>) => {
          this.recipes = data;
        },
          error => {
            console.error(error);
          });
    }
  }

  getUser(){
    return localStorage.getItem("userToken");
  }
}
