using DAL.Models;
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
    public class ProductsController : ControllerBase
    {
        private readonly IProductServices _service;
        public ProductsController(IProductServices service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Products()
        {
            try
            {
                var result = await _service.GetAllProducts();
                return Ok(new ApiResponse<object> { Success = true, Data = result, Message = "Fetched all products" });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object> { Success = false, Message = "Unable to fetch products. Try again later" });
            }

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            try
            {
                var result = await _service.GetProductById(id);
                if(result==null)
                {
                    return NotFound(new ApiResponse<object> { Success = false, Message = "Unable to find the product" });
                }
                return Ok(new ApiResponse<object> { Success = true, Data = result, Message = "Fetched product Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object> { Success = false, Message = "Server error. Try again later" });

            }
        }

        [HttpPost]
        public async Task<IActionResult> Products([FromForm]ProductVM productVm)
        {
            try
            {
                var result = await _service.AddProduct(productVm);
                if (result == null) 
                {
                    return BadRequest(new ApiResponse<object> { Success = false, Message = "Unable to Add Product" });
                }
                return Ok(new ApiResponse<object> { Success = true, Data=result,Message = "Successfully added product to the database"});

            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object> { Success = false, Message = "Server error. Try again later" });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromForm] ProductVM productVM)
        {
            try
            {
                var result = await _service.UpdateProduct(productVM);
                if (result == null)
                {
                    return BadRequest(new ApiResponse<object> { Success = false, Message = "Unable to Update Product" });
                }

                return Ok(new ApiResponse<object> { Success = true, Data = result, Message = "Successfully Update Product" });

            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object> { Success = false, Message = "Server error. Try again later" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _service.DeleteProduct(id);
                if (!result)
                {
                    return BadRequest(new ApiResponse<object> { Success = false, Message = "Unable to Delete Product" });
                }
                return Ok(new ApiResponse<object> { Success = true, Data = result, Message = "Successfully Deleted" });

            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object> { Success = false, Message = ex.Message });
            }
        }
    }
}
