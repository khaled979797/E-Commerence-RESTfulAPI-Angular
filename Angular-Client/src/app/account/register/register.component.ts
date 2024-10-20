import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { error } from 'console';
import { map, of, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm:FormGroup = new FormGroup({});
  errors?:string[];
  constructor(private fb:FormBuilder, private accountService:AccountService, private router:Router){}
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      displayName:[null, [Validators.required]],
      email:[null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNotTaken()]],
      password:[null, [Validators.required]]
    });
  }

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next: () =>{
        this.router.navigateByUrl('/shop');
      },
      error: (err:any) =>{
        this.errors = err.errors;
      }
    });
  }

  validateEmailNotTaken(): AsyncValidatorFn{
    return control =>{
      return timer(500).pipe(
        switchMap(() => {
          if(!control.value){
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res =>{
              return res ? {emailExists: true} : null;
            })
          );
        })
      );
    }
  }

  get displayName(){
    return this.registerForm.get('displayName') as FormControl;
  }

  get email(){
    return this.registerForm.get('email') as FormControl;
  }

  get password(){
    return this.registerForm.get('password') as FormControl;
  }
}
