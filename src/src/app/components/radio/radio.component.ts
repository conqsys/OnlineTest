import { Component, OnInit,Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-radio',
  templateUrl: 'radio.component.html',
  styleUrls: ['radio.component.css']
})
export class RadioComponent implements OnInit {
@Input()model:string;
  constructor() { }

  ngOnInit() {
  }

}
