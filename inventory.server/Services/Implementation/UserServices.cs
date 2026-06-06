using DAL.Data;
using DAL.Models;
using inventory.server.Services.Interface;
using inventory.server.ViewModels;

namespace inventory.server.Services.Implementation
{
    public class UserServices : IUserServices
    {
        private readonly ApplicationDbContext _context;
        public UserServices(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<UserVM> GetAllUsers()
        {
            var users = _context.Users.ToList();
            List<UserVM> usersVM = new List<UserVM>();
            foreach (var item in users)
            {
                usersVM.Add(new UserVM
                {
                    Id = item.Id,
                    Name = item.Name,
                    Address = item.Address,
                    Age = item.Age,
                    Email = item.Email,
                    Phone=item.Phone,
                    PhotoPath=item.PhotoPath,
                    Role=item.Role
                });
            }
            return usersVM;
        }
        public UserVM GetUserById(int Id)
        {
            throw new NotImplementedException();
        }
    }
}
