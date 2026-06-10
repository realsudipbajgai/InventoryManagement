using DAL.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Data
{
    public class DBSeeder
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
                context.Database.EnsureCreated();
                if (!context.Users.Any())
                {
                    context.AddRange(GetUsersList());
                    context.SaveChanges();
                }
            }
        }
        public static List<User> GetUsersList()
        {
            var categories = new List<User>
            {
                new User { Name="Admin",Email="admin@test.com",Phone="2042222222",Age=29,Role="Admin",Address="Nepal",PhotoPath="myfilepath" },
                new User { Name="Manager",Email="manager@test.com",Phone="2042222222",Age=24,Role="Manager",Address="Nepal",PhotoPath="myfilepath" },
                new User { Name="Employee",Email="employee@test.com",Phone="2042222222",Age=22,Role="Employee",Address="Nepal",PhotoPath="myfilepath" },
            };
            return categories;
        }
    }
}
