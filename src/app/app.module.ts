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
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { UserUpdadteComponent } from './components/user-updadte/user-updadte.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { UpdateClientComponent } from './components/update-client/update-client.component';
import { AuthGuard } from './guards/auth.guard';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { LoginComponent } from './components/login/login.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';


const router = [
  { path: '', 
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    children:[
      {
        path:"",
        component: DashBoardComponent
      },
      {
        path:"users",
        children: [
          {
            path: '', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
          },
          {
            path:"create",
            component: CreateUserComponent
          },
          {
            path:"update/:productId",
            component: UserUpdadteComponent
          }
        ]
      },
  ]
     }
     { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
     { path: 'users/create',
       component: CreateUserComponent
     },
     { path: 'users/update/:userId',
     component: UserUpdadteComponent
   },
     { path: 'clients', loadChildren: () => import('./pages/clients/clients.module').then(m => m.ClientsModule) },
     { path: 'clients/create',
       component: CreateClientComponent
     },
     { path: 'clients/update/:clientId',
     component: UpdateClientComponent
   },
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
    CreateUserComponent,
    UserUpdadteComponent,
    CreateClientComponent,
    UpdateClientComponent,
    LoginComponent,
    DashBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(router),
    CommonModule,
    FormsModule,
    DropzoneModule,
    ScheduleModule, 
    FilterPipeModule,
    EditorModule,
    NgxWebstorageModule.forRoot()
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
