import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { Router } from '@angular/router';

declare var $: any; 
declare var jQuery: any;

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit(): void {
  }
  
  submit(){
    var code = $("#game").val();
    var name = $("#name").val();
    var gamecode = code[0] + code[1];
    var id = code[2];
    console.log(gamecode);
    console.log(name);
    console.log(id);
    var fd = {
      'code':gamecode,
      'name':name,
      'id':id
    }
    
    this.router.navigate(['/player'], { queryParams: { team: id, session : gamecode } });
    // this.api.verify(fd).then(s => {
    //   console.log(s);
    //   if (s['status'] == "success") {
    //     console.log(id)
        
    //     sessionStorage.setItem("team_no", id);
    //     sessionStorage.setItem("gamecode", gamecode);
    //     sessionStorage.setItem("name", name);
    //     sessionStorage.setItem("flag", "false")
        

    //   } else{
    //     alert(s['status'])
    //   }
      
    // })
  }

}
