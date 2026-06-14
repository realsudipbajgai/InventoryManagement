using inventory.server.ViewModels;

namespace inventory.server.Services.Interface
{
    public interface ICategoryServices
    {
        Task<IEnumerable<CategoryVM>> GetAllCategories();
        Task<CategoryVM?> GetCategoryById(int id);
        Task<CategoryVM> AddCategory(CategoryVM categoryVM);
        Task<CategoryVM> EditCategory(CategoryVM categoryVM);
        Task<bool> DeleteCategory(int id);
    }
}
