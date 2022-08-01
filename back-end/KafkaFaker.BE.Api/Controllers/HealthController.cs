using Microsoft.AspNetCore.Mvc;

namespace KafkaFaker.BE.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class HealthController : ControllerBase
{
    private readonly ILogger<HealthController> _logger;

    public HealthController(ILogger<HealthController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetBackEndHealth()
    {
        return Ok();
    }
}
