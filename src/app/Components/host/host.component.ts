import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import * as io from 'socket.io-client';

import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';



declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'
  ]
})
export class HostComponent implements OnInit {

  SOCKET = environment.SOCKET;

  private socket: any;
  public data: any;
  public score = {
    '1': "",
    '2': "",
    '3': "",
    "4": "",
    "5": "",
    "6": ""
  }
  public gamecode;
  public increment = 10;
  public decrement = 5;
  public joined_teams = [];
  public day;
  public round;

  // For refresh
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    let info = {};
    for (let i = 0; i < this.joined_teams.length; i++) {
      info[this.joined_teams[i]] = this.score[this.joined_teams[i]];
    }
    this.socket.emit('update', info, this.gamecode);

  }


  constructor(public api: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.socket = (io as any)(this.SOCKET);
    this.activatedRoute.queryParams.subscribe(params => {
      this.gamecode = params['session'];
      this.day = params['day'];
      //console.log(this.team_id); // Print the parameter to the console. 
    });
  }

  ngOnInit(): void {
    
    //this.red();
   
    this.round = sessionStorage.getItem("round");
    var th = this;
    this.editable(th);
    $("#code").html(this.gamecode);
    console.log(this.gamecode);
    this.socket.emit('host', this.gamecode, this.day, this.round);

    this.socket.on("add_team", data => {
      console.log(data);
      this.add_team(data);

    })
    this.socket.on("delete", data => {
      console.log(data);
      //this.delete(data);
    })
    

    this.socket.on("updated", data => {
      console.log(data)
      var info = data.players_info;
      for (let team in info) {
        this.add_team(info[team]);
      }
    });

    this.socket.on("close_host", (data)=>{
      this.router.navigate(['/create_game']);
    });

    this.socket.on("status", data => {
      //console.log(data);
      $('#buzz').prop('disabled', false);
    });

    this.listener(th);
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
      modal.style.display = "block";
      var fd = {
        'code': th.gamecode
      }
      th.api.redirect(fd).then(s => {
        console.log(s);
        th.save_score(sessionStorage.getItem("round"));
      });
    }


  }


  
  save_score(round) {
    let info = {};
    for (let i = 0; i < this.joined_teams.length; i++) {
      info[this.joined_teams[i]] = this.score[this.joined_teams[i]];
    }
    console.log(info);
    let save = {
      'score': info,
      'code': this.gamecode,
      'round':round
    };
    this.api.save_score(save).then(s => {
      console.log(s);
    });
  }



  add_team(data) {

    $("#f" + data[0]).html(data[1]);
    $("#n" + data[0]).html(data[2]);
    $('#f' + data[0]).attr('contenteditable', 'true');
    this.joined_teams.push(data[0]);

    this.score[data[0]] = data[3];
    $("#s" + data[0]).html(data[3]);
    


    console.log(this.score);
  }

  cancel(){
    var fd = {
      'team': "cancel",
      "code": this.gamecode
    }
    this.api.buzz(fd).then(s => {

      console.log(s);

    })
  }

  delete(no) {
    $("#f" + no).html("");
    $("#n" + no).html("");
    $("#s" + no).html("");
    $('#f' + no).removeAttr('contenteditable').blur();
    this.joined_teams.splice(parseInt(no), 1);

    let fd = {
      'code': this.gamecode,
      'team': no,
      'score': this.score[no]
    };
    this.api.update_score(fd).then(s => {

    });
  }

  blip(no) {
    $("#team" + no).css("background-color", "white");
    $("#team" + no).css("color", "black");
    setTimeout(() => {
      $("#team" + no).css("background-color", "black");
      $("#team" + no).css("color", "white");
    }, 5000);
  }

  listener(th) {

    document.getElementById("f1").addEventListener("input", function (evt) {
      th.socket.emit("update_name", "1", $("#f1").html(), th.gamecode);
    }, false);
    document.getElementById("f2").addEventListener("input", function (evt) {
      th.socket.emit("update_name", "2", $("#f2").html(), th.gamecode);
    }, false);
    document.getElementById("f3").addEventListener("input", function (evt) {
      th.socket.emit("update_name", "3", $("#f3").html(), th.gamecode);
    }, false);
    document.getElementById("f4").addEventListener("input", function (evt) {
      th.socket.emit("update_name", "4", $("#f4").html(), th.gamecode);
    }, false);
    document.getElementById("f5").addEventListener("input", function (evt) {
      th.socket.emit("update_name", "5", $("#f5").html(), th.gamecode);
    }, false);
    document.getElementById("f6").addEventListener("input", function (evt) {
      th.socket.emit("update_name", "6", $("#f6").html(), th.gamecode);
    }, false);

  }

  editable(th) {
    $("#f1").keypress(function (evt) {

      var keycode = evt.charCode || evt.keyCode;
      if (keycode == 13) { //Enter key's keycode
        // th.socket.emit("update_name", "1", $("#f1").html(), th.gamecode);
        $('#f1').removeAttr('contenteditable').blur();
        $('#f1').attr('contenteditable', 'true');
      }
    });
    $("#f2").keypress(function (evt) {
      var keycode = evt.charCode || evt.keyCode;
      if (keycode == 13) { //Enter key's keycode
        // th.socket.emit("update_name", "2", $("#f2").html(), th.gamecode);
        $('#f2').removeAttr('contenteditable').blur();
        $('#f2').attr('contenteditable', 'true');
      }
    });
    $("#f3").keypress(function (evt) {
      var keycode = evt.charCode || evt.keyCode;
      if (keycode == 13) { //Enter key's keycode
        // th.socket.emit("update_name","3", $("#f3").html(), th.gamecode);
        $('#f3').removeAttr('contenteditable').blur();
        $('#f3').attr('contenteditable', 'true');
      }
    });
    $("#f4").keypress(function (evt) {
      var keycode = evt.charCode || evt.keyCode;
      if (keycode == 13) { //Enter key's keycode
        // th.socket.emit("update_name", "4", $("#f4").html(), th.gamecode);
        $('#f4').removeAttr('contenteditable').blur();
        $('#f4').attr('contenteditable', 'true');
      }
    });
    $("#f5").keypress(function (evt) {
      var keycode = evt.charCode || evt.keyCode;
      if (keycode == 13) { //Enter key's keycode
        // th.socket.emit("update_name", "5", $("#f5").html(), th.gamecode);
        $('#f5').removeAttr('contenteditable').blur();
        $('#f5').attr('contenteditable', 'true');
      }
    });
    $("#f6").keypress(function (evt) {
      var keycode = evt.charCode || evt.keyCode;
      if (keycode == 13) { //Enter key's keycode
        // th.socket.emit("update_name", "6",$("#f6").html(), th.gamecode);
        $('#f6').removeAttr('contenteditable').blur();
        $('#f6').attr('contenteditable', 'true');
      }
    });

  }


  next_round() {
    var round = sessionStorage.getItem("round");
    var update_round = parseInt(round) + 1;
    sessionStorage.setItem("round", update_round.toString());
    console.log(round);
    var fd = {
      code: this.gamecode
    }
    this.api.close(fd).then(s => {
      console.log(s);
      
      this.api.close_leaderboard(fd).then(s => {
        console.log(s);
      });
      document.getElementById("myModal").style.display = "none";

    });
  }

  delete_session() {
    var fd = {
      code: this.gamecode
    }
    this.api.delete_session(fd).then(s => {
      console.log(s);
      this.router.navigate(['/create_game']);
    })
  }

  plus(no) {
    console.log(this.score[no]);
    if (this.score[no]) {
      var val = (parseInt(this.score[no]) + this.increment)
      this.score[no] = val.toString();
      $("#s" + no).html(this.score[no]);
      $("#team_score" + no).html(this.score[no]);
      var round = sessionStorage.getItem("round");
      this.save_score(round);
    }

  }

  minus(no) {
    console.log(this.score[no]);
    if (this.score[no]) {
      var val = (parseInt(this.score[no]) - this.decrement);
      this.score[no] = val.toString();
      $("#s" + no).html(this.score[no]);
      $("#team_score" + no).html(this.score[no]);
      var round = sessionStorage.getItem("round");
      this.save_score(round);
    }
  }
  enable() {
    var fd = {
      "code": this.gamecode
    }
    this.api.enable(fd).then(s => {
      console.log(s);
      if(s["status"] == "success"){
        $('#buzz').prop('disabled', true);
      }

    })
  }

  delete_player(no) {
    let fd = {
      'code': this.gamecode,
      'team': no
    };
    this.api.delete(fd).then(s => {
      if (s['status'] = "success") {
        this.delete(no);
      } else {
        alert(s["status"])
      }
    });
  }

  enable_delete() {

    if ($("#d1").is(":disabled")) {
      $("#delete").html("DISABLE DELETE");
      $("#delete").css("background-color", "#eb0d0a");
      $("#delete").css("color", "white");
      for (var i = 1; i < 7; i++) {
        $('#d' + i).prop('disabled', false);
      }
    } else {
      $("#delete").html("ENABLE DELETE");
      $("#delete").css("background-color", "grey");
      $("#delete").css("color", "BLACK");
      for (var i = 1; i < 7; i++) {
        $('#d' + i).prop('disabled', true);
      }
    }

  }

}
