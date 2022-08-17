using FluentMigrator;

namespace KafkaFaker.BE.Migrations;

[Migration(0)]
public class InitializeTable : Migration
{
  public override void Up()
  {
    Create.Table("Schemas")
        .WithColumn("Title").AsString().PrimaryKey()
        .WithColumn("JsonString").AsString(int.MaxValue);
  }

  public override void Down()
  {
    Delete.Table("Schemas");
  }
}