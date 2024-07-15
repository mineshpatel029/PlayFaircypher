import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PlayfairComponent } from './playfair/playfair.component';
import { PlayfairCipherService } from './playfair-cipher.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayfairComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [PlayfairCipherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
