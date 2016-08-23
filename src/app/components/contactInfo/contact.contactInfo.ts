import { Component, ViewChild, EventEmitter } from '@angular/core';
import {DatePipe} from "@angular/common";
import {contactService} from '../../services/contactService';
import {ContactInfoModel} from '../../model/contactInfo';
import { NumbersOnlyDirective } from '../../directives/customdirectives';
@Component({
    selector: 'my-contactInfo',
    outputs: ['updateCompanyInfo'],
    templateUrl: '../app/components/contactInfo/contact.contactInfo.html',
    directives: [NumbersOnlyDirective]


})
export class contact_Info {
    ContactInfoDetail: ContactInfoModel;
    updateCompanyInfo: EventEmitter<any>;
    errContactName: any = false;
    errContactNumber: any = false;
    cancel_status: any = true;
    show_status: any=true;
    demo_Cmp_ID: any;

    constructor(private contactService: contactService) {
        this.updateCompanyInfo = new EventEmitter<any>();
        this.ContactInfoDetail = new ContactInfoModel();
        this.ContactInfoDetail.IsActive = false;
        this.ContactInfoDetail.new_IsActive = false;
        this.show_status = true;

    }

    getParentContact(contact) {
        this.cancel_status = true;
        this.errContactName = false;
        this.errContactNumber = false;
        this.show_status=false;
        this.ContactInfoDetail.Con_ID = contact.Con_ID;
        this.ContactInfoDetail.Con_Name = contact.Con_Name;
        this.ContactInfoDetail.ContactNo = contact.ContactNo;
        this.ContactInfoDetail.Cmp_ID = contact.Cmp_ID;

        this.ContactInfoDetail.IsActive = contact.IsActive.data[0];

    }

    insert_update_contact(status, contact) {
        if (status == 0) {
            if (contact.Con_Name != "" && contact.ContactNo != "") {
                if (contact.Cmp_ID != null) {
                    contact.status = status;
                    this.contactService.insert_Update_Contact_info(contact).map(r => r.json())
                        .subscribe(a => {
                            this.ContactInfoDetail.Con_Name = '';
                            this.ContactInfoDetail.ContactNo = null;
                            //this.ContactInfoDetail.Con_ID = null;
                            this.updateCompanyInfo.emit(a);

                        })


                }
            }

            else {

                if (contact.Con_Name == "") {
                    this.errContactName = true;

                }

                if (contact.ContactNo == "") {
                    this.errContactNumber = true;

                }

            }
        }

        else {
            if (contact.new_Con_Name != '' && contact.new_Con_Name != undefined && contact.new_Con_Name != null) {
                contact.status = status;
                contact.Cmp_ID = this.demo_Cmp_ID;
                this.contactService.insert_Update_Contact_info(contact).map(r => r.json())
                    .subscribe(a => {
                        this.ContactInfoDetail.new_Con_Name = '';
                        this.ContactInfoDetail.new_ContactNo = null;
                        this.ContactInfoDetail.new_IsActive = false;
                        //   this.ContactInfoDetail.Con_ID = null;
                        this.updateCompanyInfo.emit(a);

                    })



            }


        }
    }

    //validation
    change_event_contact_name(value) {
        if (value == '') {

            this.errContactName = true;
        }
        else {
            this.errContactName = false;

        }


    }


    change_event_contact_number(value) {
        if (value == '') {

            this.errContactNumber = true;
        }
        else {
            this.errContactNumber = false;

        }


    }

    cancel_button() {

        this.show_status = true;

    }


    //receve data from contact cmponent through coompany_info
    sendData(contact) {

        this.show_status = false;
        this.cancel_status = true;
        this.errContactName = false;
        this.errContactNumber = false;
        this.ContactInfoDetail.Con_ID = contact.Con_ID;
        this.ContactInfoDetail.Con_Name = contact.Con_Name;
        this.ContactInfoDetail.ContactNo = contact.ContactNo;
        this.ContactInfoDetail.Cmp_ID = contact.Cmp_ID;
        this.demo_Cmp_ID = contact.Cmp_ID;

        this.ContactInfoDetail.IsActive = contact.IsActive.data[0];

    }

    //to receive the data from company info
    sendContactData_info(cmp_ID) {
        this.demo_Cmp_ID = cmp_ID;

    }
    disable_update() {
        this.show_status = true;


    }



    //disable contact info by default
    send_Contact_default_info(){
        this.show_status=true;
    }










}