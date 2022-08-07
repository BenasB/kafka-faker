using Confluent.Kafka;
using KafkaFaker.BE.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace KafkaFaker.BE.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class SendController : ControllerBase
{
    private readonly ILogger<SendController> _logger;
    private readonly Producer _producer;

    public SendController(ILogger<SendController> logger, Producer producer)
    {
        _logger = logger;
        _producer = producer;
    }

    [HttpPost("Message")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> PostMessage(MessageRequest request)
    {
        try
        {
            await _producer.ProduceAsync(
                request.Topic,
                request.Message);

            return Ok();
        }
        catch (System.Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost("KeyMessage")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> PostKeyMessage(KeyMessageRequest request)
    {
        try
        {
            await _producer.ProduceAsync(
                request.Topic,
                request.Message,
                request.Key);

            return Ok();
        }
        catch (System.Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
