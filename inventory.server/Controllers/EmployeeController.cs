using DAL.Data;
using inventory.server.Services.Interface;
using inventory.server.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using inventory.server.Shared;
using Microsoft.AspNetCore.Authorization;


namespace inventory.server.Controllers
{
    [Route("api/users")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeServices _service;
        private readonly IWebHostEnvironment _env;
        public EmployeeController(IEmployeeServices service, IWebHostEnvironment env)
        {
            _service = service;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> Users()
        {
            try
            {
                var users = await _service.GetAllEmployees();
                var apiResponse = new ApiResponse<IEnumerable<EmployeeVM>> { Success = true, Data = users };
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
                var userVM = await _service.GetEmployeeById(id);
                if (userVM == null)
                    return NotFound(new ApiResponse<object> { Success = false, Message = "Requested data not found" });
                return Ok(new ApiResponse<EmployeeVM> { Success = true, Data = userVM });
            }
            catch
            {
                return StatusCode(500, new ApiResponse<object> { Success = false, Message = "Unable to fetch user" });

            }

        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] EmployeeVM userVM)
        {
            try
            {
                this.uploadPhoto(userVM);
                var result = await _service.AddEmployee(userVM);
                if (result == null)
                {
                    return BadRequest(new ApiResponse<object> { Success = false, Message = "Unable to add data. Try again" });
                }
                else
                {
                    return Ok(new ApiResponse<EmployeeVM> { Success = true, Data =result });
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
                var userVM = await _service.GetEmployeeById(id);
                if (userVM == null)
                {
                    return NotFound(new ApiResponse<object> { Success = false, Message = "Requested data not found" });
                }
                else
                {
                    return Ok(new ApiResponse<EmployeeVM> { Success = true, Data = userVM });

                }
            }
            catch(Exception ex)
            {
                return BadRequest(new ApiResponse<object> { Success = false, Message = "Internal server error" });
            }
          
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromForm] EmployeeVM userVM)
        {
            try
            {
                this.uploadPhoto(userVM);
                var result = await _service.EditEmployee(userVM);
                if (result == null)
                {
                    return BadRequest(new ApiResponse<object> { Success = false, Message = "Invalid data selected. Try again." });
                }
                else
                {
                    return Ok(new ApiResponse<EmployeeVM> { Success = true, Message = "Update Successful", Data = result });
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
                var userVM = await _service.GetEmployeeById(id);
                bool result = await _service.DeleteEmployee(id);
                if (result)
                {
                    if(userVM!=null&& !string.IsNullOrEmpty(userVM.PhotoPath))
                    {
                        var fullFilePath = Path.Combine(_env.ContentRootPath, "wwwroot", userVM.PhotoPath);
                        try
                        {
                            if (System.IO.File.Exists(fullFilePath))
                            {
                                System.IO.File.Delete(fullFilePath);
                            }
                        }
                        catch(Exception ex)
                        {
                            Console.WriteLine($"File deletion failed:{ex.Message}");
                        }
                    }
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

        private async void uploadPhoto(EmployeeVM userVM)
        {
            if (userVM.Photo != null && userVM.Photo.Length > 0)
            {
                var projectroot = _env.ContentRootPath;
                var wwwrootpath = Path.Combine(projectroot, "wwwroot");
                if (!Directory.Exists(wwwrootpath))
                {
                    Directory.CreateDirectory(wwwrootpath);
                }
                var uploadsFolder = Path.Combine(wwwrootpath, "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(userVM.Photo.FileName);
                var fikePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(fikePath, FileMode.Create))
                {
                    await userVM.Photo.CopyToAsync(fileStream);
                }
                userVM.PhotoPath = Path.Combine("uploads", uniqueFileName).Replace("\\", "/");
            }
        }
    }
}
