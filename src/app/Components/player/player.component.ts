import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ConnectionService } from 'ng-connection-service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  status = 'ONLINE';
  isConnected = true;
  SOCKET = environment.SOCKET;
  private socket: any;
  public data: any;
  public team_id;
  public session;
  subscription: Subscription;


  constructor(public api: ApiService, private activatedRoute: ActivatedRoute, private router: Router, private connectionService: ConnectionService) {
    
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
        if (
          event.id === 1 &&
          event.url === event.urlAfterRedirects
        ) {
          this.socket.emit('refresh', 'player', this.session, this.team_id);
        }
      })

    this.socket = (io as any)(this.SOCKET);
    this.activatedRoute.queryParams.subscribe(params => {
      this.team_id = params['team'];
      this.session = params['session'];
      //console.log(this.team_id); // Print the parameter to the console. 
    });
    
  }

  ngAfterViewInit() {
    
  }

  ngOnInit(): void {
    document.getElementById("buzzer").style.color = "BLACK";
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
      }
      else {
        this.socket.disconnect();
        this.status = "OFFLINE";
        //alert("NO Internet")
        console.log(this.status);
        document.getElementById("stats").style.color = "#eb0d0a";
        document.getElementById("stats").innerHTML = "DISCONNECTED";
        document.getElementById("myModal").style.display = "block";
        
        //location.reload();
      }
    })
    
    sessionStorage.setItem("flag", "true");
    console.log(sessionStorage.getItem('teamcode'))
    if (sessionStorage.getItem('team_no') == this.team_id && sessionStorage.getItem('gamecode') == this.session) {
      
      //sessionStorage.setItem("check","false");
      this.socket.io.on('connect_error', function (err) {
        this.router.navigate(["/"])
        document.getElementById("myModal").style.display = "block";
      });
      console.log(this.team_id);
      this.socket.emit('join', this.session, this.team_id);
      
      this.socket.on('disconnect', function () {
        document.getElementById("myModal").style.display = "block";
        document.getElementById("stats").style.color = "#eb0d0a";
        document.getElementById("stats").innerHTML = "DISCONNECTED";
      });
      this.socket.on("error", function () {
        alert("Session not started")
        console.log("error")
        window.open("google.com","_self");
      })
      this.socket.on('connect', function () {
        //document.getElementById("myModal").style.display = "none";
        document.getElementById("stats").style.color = "#0ae40a";
        document.getElementById("stats").innerHTML = "CONNECTED";
        
      });
      
      this.socket.emit("connection_info",this.session, this.team_id);
      this.socket.on("connection_check" + this.team_id, data => {
        if (data == "connected") {
          
          document.getElementById("myModal").style.display = "none";
        } else {
          this.router.navigate(["/"])
          document.getElementById("myModal").style.display = "block";
        }
      });
      
      sessionStorage.setItem("check", "true");
      this.socket.on('status', data => {
        console.log(data);
        if (data == true) {
          $('#buzzer').prop('disabled', false);
          document.getElementById("buzzer").style.color = "WHITE";
          document.getElementById("buzzer").innerHTML = "PLEASE PRESS";
        } else {
          $('#buzzer').prop('disabled', true);
          document.getElementById("buzzer").style.color = "BLACK";
          document.getElementById("buzzer").innerHTML = "BUZZER DISABLED";
        }
      });
      this.socket.on('close', data => {
        console.log(data)
        if (data == "all" || data == this.team_id) {
          this.router.navigate(["/"]);
        }
      })

    } else {

      this.router.navigate(["/"]);
    }

    
  }

  reload() {
    location.reload();
  }

  home() {
    this.router.navigate(["/"]);
  }
  buzz() {
    //var code = localStorage.getItem("team_no");

    var fd = {
      'team': this.team_id,
      "code": this.session
    }

    this.api.buzz(fd).then(s => {

      console.log(s);

    })
  }

}
