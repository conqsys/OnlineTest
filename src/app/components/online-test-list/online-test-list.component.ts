import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OnlineTestModel } from '../../model/online-test/online-test.model';
import { OnlineTestService } from '../../services/online-test/online-test.service';

@Component({
  moduleId: module.id,
  selector: 'online-test-list',
  templateUrl: 'online-test-list.component.html',

})
export class OnlineTestListComponent {
  private onlineTestData: Array<OnlineTestModel>;
  constructor(private service: OnlineTestService, private router: Router) {
    this.getOnlineTests();
  }
// get test details 
  getOnlineTests() {
    this.service.getOnlineTests().then(result => {
      if (result != undefined && result != null) {
         this.onlineTestData = result;
      }
      else {
        // alert(result.data);
      }
    });
  }

  //pass the online_test_id to online-test component.ts 
  public editTest(item: OnlineTestModel) {
    this.router.navigate(['/onlinetest/' + item.online_test_id]);
  }
  //open onlinetest page for add test 
  public showOnlineTest() {
    this.router.navigate(['/onlinetest']);
  }
//delete test by online_test_id
  public removeTest(item: OnlineTestModel) {
    // this.data = _.filter(this.data, (elem)=>elem!=item);
    this.service.removeOnlineTest(item.online_test_id).then(result => {
      if (result) {
        alert("record succesfully deleted!");
        this.getOnlineTests();
      }
      else {
        alert("record not deleted!");
      }
    });
  }

}