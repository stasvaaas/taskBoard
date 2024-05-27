using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Data.Models
{
    [Table("lists")]
    public class CardsList
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public List<Card>? Cards { get; set; }
    }
}
