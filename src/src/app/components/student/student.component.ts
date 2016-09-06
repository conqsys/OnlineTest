
import { Component, ViewChild, Input } from '@angular/core';
import {DatePipe, FORM_DIRECTIVES} from "@angular/common";

import {StudentModel} from '../../model/student/student';
import {StudentService} from '../../services/student/studentService';

@Component({
    selector:'my-student',
    templateUrl: '../app/components/student/student.component.html',
    providers:[StudentService],
    directives: [FORM_DIRECTIVES]
})
export /**
 * Student
 */
  class StudentComponent {

    title: string;
    model: StudentModel;
    classData: Array<any>=[];
    studentDetails: Array<any>=[];
    selectedRowId:any;

    public isLoading: boolean;
    isShown:boolean;

    
   

    constructor(private studentService:StudentService) {
        this.title = 'Student Details'
        this.isLoading = true;
        this.createStudentInstance();
        this.getStudents();
        this.isShown=true;
        
    }

    createStudentInstance(){
        this.model=new StudentModel();
        this.model.StudentID = 0;
        this.model.ClassID = 0;
        this.model.Gender='Male';
        var date = new Date();
        var mmm = date.getMonth() + 1;
        var mm = mmm < 10 ? ('0'+mmm):mmm;
        var dd = date.getDate() < 10 ? ('0'+date.getDate()):date.getDate();
        this.model.DateOfBirth=date.getFullYear()+'-'+mm+'-'+dd;
        this.model.CreatedBy='amit';
        this.model.ModifiedBy='amit';
    }

    getStudents(){
        this.studentService.getStudents().map(r => r.json())
        .subscribe(a => { 
            this.studentDetails = a;
            this.isLoading = false;
        });
    }

    showStudentDetail(studentData, isAdd){
        
    }

    UpdateStudentInfo(studentData){
        alert('Student successfully updated.');
        this.getStudents();
    }
HideStudentInfo(msg){
    this.isShown=true;
}
    deleteStudent(student){
        
    }

    fireEvent(){
        //this.eventService.broadcast('new-event', 'Test1', 'Test2');
    }
}