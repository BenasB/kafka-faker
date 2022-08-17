using KafkaFaker.BE.Models;
using Microsoft.AspNetCore.Mvc;

namespace KafkaFaker.BE.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class SchemaController : ControllerBase
{
  private readonly ILogger<SchemaController> _logger;
  private readonly SchemaDatabase _schemaDatabase;

  public SchemaController(ILogger<SchemaController> logger, SchemaDatabase schemaDatabase)
  {
    _logger = logger;
    _schemaDatabase = schemaDatabase;
  }

  [HttpGet]
  [ProducesResponseType(typeof(IEnumerable<Schema>), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> GetAllSchemas()
  {
    var allSchemas = await _schemaDatabase.GetSchemasAsync();

    return Ok(allSchemas);
  }

  [HttpGet("{title}")]
  [ProducesResponseType(typeof(Schema), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> GetSchema(string title)
  {
    var schema = await _schemaDatabase.GetSchemaAsync(title);

    if (schema == null)
      return NotFound();

    return Ok(schema);
  }

  [HttpDelete("{title}")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> DeleteSchema(string title)
  {
    var rowsAffected = await _schemaDatabase.DeleteSchemaAsync(title);

    if (rowsAffected == 0)
      return NotFound();

    return Ok();
  }

  [HttpPost]
  [ProducesResponseType(typeof(Schema), StatusCodes.Status201Created)]
  [ProducesResponseType(typeof(Schema), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status500InternalServerError)]
  public async Task<IActionResult> Upsertchema(Schema schema)
  {
    var existingSchema = await _schemaDatabase.GetSchemaAsync(schema.Title);

    await _schemaDatabase.UpsertSchemaAsync(schema);

    if (existingSchema != null)
      return Ok(schema);

    return CreatedAtAction(nameof(GetAllSchemas), new { title = schema.Title }, schema);
  }
}
