import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  readonly rootUrl = "http://stackoverflowcgvm.apphb.com/";
  private http : HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  getRecipes(id? : number){
    if(id != null){
      return this.http.get(this.rootUrl + `api/Recipes/${id}`);
    }
    return this.http.get(this.rootUrl + "api/Recipes");
  }

  searchRecipes(searchTerm : string){
    return this.http.get(this.rootUrl + `api/Recipes?searchTerm=${searchTerm}`);
  }

  updateRecipe(id : number){
    return this.http.put(this.rootUrl + `api/Recipes/${id}`, null, {headers: new HttpHeaders({"Authorization":`Bearer ${localStorage.getItem("userToken")}`})});
  }

  addRecipe(recipe : Recipe){
    debugger;
    return this.http.post(this.rootUrl + 'api/Recipes',recipe, {headers: new HttpHeaders({"Authorization": `Bearer ${localStorage.getItem("userToken")}`})});
  }
}
