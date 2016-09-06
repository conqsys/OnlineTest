import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-check-box',
  templateUrl: 'check-box.component.html',
  styleUrls: ['check-box.component.css']
})
export class CheckBoxComponent implements OnInit {
 private firstName = "";
  private selectedOption = "";

  private selectOptions = [];
  constructor() { }

  ngOnInit() {
     window.setTimeout(()=>{
        this.selectOptions = [
          {value:1,name:"Option 1"},
          {value:2,name:"Option 2"},
          {value:3,name:"Option 3"}
        ]
      },100);
  }

}
