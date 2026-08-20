import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
})
export class ProductFilterComponent {
  @Input() categories$!: Observable<any>;
  catId: number = -1;
  searchTerm: string = '';
  @Output() filterChanged = new EventEmitter<{ catId: number, searchTerm: string }>();
  @Output() filterCleared = new EventEmitter<void>();
  search() {
    this.filterChanged.emit({ catId: this.catId, searchTerm: this.searchTerm });
  }
  clear() {
    this.searchTerm = '';
    this.catId = -1;
    this.filterCleared.emit();
  }
}
