using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;

namespace KafkaFaker.BE.Migrations;

public static class Migrator
{
  public static void MigrateUp(string connectionString)
  {
    var runnerProvider = new ServiceCollection()
      .AddFluentMigratorCore()
      .ConfigureRunner(rb => rb
          .AddMySql5()
          .WithGlobalConnectionString(connectionString)
          .ScanIn(typeof(InitializeTable).Assembly).For.Migrations())
      .AddLogging(lb => lb.AddFluentMigratorConsole())
      .BuildServiceProvider(false);

    using (var scope = runnerProvider.CreateScope())
    {
      var runner = scope.ServiceProvider.GetRequiredService<IMigrationRunner>();
      runner.MigrateUp();
    }
  }
}