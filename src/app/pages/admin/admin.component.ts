import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public search: string = "";
  public clients: any = [];

  constructor(
    private http : HttpClient
  ) { }

  ngOnInit(): void {

    this.http.get(environment.apiUrl + "/admin/clients")
    .subscribe(response => {
      this.clients = response;
    });

  }

}
