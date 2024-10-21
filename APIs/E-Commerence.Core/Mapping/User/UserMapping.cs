using AutoMapper;
using E_Commerence.Core.Dtos;
using E_Commerence.Core.Entities.OrderAggregate;

namespace E_Commerence.Core.Mapping.User
{
    public class UserMapping : Profile
    {
        public UserMapping()
        {
            CreateMap<Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<AddressDto, Address>();
        }
    }
}
