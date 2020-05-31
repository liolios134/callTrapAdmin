import { Component, OnInit } from '@angular/core';
import { IUsers } from 'src/app/interfaces/IUsers';
import { IGender } from 'src/app/interfaces/IGender';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/IResponse';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  
  public user: Partial<IUsers> = {};
  public genders: IGender[] = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getGender();
  }

  public saveUser() {
    this.http.post(environment.apiUrl + "/users", this.user)
    .subscribe(response => {
      this.router.navigate(["/users"]);
    });
  }

  public getGender() {
    this.http.get<IResponse>(environment.apiUrl + "/genders")
    .subscribe(response => {
      this.genders = response.genders;
    });
  }

  public onUploadSuccess(data) {
    this.user.photo = data[1].filename;
  }

  public onUploadError(data) {
    console.log("ERROR: ", data);
  }
}
