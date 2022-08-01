using System.ComponentModel.DataAnnotations;

namespace KafkaFaker.BE.Api.Models;

public class MessageRequest
{
    [Required]
    public string Topic { get; set; }
    [Required]
    public string Message { get; set; }
    public string? Key { get; set; }
}