import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { PanelComponent } from './panel/panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListContainerComponent } from './list-container/list-container.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CardTaskComponent } from './card-task/card-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    PanelComponent,
    ListContainerComponent,
    CardTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
