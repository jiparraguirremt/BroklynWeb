import { Component, OnInit, Input, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() themeLogo: string = 'assets/images/icon/Imagen 57.png'; // Default Logo
  @Input() ubicacion: string = 'assets/images/icon/location.png'; 
  @Input() cuenta: string = 'assets/images/icon/cuenta.png'; 
  @Input() campana: string = 'assets/images/icon/campana.png';
  @Input() carrito: string = 'assets/images/icon/carrito.png'; 
  closeResult = '';
  public menuItems: Menu[];

  public products: Product[] = []

  public botones :boolean = false;
  
  public languages = [{ 
    name: 'English',
    code: 'en'
  }, {
    name: 'French',
    code: 'fr'
  }];

  public currencies = [{
    name: 'Euro',
    currency: 'EUR',
    price: 0.90 // price of euro
  }, {
    name: 'Rupees',
    currency: 'INR',
    price: 70.93 // price of inr
  }, {
    name: 'Pound',
    currency: 'GBP',
    price: 0.78 // price of euro
  }, {
    name: 'Dollar',
    currency: 'USD',
    price: 1 // price of usd
  }]

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    private translate: TranslateService,
    public productService: ProductService,
    public navServices: NavService,
    private router: Router) {
    this.productService.cartItems.subscribe(response => this.products = response);
    this.navServices.leftMenuItems.subscribe(menuItems => this.menuItems = menuItems );
    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });
  }

  ngOnInit(): void {
  }

  changeLanguage(code){
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  leftMenuToggle(): void {
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
  }
  mostrarBotones(){

    if(this.botones == true){
      this.botones = false;
    }else{
      this.botones = true;
    }
  }

  // Click Toggle menu (Mobile)
  //toggletNavActive(item) {
   // item.active = !item.active;
 // }

}
