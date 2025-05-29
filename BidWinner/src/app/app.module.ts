import { Config } from './Config/Config';
import { LandingPageComponent } from './Components/LandingPage/LandingPageComponent.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CarouselComponent } from './Components/carousel/carousel-component.component';
import { FeaturedItemsComponent } from './Components/featured-items/featured-items-component.component';
import { HeaderNavbarComponent } from './Components/header-navbar/header-navbar-component.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { AuctionsComponent } from './Components/auctions/auctions.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule  } from "ngx-ui-loader";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


import { AdminLandingComponent } from './Admin/Components/admin-landing/admin-landing.component';
import { NewAuctionComponent } from './Components/new-auction/new-auction.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MyAuctionsComponent } from './Components/my-auctions/my-auctions.component';
import { SingleAuctionComponent } from './Components/single-auction/single-auction.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { VerifyUserComponent } from './Components/verify-user/verify-user.component';
import { SingleUserComponent } from './Components/single-user/single-user.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    FeaturedItemsComponent,
    HeaderNavbarComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    AuctionsComponent,
    AboutUsComponent,
    AdminLandingComponent,
    NewAuctionComponent,
    MyAuctionsComponent,
    SingleAuctionComponent,
    VerifyUserComponent,
    SingleUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzAvatarModule,
    NzIconModule,
    NzCarouselModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzTagModule,
    NzMenuModule,
    NzDropDownModule,
    NzFormModule,
    NzInputModule,
    NzSkeletonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzUploadModule,
    NgxDropzoneModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NzDatePickerModule,
    NgxCurrencyModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, Config],
  bootstrap: [AppComponent],
})
export class AppModule {}
