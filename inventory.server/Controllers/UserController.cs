using DAL.Data;
using inventory.server.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace inventory.server.Controllers
{
    [Route("api/[controller]")]
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
            var users = _service.GetAllUsers();
            return Ok(users);
        }
    }
}
