import { Component,Directive, ElementRef, Input ,HostListener  } from '@angular/core';

@Directive({ selector: '[myHighlight]' })

export class HighlightDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow';
    }
}

@Directive({
selector: '[numbers-only]'
})

export class NumbersOnlyDirective {
private el: HTMLElement;

constructor(el: ElementRef) {
    this.el = el.nativeElement;
}

@HostListener('keyup', ['$event']) onKeyDown(e ) {

  if (e.keyCode < 48 || e.keyCode > 57) {
      if(e.keyCode < 97){
    e.target.value = e.target.value.slice(0, -1);
  }
}
 }
}

