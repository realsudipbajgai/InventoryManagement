using DAL.Models;
using inventory.server.ViewModels;

namespace inventory.server.Services.Interface
{
    public interface IProductServices
    {
        Task<IEnumerable<ProductCreateRequestVM>> GetAllProducts();
        Task<ProductCreateRequestVM?> GetProductById(int id);

        Task<ProductCreateRequestVM> AddProduct(ProductCreateRequestVM productVM);
    }
}
                