using DAL.Data;
using DAL.Models;
using inventory.server.Extensions;
using inventory.server.Services.Interface;
using inventory.server.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace inventory.server.Services.Implementation
{
    public class UserServices : IUserServices
    {
        private readonly ApplicationDbContext _context;
        public UserServices(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<UserVM>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
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
                    Phone = item.Phone,
                    PhotoPath = item.PhotoPath,
                    Role = item.Role
                });
            }
            return usersVM;
        }
        public async Task<UserVM?> GetUserById(int Id)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Id);
            if (user == null)
            {
                return null;
            }
            UserVM userVM = user.ToUserVM();

            return userVM;
        }

        public async Task<UserVM> AddUser(UserVM userVM)
        {
            User user = userVM.toUser();
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user.ToUserVM();
        }

        public async Task<bool> DeleteUser(int Id)
        {
            var userFromDb = await _context.Users.FirstOrDefaultAsync(u => u.Id == Id);
            if (userFromDb == null)
            {
                return false;

            }
            else
            {

                _context.Remove(userFromDb);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<UserVM> EditUser(UserVM userVM)
        {
            var userFromDb = _context.Users.FirstOrDefault(u => u.Id == userVM.Id);
            if (userFromDb != null)
            {
                userFromDb.Name = userVM.Name;
                userFromDb.Email = userVM.Email;
                userFromDb.Phone = userVM.Phone;
                userFromDb.Age = userVM.Age;
                userFromDb.Address = userVM.Address;
                userFromDb.Role = userVM.Role;
                userFromDb.PhotoPath = userVM.PhotoPath;
                await _context.SaveChangesAsync();
                return userFromDb.ToUserVM();
            }
            else
            {
                return null;
            }
        }
    }
}
