using KafkaFaker.BE;
using KafkaFaker.BE.Migrations;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<Producer>(_ => new Producer(builder.Configuration.GetValue<string>("BootstrapServers")));
var schemaDatabaseConnectionString = builder.Configuration.GetConnectionString("SchemaDatabase");
builder.Services.AddTransient<MySqlConnection>(_ => new MySqlConnection(schemaDatabaseConnectionString));
builder.Services.AddTransient<SchemaDatabase>();

Migrator.MigrateUp(schemaDatabaseConnectionString);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.MapControllers();

app.Run();
