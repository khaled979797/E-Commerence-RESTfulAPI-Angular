using E_Commerence.Core.Entities;
using E_Commerence.Core.Entities.OrderAggregate;
using E_Commerence.Infrastructure.Context;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace E_Commerence.Infrastructure.SeedData
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(AppDbContext context, ILoggerFactory loggerFactory)
        {
            var path = Directory.GetCurrentDirectory();

            try
            {
                if (!context.ProductBrands.Any())
                {
                    var brandsData = File.ReadAllText(@"D:\Programming\Projects\E-Commerence-RESTfulAPI-Angular\APIs\E-Commerence.Infrastructure\SeedData\brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                    foreach (var item in brands)
                    {
                        await context.ProductBrands.AddAsync(item);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.ProductTypes.Any())
                {
                    var typesData = File.ReadAllText(@"D:\Programming\Projects\E-Commerence-RESTfulAPI-Angular\APIs\E-Commerence.Infrastructure\SeedData\types.json");
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                    foreach (var item in types)
                    {
                        context.ProductTypes.Add(item);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var productsData = File.ReadAllText(@"D:\Programming\Projects\E-Commerence-RESTfulAPI-Angular\APIs\E-Commerence.Infrastructure\SeedData\products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                    foreach (var item in products)
                    {
                        context.Products.Add(item);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.DeliveryMethods.Any())
                {
                    var deliveryMethodsData = File.ReadAllText(@"D:\Programming\Projects\E-Commerence-RESTfulAPI-Angular\APIs\E-Commerence.Infrastructure\SeedData\delivery.json");
                    var deliveryMethods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryMethodsData);
                    foreach (var item in deliveryMethods)
                    {
                        context.DeliveryMethods.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<AppDbContext>();
                logger.LogError(ex.Message);
            }
        }
    }
}
