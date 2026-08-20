import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../products/services/product.service';
import { InventoryAdjustment } from '../../../../shared/models/InventoryAdjustment';
import { Product } from '../../../../shared/models/Product';

@Component({
  selector: 'app-inventory-adjustment',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-adjustment.component.html',
  styleUrl: './inventory-adjustment.component.scss',
})
export class InventoryAdjustmentComponent implements OnInit {

  inventoryAdjData: InventoryAdjustment = {
    productId: 0,
    quantity: 0,
    transactionType: 'Receive',
    notes: ''
  };

  product = signal<Product | null>(null);
  isLoadingProduct = signal(false);
  submitError = signal('');
  submitSuccess = signal(false);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    const productIdFromRoute = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(productIdFromRoute) && productIdFromRoute > 0) {
      this.inventoryAdjData.productId = productIdFromRoute;
      this.isLoadingProduct.set(true);

      this.productService.getProductById(productIdFromRoute).subscribe({
        next: (response: any) => {
          this.product.set(response?.data ?? null);
          this.isLoadingProduct.set(false);
        },
        error: (error: any) => {
          console.error('Failed to load product details', error);
          this.isLoadingProduct.set(false);
        },
      });
    }
  }

  submitAdjustment(): void {
    if (!this.inventoryAdjData.productId) {
      console.error('Product ID is required.');
      return;
    }

    this.submitError.set('');
    this.submitSuccess.set(false);

    this.productService
      .adjustInventory(this.inventoryAdjData)
      .subscribe({
        next: () => {
          this.submitSuccess.set(true);
          this.inventoryAdjData.quantity = 0;
          this.inventoryAdjData.notes = '';
        },
        error: (error: any) => {
          console.error('Failed to adjust inventory', error);
          this.submitError.set('Failed to submit adjustment. Please try again.');
        },
      });
  }
}