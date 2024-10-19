using AutoMapper;
using E_Commerence.Core.Dtos;
using E_Commerence.Core.Entities.Identity;

namespace E_Commerence.Core.Mapping.User
{
    public class UserMapping : Profile
    {
        public UserMapping()
        {
            CreateMap<Address, AddressDto>().ReverseMap();
        }
    }
}
