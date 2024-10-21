using System.Security.Claims;

namespace E_Commerence.Core.Helpers
{
    public static class ClaimsPrincipalExtension
    {
        public static string RetrieveEamilFromPrincipal(this ClaimsPrincipal user)
        {
            return user.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email).Value;
        }
    }
}
