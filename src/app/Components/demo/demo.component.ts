import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {


  public status = false;
  constructor() { }

  ngOnInit(): void {
    $('#buzzer').prop('disabled', true);
  }

  buzz(){
    this.status = true;
    $('#buzzer').prop('disabled', true);
  }

  toggle(){
    
      //this.status = true;
      $('#buzzer').prop('disabled', false);
      
    
  }

}
