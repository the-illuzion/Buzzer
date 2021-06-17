import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { Router } from '@angular/router';

declare var $: any; 
declare var jQuery: any;

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit(): void {
  }

  

  submit(click){
    var code = $("#code").val();
    var day = $("#day").val();
    var round = "1";
    console.log(code);
    console.log(day);
    console.log(round);
    
    var fd = {
      'code':code,
      'day':day,
      'round':round
    }

    if(click == "host"){
      this.router.navigate(['/host'], { queryParams: { session: code, day : day, round : round } });
      // this.api.host(fd).then(s => {

      //   console.log(s);
  
      //   if (s['status'] == "failed") {
      //     alert("Wrong Credentials")
      //   } else if(s['status'] == "session_started") {
      //     alert("The session has been already started.")
      //   } else {
      //     console.log("success")
      //     sessionStorage.setItem("code", code);
      //     sessionStorage.setItem("day", day);
      //     sessionStorage.setItem("round", round);

      //     //$("#myModal").modal("hide");
      //   }
      // })
    } else if(click == "score"){
      this.router.navigate(['/score'], { queryParams: { session: code, day : day, round : round } });
      // this.api.b(fd).then(s => {
      //   console.log(s);
      //   if (s['status'] == "success") {
      //     console.log("success")
      //     sessionStorage.setItem("code", code);
          
      //   }
      // });
    }
    
  }
}
