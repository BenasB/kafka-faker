using KafkaFaker.BE;
using KafkaFaker.BE.Migrations;
using MySqlConnector;
using FluentMigrator.Runner;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

builder.Services.AddSingleton<Producer>();
var schemaDatabaseConnectionString = builder.Configuration["ConnectionStrings:SchemaDatabase"];
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

app.UseHttpsRedirection();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins(builder.Configuration["FrontEndUrl"]));

app.UseAuthorization();

app.MapControllers();

app.Run();
