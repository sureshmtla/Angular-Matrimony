import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pageload',
  templateUrl: './pageload.component.html',
  styleUrls: ['./pageload.component.scss']
})
export class PageloadComponent implements OnInit {
 public moduleFields:any;
 public moduleData:any;

  constructor() { }

  ngOnInit() {
  }

}
