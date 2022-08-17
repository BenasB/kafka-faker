using System.ComponentModel.DataAnnotations;

namespace KafkaFaker.BE.Models;

public class Schema
{
  [Required]
  public string Title { get; set; } = null!;
  [Required]
  public string JsonString { get; set; } = null!;
}