import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    HomeComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        BrowserAnimationsModule,
        FormsModule
    ],
  providers: [MatSlideToggleModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
