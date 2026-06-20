using DAL.Data;
using DAL.Models;
using inventory.server.Extensions;
using inventory.server.Services.Interface;
using inventory.server.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace inventory.server.Services.Implementation
{
    public class Employeeervices : IEmployeeServices
    {
        private readonly ApplicationDbContext _context;
        public Employeeervices(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<EmployeeVM>> GetAllEmployees()
        {
            var users = await _context.Employees.ToListAsync();
            List<EmployeeVM> usersVM = new List<EmployeeVM>();
            foreach (var item in users)
            {
                usersVM.Add(new EmployeeVM
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
        public async Task<EmployeeVM?> GetEmployeeById(int Id)
        {
            Employee? user = await _context.Employees.FirstOrDefaultAsync(u => u.Id == Id);
            if (user == null)
            {
                return null;
            }
            EmployeeVM userVM = user.ToEmployeeVM();

            return userVM;
        }

        public async Task<EmployeeVM> AddEmployee(EmployeeVM userVM)
        {
            Employee user = userVM.ToEmployee();
            await _context.Employees.AddAsync(user);
            await _context.SaveChangesAsync();
            return user.ToEmployeeVM();
        }

        public async Task<bool> DeleteEmployee(int Id)
        {
            var userFromDb = await _context.Employees.FirstOrDefaultAsync(u => u.Id == Id);
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

        public async Task<EmployeeVM> EditEmployee(EmployeeVM userVM)
        {
            var userFromDb = await _context.Employees.FirstOrDefaultAsync(u => u.Id == userVM.Id);
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
                return userFromDb.ToEmployeeVM();
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> SeedTestData()
        {
            try
            {
                var users = new List<Employee>
                {
                    new Employee { Name = "Test A", Email = "a@test.com", Phone = "111", Role = "Dev" },
                    new Employee { Name = "Test B", Email = "b@test.com", Phone = "222", Role = "QA" },
                    new Employee { Name = "Test C", Email = "c@test.com", Phone = "333", Role = "HR" }
                };
                await _context.Employees.AddRangeAsync(users);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
            
        }
    }
}
