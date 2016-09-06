export class CallInfoModel {


  data: any;
  Call_ID: number;
  Cmp_ID: number;
  Call_Startdate: any;
  Call_Enddate: any;
  Call_Starttime: any;
  Call_Endtime: any;
  Callendtime: any;
  Call_Status: any;
  getCallInfo() { };
  Call_Name: Array<any>;
  call_Status: Array<any>;
  call_name_data: any;
  Name: any;
  Status_Data: any
  Starttime: Array<any>;
  Endtime: Array<any>;
  Hourlist: Array<any>;
  New_Name:any;
new_Call_Startdate:any;
new_Starttime:any;
new_Call_Enddate:any;
new_Endtime:any;
new_call_Status:any;
};

export class Statuslist {

  constructor(public Call_Status_Name: string) {


  }



}

export class Hourlist {

  constructor(public Hrs: any) {


  }
  Starttime: Array<any>;
  Endtime: Array<any>;


}