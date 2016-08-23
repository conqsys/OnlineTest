


import { Component, ViewChild, EventEmitter } from '@angular/core';
import {DatePipe, CORE_DIRECTIVES} from "@angular/common";
import {contactService} from '../../services/contactService';
import {ContactModel} from '../../model/contact';
import {SELECT_DIRECTIVES} from 'ng2-select';
import {contact_Info} from '../contactInfo/contact.contactInfo';
import { NumbersOnlyDirective } from '../../directives/customdirectives';
@Component({
  selector: 'contact-component',
  templateUrl: '../app/components/contact/contact.component.html',

  styleUrls: ['../app/stylesheet/contact.css'],
  directives: [contact_Info, SELECT_DIRECTIVES, CORE_DIRECTIVES, NumbersOnlyDirective],
  outputs: ['updateCompanyInfo','getContactForparent']

})

export class contact_component {
  showContactDetail: boolean = false;
  show_data: any;
  aminities: any;
  i: any;
  Cmp_ID: any;
  items: Array<any>
  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;
  errContactName: any = false;
  errContactNumber: any = false;
  dup_cmpID: any;
  @ViewChild(contact_Info) contact_info_data: contact_Info;
  ContactDetail: ContactModel;
  updateCompanyInfo: EventEmitter<any>;

  getContactForparent:EventEmitter<any>;
  text:any;
  j:any;
 



  constructor(private contactService: contactService) {
    this.ContactDetail = new ContactModel();
    this.updateCompanyInfo = new EventEmitter<any>();
    this.getContactForparent=new EventEmitter<any>();
    this.ContactDetail.new_IsActive = false;
    this.items = [];
    this.aminities = [];
  }

  //getting the call from parent element

  sendContactData(contact, cmpId) {
    this.Cmp_ID = cmpId;
    this.errContactName = false;
    if (contact.length != 0) {

      this.ContactDetail.company_contact_detail = contact;
      this.ContactDetail.Cmp_ID = contact.Cmp_ID;
      this.text = contact.ContactNo;


      for (this.i = 0; this.i < contact.length; this.i++) {



        this.items.push(contact[this.i].ContactNo);
      }
    }
    else {
      this.ContactDetail.company_contact_detail = null;


    }
  }

  //sending call for child element
  updateContactinfo(contact) {

    if (this.showContactDetail) {
      // if (this.show_data.Con_ID == contact.Con_ID) {
      //   this.showContactDetail = false;
      // }
      // else {

        //this.show_data = contact;
        this.getContactForparent.emit(contact);
        //this.contact_info_data.getParentContact(contact);

      this.show_data = contact;


      this.contact_info_data.getParentContact(contact);


    }
    else {

     // this.show_data = contact;
      this.showContactDetail = true;
       this.getContactForparent.emit(contact);
    //    this.contact_info_data.getParentContact(contact);


    }
  }
  //inserting new contact
  insert_contact(ContactDetail) {
    if ((ContactDetail.new_Contact != undefined && ContactDetail.new_Phone != undefined) && (ContactDetail.new_Contact != null && ContactDetail.new_Phone != null) && (ContactDetail.new_Contact != '' && ContactDetail.new_Phone != '')) {
      ContactDetail.Con_ID = 0;
      ContactDetail.Cmp_ID = this.Cmp_ID;
      this.errContactName = false;
      this.contactService.insert_Update_Contact_info(ContactDetail).map(r => r.json())
        .subscribe(a => {
          this.dup_cmpID = a;
          this.ContactDetail.Cmp_ID = null;
          this.ContactDetail.Con_ID = null;
          this.ContactDetail.new_Contact = '';
          this.ContactDetail.new_Phone = null;
          this.ContactDetail.new_IsActive = false;

          this.senddata( this.dup_cmpID);

        //  this.updateContactComponent( this.dup_cmpID);

    
        })
    }
    else {

      if (ContactDetail.new_Contact == "" || ContactDetail.new_Contact == null || ContactDetail.new_Contact == undefined) {
        this.errContactName = true;
        // this.element=

      }
      else {

        this.errContactName = false;
      }

      if (ContactDetail.new_Phone == "" || ContactDetail.new_Phone == null || ContactDetail.new_Phone == undefined) {
        this.errContactNumber = true;

      }
      else {
        this.errContactNumber = false;

      }

    }



  }



  //to get contact info which is inserted

   senddata(a) {

    this.showContactDetail = false;
    this.contactService.getAllContactDetail(a).map(r => r.json())
      .subscribe(a => {
        this.ContactDetail.company_contact_detail = a;



      }


      )


  }



  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value.text = value;
  }

  //validation
  change_event_name(value) {
    if (value == '') {

      this.errContactName = true;
    }
    else {
      this.errContactName = false;

    }


  }


  change_event_number(value) {
    if (value == '') {

      this.errContactNumber = true;
    }
    else {
      this.errContactNumber = false;

    }


  }
  deleteContact(contact, index) {

    this.contactService.deleteContact(contact.Con_ID).
      subscribe(a => {
        this.ContactDetail.company_contact_detail.splice(index, 1);
        this.updateCompanyInfo.emit(a);

      })

  }






}























































