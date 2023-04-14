import { Component, OnInit  } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import {Product} from '../../models/product'
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{
  products :Product[] = [];
  categories : string[] = [];
  loading:boolean = false;
  cartProducts:any[]=[];
  constructor(private productsService:ProductsService){}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  
  }
  //get all products////////////////////////////////////
  getProducts(){
    this.loading= true;
    this.productsService.getAllProducts().subscribe((res)=>{
      // console.log(res);
      this.products = res;
      this.loading = false;
      console.log(this.products);
      
      
    }, error=>{
      alert(error.message)
    })
  }
//////////////////////////////////////////////////////////////
//get all categories
  getCategories(){
    this.loading = true;
    this.productsService.getAllCategories().subscribe((res)=>{
  
      this.categories = res;
      this.loading = false;
      console.log(this.categories);
      
      
    }, error=>{
      alert(error.message)
    })
  }
////////////////////////////////////////////////////////////////
// make filter according to category
filterCategory(event:any){

let value = event.target.value ;
if(value == "all"){
  this.getProducts();
}
// console.log(value);
else{
this.getProductCategory(value)
}
}

getProductCategory(word:string){
  this.loading = true
  this.productsService.getProductByCategory(word).subscribe((res)=>{
    this.products = res ;
    this.loading = false ;
  })
}
////////////////////////////////////////////////////////////
addToCart(event:any){
  console.log(event);
  if("cart" in localStorage){
    this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
   
    
    let exist = this.cartProducts.find(item =>item.item.id == event.item.id);
    console.log(exist);
    
    if(exist){
      alert("This item is already exist on your cart");
      console.log("exist");
      
    }
    else{
    this.cartProducts.push(event);
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
    }
  }
  else{
    this.cartProducts.push(event);
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
  }
 
  console.log(this.cartProducts);

  // this.cartProducts = localStorage.getItem("cart");
  
}

}
