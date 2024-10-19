using E_Commerence.Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace E_Commerence.Core.Helpers
{
    public static class UserManagerExtension
    {
        public static async Task<AppUser> FindUserByClaimsPrincipalWithAddressAsync(this UserManager<AppUser> userManager,
            ClaimsPrincipal user)
        {
            var email = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            return await userManager.Users.Include(x => x.Address).FirstOrDefaultAsync(x => x.Email == email);
        }

        public static async Task<AppUser> FindUserByClaimsPrincipalAsync(this UserManager<AppUser> userManager,
            ClaimsPrincipal user)
        {
            var email = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            return await userManager.Users.FirstOrDefaultAsync(x => x.Email == email);
        }
    }
}
