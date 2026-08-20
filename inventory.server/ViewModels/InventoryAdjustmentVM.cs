namespace inventory.server.ViewModels
{
    public class InventoryAdjustmentVM
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string TransactionType { get; set; }
        public string? Notes { get; set; }
    }
}
