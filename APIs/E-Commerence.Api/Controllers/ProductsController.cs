using AutoMapper;
using E_Commerence.Core.Dtos;
using E_Commerence.Core.Entities;
using E_Commerence.Core.Helpers;
using E_Commerence.Core.Specifications.ProductSpecifications;
using E_Commerence.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerence.Api.Controllers
{
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> productRepository;
        private readonly IGenericRepository<ProductType> productTypeRepository;
        private readonly IGenericRepository<ProductBrand> productBrandRepository;
        private readonly IMapper mapper;

        public ProductsController(IGenericRepository<Product> productRepository,
            IGenericRepository<ProductType> productTypeRepository,
            IGenericRepository<ProductBrand> productBrandRepository, IMapper mapper)
        {
            this.productRepository = productRepository;
            this.productTypeRepository = productTypeRepository;
            this.productBrandRepository = productBrandRepository;
            this.mapper = mapper;
        }
        //[Cached(600)]
        [HttpGet(Router.ProductRouting.List)]
        public async Task<ActionResult<IReadOnlyList<ProductDto>>> GetProducts([FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductsWithFiltersForCountSpecification(productParams);

            var totalItems = await productRepository.CountAsync(countSpec);
            var products = await productRepository.GetAllWithSpec(spec);

            var data = mapper.Map<IReadOnlyList<ProductDto>>(products);

            return Ok(new Pagination<ProductDto>(productParams.PageIndex,
                productParams.PageSize, totalItems, data));
        }

        //[Cached(600)]
        [HttpGet(Router.ProductRouting.GetById)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await productRepository.GetByIdWithSpec(spec);
            if (product == null) return NotFound(new ApiResponse(404));
            var productDto = mapper.Map<ProductDto>(product);
            return Ok(productDto);
        }

        //[Cached(600)]
        [HttpGet(Router.ProductRouting.Brands)]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
        {
            return Ok(await productBrandRepository.GetAllAsync());
        }

        //[Cached(600)]
        [HttpGet(Router.ProductRouting.Types)]
        public async Task<ActionResult<List<ProductType>>> GetProductTypes()
        {
            return Ok(await productTypeRepository.GetAllAsync());
        }
    }
}
