import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductFilter } from '../../../../../shared/models/ProductFilter';

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
})
export class ProductFilterComponent {
  @Input() categories$!: Observable<any>;
  
  @Output() filterChanged = new EventEmitter<ProductFilter>();
  @Output() filterCleared = new EventEmitter<void>();
  filter:ProductFilter={ categoryId: null, searchTerm: '' };
  search() {
    this.filterChanged.emit(this.filter);
  }
  clear() {
    this.filter = { categoryId: null, searchTerm: '' };
    this.filterCleared.emit();
  }
}
