using DAL.Models;
using inventory.server.ViewModels;

namespace inventory.server.Services.Interface
{
    public interface IProductServices
    {
        Task<IEnumerable<ProductVM>> GetAllProducts();
        Task<ProductVM?> GetProductById(int id);

        Task<ProductVM> AddProduct(ProductVM productVM);

        Task<ProductVM> UpdateProduct(ProductVM productVM);

        Task<bool> DeleteProduct(int id);
    }
}
                