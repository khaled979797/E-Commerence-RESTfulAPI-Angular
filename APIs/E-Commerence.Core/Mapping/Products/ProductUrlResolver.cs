using AutoMapper;
using E_Commerence.Core.Dtos;
using E_Commerence.Core.Entities;
using Microsoft.Extensions.Configuration;

namespace E_Commerence.Core.Mapping.Products
{
    public class ProductUrlResolver : IValueResolver<Product, ProductDto, string>
    {
        private readonly IConfiguration config;

        public ProductUrlResolver(IConfiguration config)
        {
            this.config = config;
        }
        public string Resolve(Product source, ProductDto destination, string destMember, ResolutionContext context)
        {
            return !string.IsNullOrEmpty(source.PictureUrl) ? config["ApiUrl"] + source.PictureUrl : "";
        }
    }
}