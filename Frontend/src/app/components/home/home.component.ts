import { Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'node_modules/chart.js';
import {FormControl, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';
import { ProgressreportService } from 'src/app/services/progressreport.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
chart:any;
dateForm: any;
usersData:any;
subjectsData:any;
learningData:any;
subjectData_graph:any;
learningData_graph:any;
selectedUser:any;
selectedSubject:any;
selectedLearning:any;
outputdata:any;
sub_Chart:any;
ler_Chart:any;
color:any;
maxdate = '2015-03-24';
startDate = '2015-03-24';
endDate = '2015-03-25';


userController = new FormControl();
learningObjController = new FormControl();
subjectsController = new FormControl();



  constructor(private _studentService:ProgressreportService,) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  
    this.dateForm = new FormGroup({
      start: new FormControl(new Date(2015, 2, 24))
    });
   
   this.populateFields();
   this.getClassReport();
  }

//to populate fields on form
populateFields()
{
  this._studentService.getFormFieldsData().subscribe(data => {
    this.usersData = data.students;
    this.subjectsData = data.subjects;
    this.learningData = data.learnings;
});
}

//get complete report of the class
getClassReport()
{
  this._studentService.getClassReport({beginDate: this.startDate, endDate: this.endDate}).subscribe(data=>{
    this.outputdata= JSON.parse(JSON.stringify(data))
    this.subjectData_graph = this.outputdata.subject;
    this.learningData_graph = this.outputdata.learning;
    this.displaySubjectGraph(this.subjectData_graph.count,this.subjectData_graph.answers);
    this.displayLearningGraph(this.learningData_graph.count,this.learningData_graph.answers)
    
    })

}


//event to get data for selected user
userChanged(event:any)
{
  this.selectedUser=event;
  this.getReportBySelection()
 }

 //event to get data for selected subject
subjectChanged(event:any)
{
 this.selectedSubject=event;
 this.getReportBySelection();
}

//event to get  data for selected Learning objective
learningObjChanged(event:any)
{
  this.selectedLearning=event;
  this.getReportBySelection();
 
}

 //event to get data for  selected date
 dateChange(event:any)
{

 this.startDate=formatDate(event.value, 'YYYY-MM-dd', 'en-US');
 this.getReportBySelection();
}


//To get data based on selected criteria
 getReportBySelection()
 {

  var myFutureDate=new Date(this.startDate);
  myFutureDate.setDate(myFutureDate.getDate()+ 1);
  this.endDate = formatDate(myFutureDate, 'YYYY-MM-dd', 'en-US');

    const filterdata={
      student:this.selectedUser,
      learning:this.selectedLearning,
      subject:this.selectedSubject,
      beginDate: this.startDate,
      endDate: this.endDate
    }


     this._studentService.getClassReportBySelection(filterdata).subscribe(data => {
      this.subjectData_graph = data.subject;
      this.learningData_graph = data.learning
      this.displaySubjectGraph(this.subjectData_graph.count,this.subjectData_graph.answers);
      this.displayLearningGraph(this.learningData_graph.count,this.learningData_graph.answers)
  
     })

 }


 displaySubjectGraph(count:any,subject:any)
 {
   if(this.sub_Chart!= null)
   {
   this.sub_Chart.destroy();
   }
  
    this.sub_Chart = new Chart("cht", {
      type: 'bar',
      data: {
        labels:subject,
        datasets: [{
         label: '# of Exercises',
          data: count,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 205, 86, 0.2)',
              ],
          borderColor: [
          
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
     
          ],
          borderWidth:1,
          barThickness: 40,

        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {

            grid: {
              display: false
            }
          },
       
        }
      }
    });

 }

 displayLearningGraph(count:any,answers:any)
 {
    if(this.ler_Chart!= null)
    {
    this.ler_Chart.destroy();
    }
   const bgcolor=[];
   const bordercolor=[];


   //generates randon colors for graph
     for( let i =0;i< answers.length;i++)
     {
       const r =Math.floor(Math.random()*255)
       const g =Math.floor(Math.random()*255)
       const b =Math.floor(Math.random()*255)
        bgcolor.push('rgba('+r+','+g+','+b+',0.2)');
        bordercolor.push('rgba('+r+','+g+','+b+',1)');
     }
  
    this.ler_Chart = new Chart("lerningchart", {
      type: 'bar',
      data: {
        labels:answers,
        datasets: [{
          label: '# of Exercises',
          data: count,
          backgroundColor:bgcolor,
          borderColor:bordercolor, 
          borderWidth:1,
          barThickness: 25,

        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
       
        }
      }
    });

 }


}