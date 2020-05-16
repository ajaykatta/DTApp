using System.ComponentModel.DataAnnotations;

namespace DTApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password between 4 to 8 characrers")]
        public string Password { get; set; }
    }
}