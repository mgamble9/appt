import { Pipe, PipeTransform } from '@angular/core';
import { Appt } from "./appt"

@Pipe({
  name: 'filtersearch'
})
export class FiltersearchPipe implements PipeTransform {

  transform(appt_arr: Array<Appt>, search: string): Array<Appt> {
    let output = []

    search = search.toLowerCase()

    for(var i = 0; i < appt_arr.length; i++){
    	if(appt_arr[i].patient.toLowerCase().includes(search) || appt_arr[i].complaint.toLowerCase().includes(search)){
    		output.push(appt_arr[i])
    	}
    }

    // return appt_arr.filter(appt_list => {
    //   // return bucket_item.title.toLowerCase().includes(search) || bucket_item.description.toLowerCase().includes(search)
    //   return appt_arr.patient.toLowerCase().includes(search)
    // })

    return output
  }

  }
