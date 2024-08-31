import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      });
  }

  addItemToCart(): void {
    // Example item to add, you might want to replace this with dynamic data
    const item = { id: 1, total: 100 };
    this.cartService.addtoCart(item);
  }

  clearCart(): void {
    this.cartService.removeAllCart();
  }
}
