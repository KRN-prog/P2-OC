import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PieChartsComponent } from './pages/pie-charts/pie-charts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { LineChartsComponent } from './pages/line-charts/line-charts.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, PieChartsComponent, CountryDetailsComponent, LineChartsComponent],
  imports: [BrowserModule, NgxChartsModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
