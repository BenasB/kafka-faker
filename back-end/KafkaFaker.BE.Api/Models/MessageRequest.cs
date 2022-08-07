using System.ComponentModel.DataAnnotations;

namespace KafkaFaker.BE.Api.Models;

public class MessageRequest
{
    [Required]
    public string Topic { get; set; } = null!;
    [Required]
    public string Message { get; set; } = null!;
}