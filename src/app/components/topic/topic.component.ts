import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicModel } from '../../model/topic/topic.model';
import { TopicService } from '../../services/topic/topic.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule ,FormBuilder, Validators  } from '@angular/forms';
import { ControlMessages } from '../../Components/validation/control-messages.component';
import { ValidationService } from '../../services/validation/validation.service';
declare var Materialize:any;
@Component({
  moduleId: module.id,
  selector: 'app-topic',
  templateUrl: 'topic.component.html'
})
export class TopicComponent {
  private model: TopicModel;
  btnText:string;
  topicForm:any
  constructor(private formBuilder: FormBuilder, private service: TopicService, private routeinfo: ActivatedRoute, private router: Router) {
   
    this.bydefault();
     this.getTopicByID(routeinfo.params);

      this.topicForm = this.formBuilder.group({
      'title': ['',[ Validators.required,Validators.minLength(5)]],
      // 'email': ['', [Validators.required, ValidationService.emailValidator]],
      // 'profile': ['', [Validators.required, Validators.minLength(10)]]
    });
  }
// create default object for save topic
  bydefault() {
    this.model = new TopicModel();
    this.btnText='Save Topic';
    this.model.topic_id = 0;
    this.model.topic_title = "";
    this.model.company_id = 1;
    this.model.created_by = 'vipin';
    this.model.updated_by = 'vipin';
  }
  // get Topic by topic_id
  getTopicByID(param:any) {
    if (param.value.id != undefined) {
      this.service.getTopicByID(param.value.id).then(result => {
          this.model =result[0];
          this.btnText = 'Update Topic';
        });
    }
  }
// save topic 
  saveTopic() {
   if (this.topicForm.valid) {
    this.model.company_id = 1;
    this.service.saveTopic(this.model).then(result => {
        if (result) {
          Materialize.toast(this.btnText, 1000, 'rounded');
          this.router.navigate(['/topiclist']);

        }
        else {
         // alert(result.data);
        }
      });
  }

  }
 
}