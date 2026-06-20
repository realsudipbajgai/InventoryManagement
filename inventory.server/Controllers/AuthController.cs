using DAL.Models;
using inventory.server.Shared;
using inventory.server.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace inventory.server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signinManager;
        public AuthController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signinManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser()
        {
            var user = new ApplicationUser()
            {
                Name="Admin",
                Email = "admin@gmail.com",
                UserName = "admin@gmail.com"
            };

            var result=await _userManager.CreateAsync(user,"Password123$");

            if (!result.Succeeded) return BadRequest(result.Errors);
            return Ok(new ApiResponse<object> { Success = true, Message = "User Created Successfully" });
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(ApplicationUserVM userVM)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(userVM.Email);
                if (user == null)
                {
                    return Unauthorized(new ApiResponse<object> { Success = false, Message = "Invalid email or password" });
                }

                var result = await _signinManager.CheckPasswordSignInAsync(user, userVM.Password, false);
                if (!result.Succeeded)
                {
                    return Unauthorized(new ApiResponse<object> { Success = false, Message = "Invalid email or password" });
                }
                return Ok(new ApiResponse<object> { Success = true, Message = "Login Successful" });
            }
            catch(Exception ex)
            {
                return BadRequest("Not working");
            }
            
        }
    }
}
