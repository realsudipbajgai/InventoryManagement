using System;

namespace DAL.Models
{
    public class InventoryTransaction
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public Product? Product { get; set; }

        public int QuantityChange { get; set; }

        public string? TransactionType { get; set; }
        public string? Notes { get; set; }

        public DateTimeOffset CreatedAt { get; set; }

        public DateTimeOffset? UpdatedAt { get; set; }

        public InventoryTransaction()
        {
            CreatedAt = DateTimeOffset.UtcNow;
        }
    }
}
