import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule, ListboxModule, InputTextModule, TabViewModule, ButtonModule, CardModule, ToastModule} from 'primeng';
import {MainComponent} from './main.component';
import {CheckHistoryComponent} from './check-history/check-history.component';
import {GraphComponent} from './graph/graph.component';
import {InfoComponent} from './info/info.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MainRoutingModule} from './main-routing.module';
import {AuthService} from '../services/Auth/auth.service';
import {PointsService} from '../services/Points/points.service';
import {GuardGuard} from '../services/Guard/guard.guard';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [GuardGuard] }
];

@NgModule({
  declarations: [MainComponent, CheckHistoryComponent, GraphComponent, InfoComponent],
  imports: [
    CommonModule,
    TableModule,
    ListboxModule,
    FormsModule,
    TabViewModule,
    InputTextModule,
    RouterModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CardModule,
    ToastModule
  ],
  exports: [RouterModule]
})
export class MainModule { }
