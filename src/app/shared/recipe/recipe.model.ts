import { RecipeIngredientDetail } from "./RecipeIngredientDetail";

export class Recipe{
    Id : number;
    Author : string;
    Name : string;
    ImageUrl : string;
    Votes : number;
    AmountOfTime: string;
    Servings : number;
    Description: string;
    RecipeIngredientDetails: Array<RecipeIngredientDetail> = [];
    Steps: string;
}