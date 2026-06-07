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
            try
            {
               bool result=await _service.DeleteUser(id);
                if (result)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("something went wrong");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Unable to delete movie from database" });
            }
        }
    }
}
