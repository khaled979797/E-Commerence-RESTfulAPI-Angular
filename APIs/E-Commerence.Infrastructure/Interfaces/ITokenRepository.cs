using E_Commerence.Core.Entities.Identity;

namespace E_Commerence.Infrastructure.Interfaces
{
    public interface ITokenRepository
    {
        string CreateToken(AppUser user);
    }
}
