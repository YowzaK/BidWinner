import { Item } from 'src/app/Interfaces/items';

import { NewAuctionComponent } from './Components/new-auction/new-auction.component';
import { AdminGuard } from './Admin/admin.guard';
import { AdminLandingComponent } from './Admin/Components/admin-landing/admin-landing.component';
import { Admin } from './Admin/Interfaces/admin';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { AuctionsComponent } from './Components/auctions/auctions.component';
import { AuthGuard } from './Components/Auth/auth.guard';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';

import { HeaderNavbarComponent } from './Components/header-navbar/header-navbar-component.component';
import { LandingPageComponent} from './Components/LandingPage/LandingPageComponent.component';
import { CarouselComponent } from './Components/carousel/carousel-component.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { MyAuctionsComponent } from './Components/my-auctions/my-auctions.component';
import { SingleAuctionComponent } from './Components/single-auction/single-auction.component';
import { VerifyUserComponent } from './Components/verify-user/verify-user.component';
import { SingleUserComponent } from './Components/single-user/single-user.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'auctions', component: AuctionsComponent},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'newAuction', component: NewAuctionComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminLandingComponent, canActivate: [AdminGuard]},
  {path: 'myAuctions', component: MyAuctionsComponent, canActivate: [AuthGuard]},
  {path: 'auction/:id', component: SingleAuctionComponent},
  {path: 'user/:id', component: SingleUserComponent},

  {path: 'verifyUser', component: VerifyUserComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
