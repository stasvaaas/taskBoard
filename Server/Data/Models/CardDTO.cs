namespace Server.Data.Models
{
    public class CardDTO
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public string? Priority { get; set; }
        public string? ListId { get; set; }
    }
}
