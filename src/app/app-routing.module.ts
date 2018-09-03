import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';

const routes: Routes = [
  { path: "signup", component: SignUpComponent },
  { path: "signin", component: SignInComponent },
  { path: "home", component: HomeComponent},
  { path: "home/:searchTerm", component: HomeComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: "recipes/create", component: CreateRecipeComponent},
  { path: "recipes/:id", component: RecipeComponent},
  { path: "recipes",  
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
