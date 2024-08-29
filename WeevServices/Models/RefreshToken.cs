namespace WeevServices.Models
{
    public class RefreshToken
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Creadted { get; set; } = DateTime.Now;
        public DateTime Expires { get; set; }
    }
}
