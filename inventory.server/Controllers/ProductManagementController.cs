using Microsoft.AspNetCore.Mvc;

namespace inventory.server.Controllers
{
    public class ProductManagementController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
