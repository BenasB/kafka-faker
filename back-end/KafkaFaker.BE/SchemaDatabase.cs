using Dapper;
using KafkaFaker.BE.Models;
using MySqlConnector;
using System.Linq;

public class SchemaDatabase
{
  private readonly MySqlConnection _connection;

  public SchemaDatabase(MySqlConnection connection)
  {
    _connection = connection;
  }

  public Task<IEnumerable<Schema>> GetSchemasAsync() => _connection.QueryAsync<Schema>("SELECT * FROM `Schemas`");

  public async Task<Schema?> GetSchemaAsync(string title)
  {
    var schemas = await _connection.QueryAsync<Schema>("SELECT * FROM `Schemas` WHERE Title = @Title", new { Title = title });
    return schemas.FirstOrDefault();
  }

  public Task UpsertSchemaAsync(Schema schema) => _connection.ExecuteAsync(
    @"INSERT INTO `Schemas`(Title, JsonString) VALUES (@Title, @JsonString) ON DUPLICATE KEY UPDATE JsonString=@JsonString",
    schema);
}