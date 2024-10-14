using E_Commerence.Core.Entities;
using E_Commerence.Infrastructure.Context;
using E_Commerence.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace E_Commerence.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext context;

        public ProductRepository(AppDbContext context)
        {
            this.context = context;
        }

        public async Task<Product> GetProductById(int id)
        {
            return await context.Products
                .Include(x => x.ProductType)
                .Include(x => x.ProductBrand)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await context.Products
                .Include(x => x.ProductType)
                .Include(x => x.ProductBrand)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
            return await context.ProductBrands.ToListAsync();

        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await context.ProductTypes.ToListAsync();
        }
    }
}
