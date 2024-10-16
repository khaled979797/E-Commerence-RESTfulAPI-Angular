import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
  validationErrors: string[] = [];
  constructor(private http: HttpClient, private router: Router, private toastr:ToastrService) {}

  get404Error(){
    this.http.get(environment.apiUrl + 'Product/50').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get500Error(){
    this.http.get(environment.apiUrl + 'Buggy/ServerError').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get400Error(){
    this.http.get(environment.apiUrl + 'Buggy/BadRequest').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get400ValidationError(){
    this.http.get(environment.apiUrl + 'Product/Fifty').subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error);
        this.validationErrors = error.errors;
      }
    });
  }
}
