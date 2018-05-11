import { Directive, Output, EventEmitter, Input, SimpleChange } from '@angular/core';

@Directive({
  selector: '[editCreate]'
})
export class EditcreateDirective {

  @Output() editCreate: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  ngOnInit() {      
     this.editCreate.emit('dummy'); 
  } 

}

