import { Component, OnInit } from '@angular/core';
import { IClients } from 'src/app/interfaces/IClients';
import { IGender } from 'src/app/interfaces/IGender';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/IResponse';


@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  public client: Partial<IClients> = {};
  public genders: IGender[] = []; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getGender();
  }

  public saveClient() {
    this.http.post(environment.apiUrl + "/clients", this.client)
    .subscribe(response => {
        this.router.navigate(["/clients"]);
    });
  }

  public getGender() {
    this.http.get<IResponse>(environment.apiUrl + "/genders")
    .subscribe(response => {
      this.genders = response.genders;
    });
  }
}
