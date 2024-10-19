using System.ComponentModel.DataAnnotations;

namespace E_Commerence.Core.Dtos
{
    public class CustomerBasketDto
    {
        public CustomerBasketDto()
        {
            Items = new HashSet<BasketItemDto>();
        }
        [Required]
        public string Id { get; set; }
        public virtual ICollection<BasketItemDto> Items { get; set; }
    }
}
