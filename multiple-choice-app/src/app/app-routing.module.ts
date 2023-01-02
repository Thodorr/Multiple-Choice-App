import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'collections',
    pathMatch: 'full'
  },
  {
    path: 'collections',
    loadChildren: () => import('./collections/collections.module').then( m => m.CollectionsPageModule)
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
    path: 'question-test/:collectionId',
    loadChildren: () => import('./question-test/question-test.module').then( m => m.QuestionTestPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
