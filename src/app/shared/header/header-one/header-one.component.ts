import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  
  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/Recurso-8.png'; // Default Logo
  @Input() topbar: boolean = false; // Default True
  @Input() sticky: boolean = true; // Default false
  @Input() arrow: string = 'assets/images/icon/arrow-circle-right.png'; 
  @Input() arrow1: string = 'assets/images/icon/arrow-circle-right-1.png'; 
  
  public stick: boolean = false;
  categoria:boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 300 && window.innerWidth > 400) { 
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }
  abrirCategoria(){
    if(this.categoria == true){
      this.categoria = false;
    }else{
      this.categoria = true;
    }
    
    
  }

}
