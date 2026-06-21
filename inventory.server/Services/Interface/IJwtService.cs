using DAL.Models;
using inventory.server.ViewModels;

namespace inventory.server.Services.Interface
{
    public interface IJwtService
    {
        Task<string> GenerateToken(ApplicationUser user);
    }
}
