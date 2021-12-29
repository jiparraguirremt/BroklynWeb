import { Component, OnInit ,Input} from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {
  @Input()imagen1 :string='assets/images/icon/delivery-truck.png'
  @Input()imagen2 :string='assets/images/icon/support.png'
  @Input()imagen3 :string='assets/images/icon/return.png'
  @Input()imagen4 :string='assets/images/icon/credit-card.png'
  @Input()celular :string='assets/images/icon/celular.png'
  @Input()audio :string='assets/images/icon/audio.png'
  @Input()laptop :string='assets/images/icon/laptop.png'
  @Input()moda :string='assets/images/icon/moda.png'
  @Input()televisor :string='assets/images/icon/televisor.png'
  @Input()videojuegos :string='assets/images/icon/videojuegos.png'
  @Input()tele :string='assets/images/icon/Imagen 57.png'
  @Input()familia :string='assets/images/icon/familia.png'
  @Input()deporte :string='assets/images/icon/deporte.png'
  @Input()north :string='assets/images/icon/north.png'
  @Input()paisaje :string='assets/images/icon/paisaje.png'


  public products: Product[] = [];
  public productCollections: any[] = [];
  
  constructor(public productService: ProductService) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'fashion');
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });
  }

  public ProductSliderConfig: any = ProductSlider;

  public sliders = [{
    //title: 'welcome to fashion',
    //subTitle: 'Men fashion',
    image: 'assets/images/slider/slider.PNG'
  }, {
    //title: 'welcome to fashion',
    //subTitle: 'Women fashion',
    image: 'assets/images/slider/slider.PNG'
  }]

  // Collection banner
  public collections = [{
    image: 'assets/images/collection/fashion/1.jpg',
    save: 'save 50%',
    title: 'men'
  }, {
    image: 'assets/images/collection/fashion/2.jpg',
    save: 'save 50%',
    title: 'women'
  }];

  // Blog
  public blog = [{
    image: 'assets/images/blog/1.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/2.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/3.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/4.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];

  ngOnInit(): void {
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }
  
}
