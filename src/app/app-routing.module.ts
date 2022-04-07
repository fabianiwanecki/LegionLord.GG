import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {PlayerComponent} from "./pages/player/player.component";
import {LegalDisclosureComponent} from "./pages/legal-disclosure/legal-disclosure.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'legal-disclosure', component: LegalDisclosureComponent},
  {path: 'player/:id', component: PlayerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
