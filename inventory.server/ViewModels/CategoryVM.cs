using DAL.Models;

namespace inventory.server.ViewModels
{
    public class CategoryVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public IEnumerable<ProductCreateRequestVM> ProductsVM { get; set; }
    }
}
