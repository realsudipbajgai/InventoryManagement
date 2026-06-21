using DAL.Data;
using DAL.Models;
using inventory.server.Services.Interface;
using inventory.server.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace inventory.server.Services.Implementation
{
    public class AuthService : IAuthService
    {
        private readonly IJwtService _jwtService;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _usermanager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthService(IJwtService jwtService,ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _jwtService = jwtService;
            _context=context;
            _usermanager = userManager;
            _signInManager = signInManager;
        }
        public async Task<string> Login(ApplicationUserVM userVM)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == userVM.Email);

            if (user == null)
            {
                throw new UnauthorizedAccessException("Email or password did not match");
            }
            var result = await  _signInManager.CheckPasswordSignInAsync(user, userVM.Password,false);
            if (!result.Succeeded)
            {
                throw new UnauthorizedAccessException("Email or password did not match");
            }
            return await _jwtService.GenerateToken(user);
        }
    }
}
