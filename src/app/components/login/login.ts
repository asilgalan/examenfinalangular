import { Component, inject, Input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',

})
export class Login {

private fb=inject(FormBuilder)
authService=inject(AuthService)
router=inject(Router)
hasError=signal(false);




loginForm:FormGroup=this.fb.group({
  email:['',[Validators.required]],
  password:['',[Validators.required]]

})

onSubmit(){

  console.log("PULSADO");
  
  if(this.loginForm.invalid){
    this.loginForm.markAllAsTouched();
    console.log("algo anda mal");
    
    return;
  }

  const {email,password} =this.loginForm.value;

  this.authService.login(email,password).subscribe((isLogin)=>{
    console.log("too bienn")
    if(isLogin){

  
      this.router.navigateByUrl('/')
      return;
    }

    this.hasError.set(true);

    setTimeout(() => {
      this.hasError.set(false);

    },2000)


  })



}

 }