using DAL.Data;
using DAL.Models;
using inventory.server.Extensions;
using inventory.server.Services.Interface;
using inventory.server.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace inventory.server.Services.Implementation
{
    public class ProductServices : IProductServices
    {
        private readonly ApplicationDbContext _context;
        public ProductServices(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<ProductCreateRequestVM>> GetAllProducts()
        {
            var products = await _context.Products.ToListAsync();
            IEnumerable<ProductCreateRequestVM> productsVM = products.Select(p => p.toProductVM());
            return productsVM;
        }

        public async Task<ProductCreateRequestVM?> GetProductById(int id)
        {
            Product? result = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (result == null) return null;
            return result.toProductVM();
        }
        public async Task<ProductCreateRequestVM> AddProduct(ProductCreateRequestVM productVM)
        {
            Product product = productVM.toProduct();
            await _context.AddAsync(product);
            int rowsAffected = await _context.SaveChangesAsync();
            if (rowsAffected == 0) return null;
            return product.toProductVM();
        }


    }
}
