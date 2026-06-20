using inventory.server.ViewModels;

namespace inventory.server.Services.Interface
{
    public interface IEmployeeServices
    {
        Task<List<EmployeeVM>> GetAllEmployees();
        Task<EmployeeVM?> GetEmployeeById(int Id);

        Task<EmployeeVM> AddEmployee(EmployeeVM userVM);
        Task<EmployeeVM> EditEmployee(EmployeeVM userVM);
        Task<bool> DeleteEmployee(int Id);
        Task<bool> SeedTestData();

    }
}
