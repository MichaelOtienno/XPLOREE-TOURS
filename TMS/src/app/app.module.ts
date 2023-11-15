import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { UserComponent } from './user/user.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [

  { path: 'landing', component: LandingComponent },
  {path:'footer',component:FooterComponent},
  { path: 'signin', component: SigninComponent }, 
  { path: 'signup', component: SignupComponent },
  { path: 'supervisor', component: SupervisorComponent },
  { path: 'user', component: UserComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    SignupComponent,
    SigninComponent,
    PagenotfoundComponent,
    SupervisorComponent,
    UserComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
