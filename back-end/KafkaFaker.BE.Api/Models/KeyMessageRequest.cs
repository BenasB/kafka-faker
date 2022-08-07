using System.ComponentModel.DataAnnotations;

namespace KafkaFaker.BE.Api.Models;

public class KeyMessageRequest : MessageRequest
{
    [Required]
    public string Key { get; set; } = null!;
}