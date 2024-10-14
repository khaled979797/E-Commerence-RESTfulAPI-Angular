using E_Commerence.Core.Entities;

namespace E_Commerence.Infrastructure.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetProductById(int id);
        Task<IReadOnlyList<Product>> GetProductsAsync();
        Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
        Task<IReadOnlyList<ProductType>> GetProductTypesAsync();
    }
}
