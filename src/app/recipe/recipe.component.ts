import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../shared/recipe/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../shared/recipe/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  route: ActivatedRoute;
  recipeService: RecipeService;
  recipe: Recipe;

  constructor(route: ActivatedRoute, recipeService: RecipeService) {
    this.route = route;
    this.recipeService = recipeService;
  }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipes(id)
      .subscribe((data: Recipe) => {
        this.recipe = data;
      },
        error => {
          console.error(error);
        })
  }

  vote(): void {
    this.recipeService.updateRecipe(+this.route.snapshot.paramMap.get('id'))
      .subscribe((data: any) => {
        this.getRecipe();
      },
        error => {
          console.error(error);
        });
  }

  getUser() {
    return localStorage.getItem("userToken");
  }
}
