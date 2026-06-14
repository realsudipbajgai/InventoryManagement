using DAL.Models;
using inventory.server.ViewModels;

namespace inventory.server.Extensions
{
    public static class UserMappingExtensions
    {
        public static UserVM ToUserVM(this User user)
        {
            return new UserVM
            {
                Id = user.Id,
                Name = user.Name,
                Address = user.Address,
                Age = user.Age,
                Email = user.Email,
                Phone = user.Phone,
                PhotoPath = user.PhotoPath,
                Role = user.Role
            };
        } 

        public static User toUser(this UserVM userVM)
        {
            return new User
            {
                Id = userVM.Id,
                Name = userVM.Name,
                Address = userVM.Address,
                Age = userVM.Age,
                Email = userVM.Email,
                Phone = userVM.Phone,
                PhotoPath = userVM.PhotoPath,
                Role = userVM.Role
            };
        }
    }

    public static class ProductMappingExtensions
    {
        public static CategoryVM toCategoryVM(this Category category)
        {
            return new CategoryVM
            {
                Id = category.Id,
                Name = category.Name,
                CreatedAt = category.CreatedAt,
                UpdatedAt = category.UpdatedAt,
                ProductsVM=null,
            };
        }

        public static Category toCategory(this CategoryVM categoryVM)
        {
            return new Category
            {
                Id = categoryVM.Id,
                Name = categoryVM.Name,
                CreatedAt = categoryVM.CreatedAt,
                UpdatedAt = categoryVM.UpdatedAt,
                Products = null,

            };
        }
        public static ProductCreateRequestVM toProductVM(this Product product)
        {
            return new ProductCreateRequestVM
            {
                Id = product.Id,
                CategoryId = product.CategoryId,
                Name = product.Name,
                Description = product.Description,
                PurchaseCost = product.PurchaseCost,
                PurchaseDate = product.PurchaseDate,
                QuantityInStock = product.QuantityInStock,
                SerialNumber = product.SerialNumber,
                Status = product.Status,
                CreatedAt = product.CreatedAt,
                UpdatedAt = product.UpdatedAt,
            };
        }

        public static Product toProduct(this ProductCreateRequestVM productVm)
        {
            return new Product
            {
                Id = productVm.Id,
                CategoryId = productVm.CategoryId,
                Name = productVm.Name,
                Description = productVm.Description,
                PurchaseCost = productVm.PurchaseCost,
                PurchaseDate = productVm.PurchaseDate,
                QuantityInStock = productVm.QuantityInStock,
                SerialNumber = productVm.SerialNumber,
                Status = productVm.Status,
                CreatedAt = productVm.CreatedAt,
                UpdatedAt = productVm.UpdatedAt,
            };
        }

    }
}
