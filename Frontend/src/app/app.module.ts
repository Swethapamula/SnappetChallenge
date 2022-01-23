import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressComponent } from './components/progress/progress.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
// import { ChartsModule } from 'ng2-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';











@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    HomeComponent,
    HeaderComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatOptionModule,
    GoogleChartsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
