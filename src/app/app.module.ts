import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { AppRoutingModule } from './/app-routing.module';
import { VerifyEmailComponent } from './components/register/verify-email/verify-email.component';


import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { JarwisService } from './Services/jarwis.service';
import { TokenService } from './Services/token.service';
import { AuthService } from './Services/auth.service';
import { AfterLoginService } from './Services/after-login.service';
import { BeforeLoginService } from './Services/before-login.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/services/services.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './pages/components/footer/footer.component';
import { CarouselComponent } from './pages/components/carousel/carousel.component';
import { FeaturesComponent } from './pages/components/features/features.component';
import { TeamComponent } from './pages/components/team/team.component';
import { SocialComponent } from './pages/components/social/social.component';
import { QuoteComponent } from './pages/components/quote/quote.component';



import { SocialLoginModule, AuthServiceConfig } from "angular-6-social-login";
import { FacebookLoginProvider } from "angular-6-social-login";
import { getAuthServiceConfigs } from "./components/login/login.component";
import { CompaniesComponent } from './components/companies/companies.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    AboutComponent,
    ContactComponent,
    ServicesComponent,
    HomeComponent,
    FooterComponent,
    CarouselComponent,
    FeaturesComponent,
    TeamComponent,
    SocialComponent,
    QuoteComponent,
    CompaniesComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    SnotifyModule,
    SocialLoginModule
  ],
  providers: [
    JarwisService, 
    TokenService, 
    AuthService, 
    AfterLoginService, 
    BeforeLoginService, 
    SnotifyService,
    { 
      provide: 'SnotifyToastConfig', 
      useValue: ToastDefaults
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
