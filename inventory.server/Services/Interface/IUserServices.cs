using inventory.server.ViewModels;

namespace inventory.server.Services.Interface
{
    public interface IUserServices
    {
        List<UserVM> GetAllUsers();
        UserVM GetUserById(int Id);
    }
}
