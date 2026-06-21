using inventory.server.Services.Interface;
using inventory.server.Shared;
using inventory.server.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace inventory.server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryServices _service;
        public CategoriesController(ICategoryServices service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryVM>>> Categories()
        {
            try
            {
                var result = await _service.GetAllCategories();
                if (result.IsNullOrEmpty())
                {
                    return Ok(new ApiResponse<object> { Success = true, Data = result, Message = "No Data Found" });
                }
                return Ok(new ApiResponse<object> { Success = true, Data = result, Message = "Data Fetch Successfull. Testing Ci/CD" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object> { Success = false, Message = "Internal service error. Try again later" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryVM>>GetCategoryById(int id)
        {
            try
            {
                var result = await _service.GetCategoryById(id);
                if (result == null)
                {
                    return Ok(new ApiResponse<object> { Success = false, Data = result, Message = "No Data Found" });
                }
                return Ok(new ApiResponse<object> { Success = true, Data = result, Message = "Data Fetch Successfull" });
            }
            catch
            {
                return StatusCode(500, new ApiResponse<object> { Success = false, Message = "Internal service error. Try again later" });
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody] CategoryVM catVM)
        {
            try
            {
                var result = await _service.AddCategory(catVM);
                if (result == null) return BadRequest(new ApiResponse<object> { Success = false, Message = "Unable to add category" });
                return Ok(new ApiResponse<object> { Success = true, Data = result, Message = "Data Insert Successfull" });
            }
            catch
            {
                return StatusCode(500, new ApiResponse<object> { Success = false, Message = "Internal service error. Try again later" });
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditCategory([FromBody] CategoryVM catVM)
        {
            try
            {
                var result = await _service.EditCategory(catVM);
                if (result == null) return BadRequest(new ApiResponse<object> { Success = false, Message = "Unable to add category" });
                return Ok(new ApiResponse<object> { Success = true, Data = result, Message = "Data Update Successfull" });
            }
            catch
            {
                return StatusCode(500, new ApiResponse<object> { Success = false, Message = "Internal service error. Try again later" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var result = await _service.DeleteCategory(id);
                if (!result) return NotFound(new ApiResponse<object> { Success = false, Message = "Record Not Found. Try again" });
                return Ok(new ApiResponse<object> { Success = true, Message = "Delete Successfull" });
            }
            catch
            {
                return StatusCode(500, new ApiResponse<object> { Success = false, Message = "Internal service error. Try again later" });
            }
        }
    }
}
