import { Component, OnInit } from '@angular/core';
import { IUsers } from 'src/app/interfaces/IUsers';
import { IGender } from 'src/app/interfaces/IGender';
import { IResponse } from 'src/app/interfaces/IResponse';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-updadte',
  templateUrl: './user-updadte.component.html',
  styleUrls: ['./user-updadte.component.css']
})
export class UserUpdadteComponent implements OnInit {

  public user: Partial<IUsers> = {};
  public genders: IGender[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getGender();

    this.route.params.subscribe(params => {
      this.initUser(params.userId);
    });

  }

  public initUser(id: string) {
    this.http.get<IUsers>(environment.apiUrl + "/users/" + id)
    .subscribe(response => {
      this.user= response;
    });
  }

  public saveUser() {
    this.http.put(environment.apiUrl + "/users/" + this.user._id, this.user)
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

