using inventory.server.Services.Interface;
using inventory.server.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace inventory.server.Controllers
{
    [Route("api/inventory")]
    public class InventoryController : Controller
    {

        private readonly IInventoryServices _inventoryServices;

        public InventoryController(IInventoryServices inventoryServices)
        {
            _inventoryServices = inventoryServices;
        }

        [HttpPost("adjust")]
        public async Task<IActionResult> AdjustInventory([FromBody] InventoryAdjustmentVM model)
        {
            if (model == null)
            {
                return BadRequest("Invalid inventory adjustment data.");
            }

            var result = await _inventoryServices.AdjustInventory(model);
            if (result)
            {
                return Ok("Inventory adjusted successfully.");
            }
            else
            {
                return StatusCode(500, "Failed to adjust inventory.");
            }
        }
    }
}
