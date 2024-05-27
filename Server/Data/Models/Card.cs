using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Server.Data.Models
{
    [Table("cards")]
    public class Card
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public string? Priority { get; set; }
        public string? ListId { get; set; }
        [ForeignKey("ListId")]
        public CardsList? CardsList { get; set; }
    }
}
