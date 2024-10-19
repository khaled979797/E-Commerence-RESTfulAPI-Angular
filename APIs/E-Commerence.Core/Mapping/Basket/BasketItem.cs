using AutoMapper;
using E_Commerence.Core.Dtos;

namespace E_Commerence.Core.Mapping.Basket
{
    public class BasketItem : Profile
    {
        public BasketItem()
        {
            CreateMap<BasketItem, BasketItemDto>();
        }
    }
}
