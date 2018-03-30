import { HomeComponent } from './home/home.component';
import { NewrestaurantComponent } from './newrestaurant/newrestaurant.component';
import { NewreviewComponent } from './newreview/newreview.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'new', component: NewrestaurantComponent },
    { path: 'reviews/:id', component: ShowComponent },
    { path: 'reviews/:id/write/:id', component: NewreviewComponent},
    { path: 'edit/:id', component: EditComponent },
    { path: '', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
