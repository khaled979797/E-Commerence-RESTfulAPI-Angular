using AutoMapper;
using E_Commerence.Core.Dtos;
using E_Commerence.Core.Entities;

namespace E_Commerence.Core.Mapping.Basket
{
    public class CustomerBsketMapping : Profile
    {
        public CustomerBsketMapping()
        {
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
        }
    }
}
