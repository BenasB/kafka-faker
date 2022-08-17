using System.ComponentModel.DataAnnotations;

namespace KafkaFaker.BE.Models;

public class KeyMessageRequest : MessageRequest
{
  [Required]
  public string Key { get; set; } = null!;
}