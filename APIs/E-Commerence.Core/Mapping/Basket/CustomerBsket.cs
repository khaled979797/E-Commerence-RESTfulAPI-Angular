using AutoMapper;
using E_Commerence.Core.Dtos;

namespace E_Commerence.Core.Mapping.Basket
{
    public class CustomerBsket : Profile
    {
        public CustomerBsket()
        {
            CreateMap<CustomerBsket, CustomerBasketDto>();
        }
    }
}
