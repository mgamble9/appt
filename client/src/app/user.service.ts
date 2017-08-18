import { Injectable } from '@angular/core';
import { Http } from "@angular/http" // added when ready to try sending data to server

import "rxjs"

import { User } from "./user"
import { Appt } from "./appt"
// import { Auction } from "./auction"

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  login(user: User){ // returns a promise
    return this.http.post("/login", user)
        .map(data => data.json())
        .toPromise()
    }

  get_logged_in_user() {
  return this.http.get("/get_logged_in_user")
    .map(data => data.json())
    .toPromise()
  }

  get_appt_list() {
  return this.http.get("/get_appt_list")
    .map(data => data.json())
    .toPromise()
  }

  add_appt(appt: Appt){ // returns a promise
    return this.http.post("/add_appt", appt)
        .map(data => data.json())
        .toPromise()
    }

  delete_appt(id){ // returns a promise
    return this.http.post("/delete_appt", id)
        .map(data => data.json())
        .toPromise()
    }


}
