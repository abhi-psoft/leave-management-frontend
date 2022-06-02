import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { AddComponent } from './component/add/add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpdateComponent } from './update/update.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../app/service/auth.interceptor';

import { MatSliderModule } from '@angular/material/slider';
import { ToastrModule } from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';

import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatGridListModule} from '@angular/material/grid-list';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';


import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { CalendarComponent } from './component/calendar/calendar.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AddComponent,
    UpdateComponent,
    LoginComponent,
    SigninComponent,
    DashboardComponent,
    CalendarComponent, 
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    MatCardModule,
    MatSliderModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
    FullCalendarModule,
    MatSlideToggleModule,
    MatRadioModule
  ],
  exports: [MatFormFieldModule, MatInputModule],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },         
  { provide: LOCALE_ID, useValue: "en-GB" },
  {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent]

  
})
export class AppModule { }

