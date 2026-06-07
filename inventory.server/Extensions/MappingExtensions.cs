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

    }
}
