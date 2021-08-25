import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input() persona: Persona
  @Input() sidenav: any

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openPlan(){
    this.closeSidenav()
  }

  openNotes(){
    this.closeSidenav()
  }

  logOut(){
    this.closeSidenav()
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }
  
  closeSidenav(){
    this.sidenav.toggle()
  }

}
