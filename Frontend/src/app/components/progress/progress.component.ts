import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProgressreportService } from 'src/app/services/progressreport.service';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  userController = new FormControl();
  userId:any;
  user_subjectReport:any;
  user_learningObj:any;
  user_Lerningbydate:any
  page:number=1;
  totalRecords: any;
  date: any;
  tot_obj_records:any



  constructor(private _studentService:ProgressreportService) { 
    this.date= new FormGroup({
      start: new FormControl(new Date(2015, 2, 24))
    })

  }

  ngOnInit(): void {

  this._studentService.getFormFieldsData().subscribe(value=>{
  this.userId= value.students });
 
 }

 //To show data based on selected student
 selectedUserData(event:any)
  {

    this._studentService.getSelectedUser(event).subscribe(data => {
      this.user_subjectReport = [];
      for (var report of data.subject) {
        for (var sub of report) {
          this.user_subjectReport.push(sub)
        }
      }
      this.user_learningObj = data.learning;
      this.totalRecords = this.user_subjectReport.length;
      this.user_Lerningbydate = []
      const records = this.user_learningObj.filter((value: any[]) => value.some(val => val.time === '2015-03-24'));
      if (!records) return;

      for (let rec of records[0]) {
        this.user_Lerningbydate.push(rec);
      }

    });


  }

  //to show Learning objective based on selected date
  dateChange(event: any) {
    const time = formatDate(event.value, 'YYYY-MM-dd', 'en-US');
    this.user_Lerningbydate = [];
    const records = this.user_learningObj.filter((value: any[]) => value.some(val => val.time === time));
    if(records.length>0)
    {
    for (const rec of records[0]) {
      this.user_Lerningbydate.push(rec);
    }
    }  
   
  }

}


