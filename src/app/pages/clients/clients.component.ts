import { Component, OnInit } from '@angular/core';
import { IClients } from 'src/app/interfaces/IClients';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public clients: IClients[] = [];
  public loading: boolean    = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  public getClients() {
    this.loading = true;
    this.http.get<IClients[]>(environment.apiUrl + "/clients")
    .subscribe(response => {
      this.clients = response;
      this.loading=false;
    });
  }

  public deleteClient(id) {
    this.http.delete(environment.apiUrl + "/clients/" + id)
    .subscribe(_ => {
      this.getClients();
    });
  }
  
}
