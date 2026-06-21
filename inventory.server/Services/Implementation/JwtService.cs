using DAL.Models;
using inventory.server.Services.Interface;
using inventory.server.ViewModels;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace inventory.server.Services.Implementation
{
    public class JwtService : IJwtService
    {
        private readonly string _key;
        public JwtService(IConfiguration config)
        {
            _key = config["Jwt:Key"];
        }
        public Task<string> GenerateToken(ApplicationUser user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_key));

            var credentials = new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: credentials
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return Task.FromResult(jwt);
        }
    }
}
