
import { Component, OnInit, Input } from '@angular/core';
import { FroalaEditorDirective, FroalaViewDirective } from './directives/froala.directives';


@Component({
  selector: 'text-editor',
  template:` <div [froalaEditor]="options" [(froalaModel)]="content"></div>
  `,
  directives: [FroalaEditorDirective, FroalaViewDirective],
  providers: [],
  styleUrls:['/font-awesome.min.css','/froala_editor.min.css','/froala_editor.pkgd.css','/froala_style.min.css']
})

export class TextEditorComponent implements OnInit {

  public editorContent: any;
  titleOptions: any;
  self: any;
  private pluginID: number = 5;

  constructor() {
    this.initializeFloraEditor();
    this.editorContent = "<p>This is my awesome content</p>";

  }

  ngOnInit() {
    // if (this.pluginInfo.parameterValue == undefined) {
    //   this.editorContent = 'debnajan';
    // }
    // else {
    //this.editorContent = this.pluginInfo.parameterValue;
    // }
  }

  private initializeFloraEditor() {
    var self = this;
    this.titleOptions = {
      events: {
        'froalaEditor.blur': (e, editor) => this.handleOnEditorBlur(e, editor)
      }
    }
  }

  private handleOnEditorBlur(e, editor) {
    this.saveReportPluginDetails();

  }

  public saveReportPluginDetails() {
    //this.model.reportid = $stateParams.reportId == undefined ? "0" : $stateParams.reportId;
    //this.model.reportversionid = $stateParams.reportVersionId == undefined ? "0" : $stateParams.reportVersionId;

    /* create object to save data in database */

    // this.pluginModel.id = this.pluginInfo.dashboardId;
    // this.pluginModel.pluginId = this.pluginID;
    // this.pluginModel.sort = this.pluginInfo.sort;
    // this.pluginModel.parameterValue = this.editorContent;
    // this.pluginModel.reportVersionId = this.pluginInfo.reportVersionId;
    // this.pluginModel.reportId = this.pluginInfo.reportId;
    // this.pluginModel.title = '';
    // this.pluginModel.editType = 'single';
    // this.pluginService.saveReportPluginDetails(this.pluginModel).subscribe((result) => {

    // })
  }
}