import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Action } from 'rxjs/internal/scheduler/Action';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id:any;
  data:any = {} ;
  constructor(private router:ActivatedRoute , private productService:ProductsService){
    this.id = this.router.snapshot.params["id"]
  }
  ngOnInit(): void {
    this.getProductById()
  }
  getProductById(){
    this.productService.getProductById(this.id).subscribe((res)=>{
    this.data = res;
    console.log(this.data);
    
    })
  }

}
