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


        public async Task<IEnumerable<ProductVM>> GetAllProducts()
        {
            var products = await _context.Products.Include(p=>p.Category).ToListAsync();
            IEnumerable<ProductVM> productsVM = products.Select(p => p.toProductVM());
            return productsVM;
        }

        public async Task<ProductVM?> GetProductById(int id)
        {
            Product? result = await _context.Products.Include(p=>p.Category).FirstOrDefaultAsync(p => p.Id == id);
            if (result == null) return null;
            return result.toProductVM();
        }
        public async Task<ProductVM> AddProduct(ProductVM productVM)
        {
            Product product = productVM.toProduct();
            await _context.AddAsync(product);
            int rowsAffected = await _context.SaveChangesAsync();
            if (rowsAffected == 0) return null;
            return product.toProductVM();
        }

        public async Task<ProductVM> UpdateProduct(ProductVM productVM)
        {
            Product? prodModel = await _context.Products.FirstOrDefaultAsync(p => p.Id == productVM.Id);
            if (prodModel==null)
            {
                throw new KeyNotFoundException($"Product with ID{productVM.Id} Not Found");
            }
            productVM.MergetoProuctEntity(prodModel);
            int rowAffected=await _context.SaveChangesAsync();
            if (rowAffected <= 0)
            {
                throw new Exception($"Unable to update in database. Try later");
            }
            return prodModel.toProductVM();
        }


    }
}
