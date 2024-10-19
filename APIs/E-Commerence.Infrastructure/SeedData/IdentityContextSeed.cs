using E_Commerence.Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace E_Commerence.Infrastructure.SeedData
{
    public class IdentityContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address
                    {
                        FirstName = "Bob",
                        LastName = "Bobbity",
                        Street = "10Street",
                        City = "New York",
                        Zipcode = "90210"
                    }
                };

                await userManager.CreateAsync(user, "Bob@1234");
            }
        }
    }
}
