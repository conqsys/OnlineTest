
import { Component, OnInit, Input } from '@angular/core';
import { FroalaEditorDirective, FroalaViewDirective } from './directives/froala.directives';


@Component({
  selector: 'text-editor',
  template: ` <div [froalaEditor]="options" [(froalaModel)]="content"></div>
  `,
  directives: [FroalaEditorDirective, FroalaViewDirective],
  providers: [],
  styleUrls: []
})

export class TextEditorComponent implements OnInit {

  public editorContent: any;
  titleOptions: any;

  constructor() {
    this.initializeFloraEditor();
  

  }

  ngOnInit() {
    this.editorContent = "<p>This is my awesome content</p>";
 
  }

  private initializeFloraEditor() {
    var self = this;
      this.editorContent = "<p>This is my awesome content</p>";
    this.titleOptions = {
      placeholderText: 'Edit Your Content Here!',
      charCounterCount: false
    }

  }

 
}