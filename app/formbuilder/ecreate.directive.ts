import { Directive, Output, EventEmitter, Input, SimpleChange } from '@angular/core';

@Directive({
  selector: '[appEcreate]'
})
export class EcreateDirective {

  @Output() appEcreate: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  ngOnInit() {      
     this.appEcreate.emit('dummy'); 
  } 

}

