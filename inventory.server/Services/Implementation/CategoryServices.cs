using DAL.Data;
using DAL.Models;
using inventory.server.Extensions;
using inventory.server.Services.Interface;
using inventory.server.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace inventory.server.Services.Implementation
{
    public class CategoryServices : ICategoryServices
    {
        private readonly ApplicationDbContext _context;
        public CategoryServices(ApplicationDbContext context)
        {
            _context = context;
        }
        public Task<CategoryVM> AddCategory(CategoryVM categoryVM)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteCategory(int id)
        {
            throw new NotImplementedException();
        }

        public Task<CategoryVM> EditCategory(CategoryVM categoryVM)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<CategoryVM>> GetAllCategories()
        {
            IEnumerable<Category> categories= await _context.Categories.ToListAsync();
            var categoriesVM = categories.Select(c => c.toCategoryVM());
            return categoriesVM;
        }

        public async Task<CategoryVM?> GetCategoryById(int id)
        {
            Category? category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (category == null) return null;
            return category.toCategoryVM();
        }
    }
}
