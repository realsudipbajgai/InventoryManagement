using DAL.Models;
using inventory.server.Configurations;
using inventory.server.Services.Interface;
using inventory.server.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace inventory.server.Services.Implementation
{
    public class JwtServicewithClaims : IJwtService
    {
        private readonly JwtSettings _jwt;
        private readonly UserManager<ApplicationUser> _userManager;

        public JwtServicewithClaims(IOptions<JwtSettings> jwt, UserManager<ApplicationUser> userManager)
        {
            _jwt = jwt.Value;
            _userManager = userManager;
        }

        public async Task<string> GenerateToken(ApplicationUser user)
        {
            // 1. Get roles from Identity system
            var roles = await _userManager.GetRolesAsync(user);

            // 2. Basic claims
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.Name, user.UserName)
    };

            // 3. Add roles dynamically
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            // 4. Create key
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_jwt.Key));

            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256);

            // 5. Create token
            var token = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(_jwt.DurationInMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
