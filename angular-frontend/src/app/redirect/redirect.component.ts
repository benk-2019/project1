import { Component } from '@angular/core';
import { Router } from '@angular/router';


//just here to route from homepage to teams page
@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css'
})
export class RedirectComponent {
  constructor(private router:Router){
    this.redirect();
  }

  redirect(){
    this.router.navigate(['/teams']);
  }
}
