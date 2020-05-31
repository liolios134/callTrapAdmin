import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DropzoneModule, DROPZONE_CONFIG, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from 'src/environments/environment';
import { ScheduleModule } from '@syncFusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateUserComponent } from './components/create-user/create-user.component';


const router = [
  { path: '', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
  { path: 'users/create',
    component: CreateUserComponent
  },
  { path: 'clients', loadChildren: () => import('./pages/clients/clients.module').then(m => m.ClientsModule) },
  { path: 'calendar', loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule) }
  
];

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: environment.apiUrl + '/upload',
  maxFilesize: 20,
  acceptedFiles: 'image/*',
  paramName: 'file'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(router),
    CommonModule,
    FormsModule,
    DropzoneModule,
    ScheduleModule, 
  ],
  providers: [
    WeekService, 
    WorkWeekService, 
    MonthService, 
    AgendaService,
    MonthAgendaService, 
    TimelineViewsService, 
    TimelineMonthService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
      
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
