import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';



declare var $: any;
declare var jQuery: any;

@Component({

  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  SOCKET = environment.SOCKET;
  public gamecode;
  public info;

  public day;
  public round;
  private socket: any;
  constructor(public api: ApiService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.socket = (io as any)(this.SOCKET);
    this.activatedRoute.queryParams.subscribe(params => {
      this.gamecode = params['session'];
      this.day = params['day'];
      this.round = params['round']
      //console.log(this.team_id); // Print the parameter to the console. 
    });
  }

  ngOnInit(): void {
    this.get_data();
    this.socket.emit("leaderboard",this.gamecode)
    this.socket.on("close_leaderboard", data => {
      this.router.navigate(['/score'], { queryParams: { session: this.gamecode , day : this.day, round : this.round} });
    });
  }


  fill_details(obj){

    var final = [];
    var obj1 = obj;
    var length = Object.keys(obj).length;


    for(let i=0; i<length; i++){

      var bigger;
      bigger = Object.keys(obj1)[0];

      for(let team1 in obj1){
        if(parseInt(obj1[team1][3]) > parseInt(obj1[bigger][3])){
          bigger = team1;
        }
      }
      final.push(obj1[bigger]); 
      delete obj1[bigger];
      
    }
    console.log(final);
    this.fill_table(final);
  }

  fill_table(arr){
    for(let i=0; i<arr.length; i++){
      $("#f" + (i+1)).html(arr[i][1]);
      $("#s" + (i+1)).html(arr[i][3]);
    }
  }

  get_data(){
    let fd = {
      'code':this.gamecode
    }
    this.api.get_score(fd).then(s =>{
      console.log(s);
      this.info = s['details'];
      this.fill_details(this.info);
    });
  }
}
