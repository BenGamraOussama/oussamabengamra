import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Blog } from './blog/blog';
import { PortflioDetails } from './portflio-details/portflio-details';
import { ServiceDetails } from './service-details/service-details';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: Blog },
  { path: 'portflio-details/:id', component: PortflioDetails },
  { path: 'service-details/:id', component: ServiceDetails },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}