using inventory.server.ViewModels;

namespace inventory.server.Services.Interface
{
    public interface IAuthService
    {
        Task<string> Login(ApplicationUserVM userVM);
    }
}
