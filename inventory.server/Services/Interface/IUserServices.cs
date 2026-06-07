using inventory.server.ViewModels;

namespace inventory.server.Services.Interface
{
    public interface IUserServices
    {
        Task<List<UserVM>> GetAllUsers();
        Task<UserVM?> GetUserById(int Id);

        Task<UserVM> AddUser(UserVM userVM);
        Task<UserVM> EditUser(UserVM userVM);
        Task<bool> DeleteUser(int Id);

    }
}
