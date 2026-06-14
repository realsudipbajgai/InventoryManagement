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
        public async Task<CategoryVM> AddCategory(CategoryVM categoryVM)
        {
            Category cat = categoryVM.toCategory();
            await _context.Categories.AddAsync(cat);
            int rowsAffected=await _context.SaveChangesAsync();
            if (rowsAffected == 0) return null;
            return categoryVM;
        }

        public async Task<bool> DeleteCategory(int id)
        {
            Category? cat = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (cat == null) return false;
            _context.Remove(cat);
            int rowsAffected = await _context.SaveChangesAsync();
            if (rowsAffected == 0) return false;
            return true;
        }

        public async Task<CategoryVM> EditCategory(CategoryVM categoryVM)
        {
            Category? catFromDb = await _context.Categories.FirstOrDefaultAsync(c => c.Id == categoryVM.Id);
            if (catFromDb == null) return null;
            catFromDb.Name = categoryVM.Name;
            catFromDb.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return catFromDb.toCategoryVM();
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
