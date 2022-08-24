# Back end

This project is responsible for the back end part of the application. It's a [.NET](https://dotnet.microsoft.com/en-us/) web API.

### This project is responsible for

- Acting as a proxy for producing messages to an Apache Kafka cluster
- Storing and retrieving message data schemas

### Dependencies

- Apache Kafka cluster
- MySQL database (initialized by [FluentMigrator](https://fluentmigrator.github.io/) on startup)
- Front end (for CORS)

### Local development

Take a look at [infra/dev-stack.yml](../infra/dev-stack.yml). Start up this stack to get everything you need for local development.

Use `dotnet run --project KafkaFaker.BE.Api` to start the project locally. You can access swagger at [`http://localhost:5000/swagger`](http://localhost:5000/swagger).

### Configuration

- Environment variables
  - `BootstrapServers` sets the Apache Kafka bootstrap servers used by the kafka client. Specify your brokers here.
  - `ConnectionStrings__SchemaDatabase` sets the connection string for the schema database
  - Any other [ASP.NET Core environment variables](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/web-host?view=aspnetcore-6.0#host-configuration-values)
