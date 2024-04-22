import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Customer } from 'models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login';
  logForm!:FormGroup;
  result!:Customer;

  constructor(private http:HttpClient,private builder:FormBuilder){
    this.logForm=this.builder.group(
      {
        email:new FormControl(),
        password: new FormControl()
      }
    )
  }

  logIn(){
    this.http.post<Customer>("http://localhost:8001/api/custLogIn",this.logForm.value).subscribe(data=>{
      this.result=data;
      console.log(data);
      document.cookie="bookso="+data.email;
      window.location.href="http://localhost:4203";
    },error=>{
      console.log(error.error);
      alert(error.error.message);
    }
    )
    
  }

  goToReg(){
    window.location.href="http://localhost:4201";
  }
}
