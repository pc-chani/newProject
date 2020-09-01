import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddGMHComponent } from './components/add-gmh/add-gmh.component';
import { HomeComponent } from './components/home/home.component';
import { SearchGMHComponent } from './components/search-gmh/search-gmh.component';
import { ManageTheGMHComponent } from './components/manage-the-gmh/manage-the-gmh.component';
import { DonationsComponent } from './components/donations/donations.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: 'newUser', component: SignInComponent },
  { path: 'searchGMH', component: SearchGMHComponent },
  { path: 'manageTheGMH', component: ManageTheGMHComponent },
  { path: 'donations', component: DonationsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }