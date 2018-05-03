import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Company} from "../shared/company";

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  form(){
    this.formdata = new FormGroup({
      name: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      img: new FormControl(''),
      project_manager: new FormControl('')
    });
  }

  possible_project_managers(){
    this.project_managers = []
    for (let user of this.service.users){
      if (user.role === "Project Manager"){
        this.project_managers.push(user);
        for(let company of this.service.companies){
          if(company.project_manager_username === user.username){
            this.project_managers.pop();
            break;
          }
        }
      }
    }
  }

  new_name(name){
    for(let company of this.service.companies){
      if(name === company.name){
        return false;
      }
    }
    return true;
  }

  current_project_manager(){
    if(this.service.company_to_be_updated.project_manager_username === undefined){
      this.lacking_project_manager = true;
    }
  }

  formdata;
  project_managers;
  lacking_project_manager = false;
  totally_empty = false;
  invalid = false;
  success = false;
  hide = true;
  user;

  ngOnInit() {
    /*if (this.service.user_type === undefined) {
       this.router.navigate([''])
     }

    else if (this.service.user_type === "Team Member" || this.service.user_type === "Project Manager") {
       this.router.navigate(['restricted'])
     }

     else {*/
    this.current_project_manager();
    this.possible_project_managers();
    this.form();
    //}
  }

  onClickSubmit(data) {
    if(data.name === '' && data.img === '' &&
      (this.lacking_project_manager || data.project_manager === '' || data.project_manager === undefined)){
      this.totally_empty = true;
      this.invalid = false;
      this.success = false;
    }
    else if(this.new_name(data.name)){
      this.service.companies.push(new Company(data.name,data.project_manager,data.img))
      this.invalid = false;
      this.success = true;
      this.possible_project_managers();
      this.current_project_manager();
      this.form();
    }
    else{
      this.invalid = true;
      this.success = false;
    }
  }

}
