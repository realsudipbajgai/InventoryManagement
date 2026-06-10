using DAL.Data;
using inventory.server.Services.Interface;
using inventory.server.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace inventory.server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserServices _service;
        public UserController(IUserServices service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult> Users()
        {
            try
            {
                var users = await _service.GetAllUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Something went wrong. Please try again later"
                });
            }

        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUser(int id)
        {
            if(id<=0)
            {
                return BadRequest(new { message = "Invalid User Id" });
            }
            var userVM = await _service.GetUserById(id);
            if (userVM == null)
                return NotFound(new { message = "Requested data not found" });
            return Ok(userVM);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] UserVM userVM)
        {
            var result = await _service.AddUser(userVM);
            if (result == null)
            {
                return BadRequest("Something went wrong");
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpGet("edit/{id}")]
        public async Task<IActionResult> Edit(int id)
        {
            var userVM = await _service.GetUserById(id);
            if (userVM == null)
                return NotFound(new { message = "Requested data not found" });
            return Ok(userVM);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromForm] UserVM userVM)
        {
            var result = await _service.EditUser(userVM);
            if (result == null)
            {
                return BadRequest("Something went wrong");
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new { message = "Invalid User Id" });
            }
            try
            {
               bool result=await _service.DeleteUser(id);
                if (result)
                {
                    return Ok(new {success=true,message="Successfully Deleted"});
                }
                else
                {
                    return BadRequest(new { success = false, message = "User not found or could not be deleted" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = "Unabel to delete user. Please try again later" });
            }
        }

        [HttpPost("seedtestusers")]
        public async Task<IActionResult> SeedTestUsers()
        {

            if (await _service.SeedTestData())
            {
                return Ok(new { success = true, message = "Test Data Inserted" });
            }
            else
            {
                return BadRequest(new { success = false, message = "Test Data insertion failed" });
            }
        }
    }
}
