import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GeneralServiceService } from '../general-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  formdata;
  constructor() { }

  ngOnInit() {
    this.formdata = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    });
  }

  onClickSubmit(data) {this.username = data.username;}

}
