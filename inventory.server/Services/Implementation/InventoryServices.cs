using DAL.Data;
using DAL.Models;
using inventory.server.Services.Interface;
using inventory.server.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace inventory.server.Services.Implementation
{
    public class InventoryServices : IInventoryServices
    {
        private readonly ApplicationDbContext _context;

        public InventoryServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AdjustInventory(InventoryAdjustmentVM model)
        {
            try
            {
                var product = await _context.Products.FindAsync(model.ProductId);
                if (product == null)
                    return false;

                product.QuantityInStock += model.Quantity;

                var transaction = new InventoryTransaction
                {
                    ProductId = model.ProductId,
                    TransactionType = model.TransactionType,
                    QuantityChange = model.Quantity,
                    CreatedAt = DateTime.UtcNow,
                    Notes = model.Notes
                };

                _context.InventoryTransactions.Add(transaction);
                await _context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
