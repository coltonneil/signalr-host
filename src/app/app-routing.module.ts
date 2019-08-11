import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureConnectionComponent } from './secure-connection/secure-connection.component';


const routes: Routes = [
  {path: 'connect', component: SecureConnectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
