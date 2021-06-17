import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  SOCKET = environment.SOCKET;

  public gamecode;
  public day;
  public round;
  private socket: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.socket = (io as any)(this.SOCKET);
    this.activatedRoute.queryParams.subscribe(params => {
      this.gamecode = params['session'];
      this.day = params['day'];
      this.round = params['round']
      //console.log(this.team_id); // Print the parameter to the console. 
    });
  }

  ngOnInit(): void {
    this.socket.emit("buzzed", this.gamecode, this.day, this.round)

    this.socket.on("redirect", data => {
      this.router.navigate(['/leaderboard'], { queryParams: { session: this.gamecode, day: this.day, round: this.round } });
    });
    // this.socket.on("add_team",data => {
    //   console.log(data);
    //   this.add_team(data);
    // })
    // this.socket.on("delete",data => {
    //   console.log(data);
    //   this.delete(data);
    // })
    this.socket.on("team", data => {
      console.log(data);
      this.blip(data);
    });
    this.socket.on('close_score', data => {
      console.log(data)
      if (data == "close") {
        this.router.navigate(["/create_game"]);
      }
    })
  }

  // add_team(data){
  //   $("#f" + data[0]).html(data[1]);
  //   $("#n" + data[0]).html(data[2]);
  // }

  // delete(no){
  //   $("#f" + no).html("");
  //   $("#n" + no).html("");
  // }

  blip(no) {
    let audioPlayer = <HTMLVideoElement>document.getElementById("myAudio");
    audioPlayer.play();
    $("#box").show();
    $("#box").html(no);
    setTimeout(() => {
      $("#box").hide();
    }, 16000);
  }
}
