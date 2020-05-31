import { Component, OnInit } from '@angular/core';
import { IUsers } from 'src/app/interfaces/IUsers';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: IUsers[] = [];
  public loading: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.loading = true;
    this.http.get<IUsers[]>(environment.apiUrl + "/users")
    .subscribe(response => {
      this.users = response;
      this.loading=false;
    });
  }

  public deleteUser(id) {
    this.http.delete(environment.apiUrl + "/users/" + id)
    .subscribe(_ => {
      this.getUsers();
    });
  }
  
}
