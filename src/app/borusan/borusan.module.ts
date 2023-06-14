import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BorusanRoutingModule } from './borusan-routing.module';
import { SafepeopleComponent } from './safepeople/safepeople.component';
import { NotsafepeopleComponent } from './notsafepeople/notsafepeople.component';
import { BorusanDashboardComponent } from './borusan-dashboard/borusan-dashboard.component';
import { NameListComponent } from './name-list/name-list.component';
import { PieComponent } from './pie/pie.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    SafepeopleComponent,
    NotsafepeopleComponent,
    BorusanDashboardComponent,
    NameListComponent,
    PieComponent,

  ],

  imports: [
    CommonModule,
    BorusanRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  
  exports: [
    BorusanDashboardComponent,
    NotsafepeopleComponent,
    SafepeopleComponent,
    NameListComponent,
    PieComponent,
  ],
})
export class BorusanModule { }
