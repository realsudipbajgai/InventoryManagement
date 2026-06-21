using DAL.Models;
using inventory.server.Services.Interface;
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
        private readonly IAuthService _authService;

        public AuthController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IAuthService authService
            )
        {
            _userManager = userManager;
            _signinManager = signInManager;
            _authService = authService;
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
                var result = await _authService.Login(userVM);
                return Ok(new ApiResponse<object> { Success = true, Data = new {token=result} ,Message = "Login Successful" });
            }
            catch (UnauthorizedAccessException ex)
            {
                return BadRequest(new ApiResponse<object> { Success=false,Message=ex.Message});
            }
            catch(Exception ex)
            {
                return StatusCode(500,new ApiResponse<object> { Success = false, Message="Something Went Wrong" });
            }

        }
    }
}
