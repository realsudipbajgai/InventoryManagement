using DAL.Models;
using inventory.server.Shared;
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
        public AuthController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser()
        {
            var user = new ApplicationUser()
            {
                Name="Test User",
                Email = "test@gmail.com",
                UserName = "test@gmail.com"
            };

            var result=await _userManager.CreateAsync(user,"Password@123");

            if (!result.Succeeded) return BadRequest(result.Errors);
            return Ok(new ApiResponse<object> { Success = true, Message = "User Created Successfully" });
        }
    }
}
