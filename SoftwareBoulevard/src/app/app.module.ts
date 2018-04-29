import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {'path':'', 'redirectTo':'/home', 'pathMatch':'full'},
  {'path':'home', 'component':HomeComponent},
  {'path':'home/user', 'component':UserComponent},
  {'path':'home/user/register', 'component':RegisterComponent},
  {'path':'home/company', 'component':CompanyComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
