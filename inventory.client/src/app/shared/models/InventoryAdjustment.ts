export interface InventoryAdjustment {
  productId: number;
  quantity: number;
  transactionType: string;
  notes?: string;
}
