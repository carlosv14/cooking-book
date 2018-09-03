import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgForm, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { debug } from 'util';
import { Recipe } from '../shared/recipe/recipe.model';
import { RecipeService } from '../shared/recipe/recipe.service';
import { RecipeIngredientDetail } from '../shared/recipe/RecipeIngredientDetail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  private ingredientId: number = 0;
  private recipe: Recipe;
  recipeDetailForm : FormGroup;
  RecipeIngredientDetails : FormArray;

  constructor(private recipeService: RecipeService, private formBuilder: FormBuilder, private router: Router) {
    
  }

  ngOnInit() {
    this.recipeDetailForm = this.formBuilder.group({
      Name : '',
      Description: '',
      ImageUrl : '',
      Servings: 0,
      AmountOfTime: '',
      Steps: '',
      RecipeIngredientDetails : this.formBuilder.array([ this.createIngredient() ])
    });
  }

  createIngredient(): FormGroup {
    return this.formBuilder.group({
      IngredientName: '',
      QuantityDescription: ''
    });
  }

  addIngredient(): void {
    this.RecipeIngredientDetails = this.recipeDetailForm.get('RecipeIngredientDetails') as FormArray;
    this.RecipeIngredientDetails.push(this.createIngredient());
  }

  onSubmit(form: FormGroup) {
    debugger;
    this.recipeService.addRecipe(form.value)
      .subscribe(data => {
        this.router.navigate(['/home']);
      },
        error => {
          if (error.status === 400) {
            //this.errors.push(err.error.error_description)
            console.error(error);
          }
          else {
            //this.errors.push("Upss algo salió mal");
            console.error(error.error.Message);
          }
        });
  }
}
