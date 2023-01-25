import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectAuthorizedToLogin = () => redirectLoggedInTo(['collections']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectAuthorizedToLogin)
  },
  {
    path: 'collections',
    loadChildren: () => import('./collections/collections.module').then( m => m.CollectionsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'question-detail/:collectionId/:questionId',
    loadChildren: () => import('./question-detail/question-detail.module').then( m => m.QuestionDetailPageModule)
  },
  {
    path: 'collection-detail/:id',
    loadChildren: () => import('./collection-detail/collection-detail.module').then( m => m.CollectionDetailPageModule)
  },
  {
    path: 'collection-options/:id',
    loadChildren: () => import('./collection-options/collection-options.module').then( m => m.CollectionOptionsPageModule)
  },
  {
    path: 'question-test/:collectionId/:context',
    loadChildren: () => import('./question-test/question-test.module').then( m => m.QuestionTestPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    redirectTo: ''
  },
  {
    path: 'evaluation/:result',
    loadChildren: () => import('./evaluation/evaluation.module').then( m => m.EvaluationPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
