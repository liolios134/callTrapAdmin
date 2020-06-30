import { Component, OnInit } from '@angular/core';
import { IClients } from 'src/app/interfaces/IClients';
import { IGender } from 'src/app/interfaces/IGender';
import { IResponse } from 'src/app/interfaces/IResponse';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {


  public client: Partial<IClients> = {};
  public genders: IGender[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.getGender();

    this.route.params.subscribe(params => {
      this.initClient(params.clientId);
    });

  }

  public initClient(id: string) {
    this.http.get<IClients>(environment.apiUrl + "/clients/" + id)
    .subscribe(response => {
      this.client= response;
    });
  }

  public saveClient() {
    this.http.put(environment.apiUrl + "/clients/" + this.client._id, this.client)
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
