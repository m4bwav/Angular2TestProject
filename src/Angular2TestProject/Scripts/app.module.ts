import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app';
//import Core = require("../wwwroot/libs/@angular2-material/core/core");
//import Card = require("../wwwroot/libs/@angular2-material/card/card");

//import { MdCoreModule } from '@angular2-material/core';
//import { MdCardModule } from '@angular2-material/card';
//import { MdButtonModule } from '@angular2-material/button';

@NgModule({
    //imports: [BrowserModule, MdButtonModule],
    //imports: [BrowserModule, MdCoreModule],
    //imports: [BrowserModule, MdCoreModule, MdCardModule],
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }