import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IProduct } from './models/iproduct';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  products!: IProduct[];
  title = 'Welcome To The Shop';

  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
    const observer = {
      next: (response:IProduct[]) =>{
        this.products = response;
        console.log(response);
      },
      error: (err:Error) => alert(err.message)
    }

    this.http.get('https://localhost:44375/Api/V1/Product/List').subscribe((res: any) =>{
      this.products = res;
    }, err => {console.log(err)});
  }
}
