import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncFusion/ej2-angular-schedule';

const routes: Routes = [
  { path: '', component: CalendarComponent }
];

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ScheduleModule, 
    RecurrenceEditorModule
  ]
})
export class CalendarModule { }
