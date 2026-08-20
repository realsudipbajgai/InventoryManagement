using inventory.server.ViewModels;

namespace inventory.server.Services.Interface
{
    public interface IInventoryServices
    {
        Task<bool> AdjustInventory(InventoryAdjustmentVM model);
    }
}
