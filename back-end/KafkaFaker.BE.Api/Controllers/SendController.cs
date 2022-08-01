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

    [HttpPost]
    public async Task<ActionResult<MessageRequest>> PostMessageToKafkaAsync(MessageRequest request)
    {
        try
        {
            await _producer.ProduceAsync(
                request.Topic,
                request.Message,
                request.Key);

            return request;
        }
        catch (System.Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
