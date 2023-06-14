import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorusanDashboardComponent } from './borusan-dashboard/borusan-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: BorusanDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorusanRoutingModule { }
