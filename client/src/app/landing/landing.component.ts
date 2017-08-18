import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

import { User } from "./../user"
import { Appt } from "./../appt"
import { UserService } from "./../user.service"

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  current_user: User
  search_text: string = ''
  appt_list: Array<Appt>

  constructor(private user_service: UserService, private router: Router) { }

  ngOnInit() {
    this.current_user = new User
    console.log("landing page")

    this.user_service.get_logged_in_user()
      .then(data => {
        if(data!=false) {
          this.current_user = data
          console.log(this.current_user)
        } else {
          this.current_user = new User
          this.current_user.name = prompt("Hi, what's your name?")
          console.log(this.current_user.name)
          if (this.current_user.name != null) {
            this.user_service.login(this.current_user)
              .then(() => {
                // this.router.navigate(['/'])
                console.log("user logged in")
              })
              .catch(err => console.log(err))
            // this.current_user = new User
          }
          else { this.router.navigate(['/']) }      }
      })
      .catch(err => {
        console.log(err)
      })

      this.user_service.get_appt_list()
        .then(data => {
          this.appt_list = data
          console.log(this.appt_list)
        })
        .catch(err => console.log(err))




   }
   delete_appt(appt) {


   this.user_service.delete_appt(appt)
    .then(data => {
      if(data) {
        console.log("able to delete poll?", data)
        this.user_service.get_appt_list()
          .then(data => {
            this.appt_list = data
            console.log(this.appt_list)
          })
          .catch(err => console.log(err))

      } else {
        console.log("failed to delete poll")
      }
    })
    .catch(err => console.log(err))
}

}
