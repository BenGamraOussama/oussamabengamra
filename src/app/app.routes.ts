import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { PortfolioDetails } from './portfolio-details/portfolio-details';
import { ServiceDetails } from './service-details/service-details';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'portfolio-details/:id', component: PortfolioDetails },
  { path: 'portflio-details/:id', redirectTo: 'portfolio-details/:id', pathMatch: 'full' },
  { path: 'service-details/:id', component: ServiceDetails },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
