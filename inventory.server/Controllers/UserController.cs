using DAL.Data;
using inventory.server.Services.Interface;
using inventory.server.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using inventory.server.Shared;


namespace inventory.server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserServices _service;
        private readonly IWebHostEnvironment _env;
        public UserController(IUserServices service, IWebHostEnvironment env)
        {
            _service = service;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> Users()
        {
            try
            {
                var users = await _service.GetAllUsers();
                var apiResponse = new ApiResponse<IEnumerable<UserVM>> { Success = true, Data = users };
                return Ok(apiResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = "Something went wrong. Please try again later"
                });
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new ApiResponse<object> { Success = false, Message = "Invalid User Id" });
                }
                var userVM = await _service.GetUserById(id);
                if (userVM == null)
                    return NotFound(new ApiResponse<object> { Success = false, Message = "Requested data not found" });
                return Ok(new ApiResponse<UserVM> { Success = true, Data = userVM });
            }
            catch
            {
                return StatusCode(500, new ApiResponse<object> { Success = false, Message = "Unable to fetch user" });

            }

        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] UserVM userVM)
        {
            try
            {
                if (userVM.Photo != null && userVM.Photo.Length > 0)
                {
                    // 1. Get the main project directory path
                    var projectRoot = _env.ContentRootPath;

                    // 2. Define the path to wwwroot
                    var wwwrootPath = Path.Combine(projectRoot, "wwwroot");

                    // 3. If wwwroot doesn't exist, create it
                    if (!Directory.Exists(wwwrootPath))
                    {
                        Directory.CreateDirectory(wwwrootPath);
                    }
                    var uploadsFolder = Path.Combine(wwwrootPath, "uploads");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(userVM.Photo.FileName);
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await userVM.Photo.CopyToAsync(fileStream);
                    }
                    // This is the relative path you save to the Database (e.g., "uploads/unique_name.jpg")
                    userVM.PhotoPath = Path.Combine("uploads", uniqueFileName).Replace('\\', '/');
                }
                var result = await _service.AddUser(userVM);
                if (result == null)
                {
                    return BadRequest(new ApiResponse<object> { Success = false, Message = "Unable to add data. Try again" });
                }
                else
                {
                    return Ok(new ApiResponse<UserVM> { Success = true, Data =result });
                }
            }
            catch(Exception ex)
            {
                return BadRequest(new ApiResponse<object> { Success = false, Message = "Internal server error" });
            }

        }

        [HttpGet("edit/{id}")]
        public async Task<IActionResult> Edit(int id)
        {
            try
            {
                var userVM = await _service.GetUserById(id);
                if (userVM == null)
                {
                    return NotFound(new ApiResponse<object> { Success = false, Message = "Requested data not found" });
                }
                else
                {
                    return Ok(new ApiResponse<UserVM> { Success = true, Data = userVM });

                }
            }
            catch(Exception ex)
            {
                return BadRequest(new ApiResponse<object> { Success = false, Message = "Internal server error" });
            }
          
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromForm] UserVM userVM)
        {
            try
            {
                var result = await _service.EditUser(userVM);
                if (result == null)
                {
                    return BadRequest(new ApiResponse<object> { Success = false, Message = "Invalid data selected. Try again." });
                }
                else
                {
                    return Ok(new ApiResponse<UserVM> { Success = true, Message = "Update Successful", Data = result });
                }
            }
            catch
            {
                return BadRequest(new ApiResponse<object> { Success = false, Message = "Internal server error" });
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            try
            {
                if (id <= 0)
                {
                    return BadRequest(new ApiResponse<object> { Success = false, Message = "Invalid User Id" });
                }
                bool result = await _service.DeleteUser(id);
                if (result)
                {
                    return Ok(new ApiResponse<object> { Success = true, Message = "Delete Successful" });
                }
                else
                {
                    return BadRequest(new ApiResponse<object> { Success = false, Message = "User not found or could not be deleted" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object> { Success = false, Message = "Unable to delete user. Please try again later" });
            }
        }

        [HttpPost("seedtestusers")]
        public async Task<IActionResult> SeedTestUsers()
        {

            if (await _service.SeedTestData())
            {
                return Ok(new ApiResponse<object> { Success = true, Message = "Test Data Inserted" });
            }
            else
            {
                return BadRequest(new ApiResponse<object> { Success = false, Message = "Test Data insertion failed" });
            }
        }
    }
}
