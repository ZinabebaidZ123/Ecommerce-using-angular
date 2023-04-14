import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartProducts:any[]=[];
  total:any=0
  success:boolean = false;

  constructor(private cartService:CartsService){}

  ngOnInit():void{
    this.getCartProducts();
  }
  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
     
  }
  console.log(this.cartProducts);
  this.getCartTotal();
}
getCartTotal(){
 this.total = 0 ;
 for(let x in this.cartProducts){
  this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
 }
}

addAmount(index:number){
 this.cartProducts[index].quantity++ ;
 this.getCartTotal();
 localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
}

minusAmount(index:number){
  this.cartProducts[index].quantity-- ;
  this.getCartTotal();
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
}
detectChange(){
  this.getCartTotal();
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
}

deleteProduct(index:any){
  this.cartProducts.splice(index , 1);
  this.getCartTotal();
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
}
clearCart(){
  this.cartProducts = [];
  this.getCartTotal();
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts));

}
addCart(){
  let products = this.cartProducts.map(item=>{
    return {productId:item.item.id  , quantity:item.quantity}
  })
  let Model = {
    userId:5,
    date:new Date(),
    products:products
  }
  this.cartService.createNewCart(Model).subscribe((res)=>{
    this.success = true;
  })
  console.log(Model);
  
}
}
