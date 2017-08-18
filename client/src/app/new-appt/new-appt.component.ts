import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

import { User } from "./../user"
import { Appt } from "./../appt"
import { UserService } from "./../user.service"

@Component({
  selector: 'app-new-appt',
  templateUrl: './new-appt.component.html',
  styleUrls: ['./new-appt.component.css']
})
export class NewApptComponent implements OnInit {

  current_user: User
  new_appt: Appt
  appt_list: Array<Appt>
  today = new Date()
  min_date; test_date: String
  dd; mm; yyyy: Number
  dd_1; mm_1; yyyy_1: Number

  constructor(private user_service: UserService, private router: Router) { }

  ngOnInit() {
    this.new_appt= new Appt
    console.log(this.today)
    console.log(this.new_appt)

    this.dd = this.today.getDate();
    this.mm = this.today.getMonth()+1; //January is 0!
    this.yyyy = this.today.getFullYear();
    if(this.dd<10){
        this.dd='0'+this.dd
    }
    if(this.mm<10){
        this.mm='0'+this.mm
    }

    this.min_date = this.yyyy+'-'+this.mm+'-'+this.dd;


    // this.min_date = this.today.getFullYear() + "-" + this.today.getMonth() + "-" + this.today.getDate()
    console.log(this.min_date)
    this.user_service.get_logged_in_user()
      .then(data => {
        if(data) {
          this.current_user = data
          console.log(this.current_user)
        } else {
          this.router.navigate(["/"])
        }
      })
      .catch(err => console.log(err))

  this.user_service.get_appt_list()
  .then(data => {
    if(data) {
      this.appt_list = data
      console.log(this.appt_list)
    } else {
        // this.router.navigate(["/"])
      console.log("failed to get appt list")
    }
  })
  .catch(err => console.log(err))

  }

add_appt() {
    console.log(this.new_appt)
    this.new_appt.patient = this.current_user.name
    let count = 0
    if (this.appt_list.length >0) {
      for (let x = 0; x<this.appt_list.length; x++) {
      //   this.dd_1 = x.date.getDate();
      //   this.mm_1 = x.date.getMonth()+1; //January is 0!
      //   this.yyyy_1 = x.date.getFullYear();
      //   if(this.dd_1<10){
      //       this.dd='0'+this.dd
      //   }
      //   if(this.mm<10){
      //       this.mm='0'+this.mm
      //   }
      //
      //   this.test_date = this.yyyy+'-'+this.mm+'-'+this.dd;

        if (this.new_appt.date = this.appt_list[x].date) {
          count += 1
        }
        if (count == 3) {
          console.log("3 appointments set already for day")
          this.new_appt = new Appt
          return this.router.navigate(["/#new-appt"])
        }
      }
    }
      console.log("sending new appt to server")
      console.log(this.new_appt)
  // ADD NEW APPT TO APPT LIST
      this.user_service.add_appt(this.new_appt)
        .then((ok) => {
            console.log(ok)
            console.log("new appt uploaded to server")
            console.log(this.new_appt)
            return this.router.navigate(["/"])
          })
        .catch(err => console.log(err))

  }
}
