using Confluent.Kafka;

namespace KafkaFaker.BE;

public class Producer
{
    private readonly IProducer<string, string> _producer;

    public Producer()
    {
        var config = new ProducerConfig
        {
            BootstrapServers = "localhost:9092",
            MessageSendMaxRetries = 8,
        };
        _producer = new ProducerBuilder<string, string>(config).Build();
    }

    public async Task<DeliveryResult<string, string>> ProduceAsync(string topic, string message, string? key = null)
    {
        return await _producer.ProduceAsync(topic, new Message<string, string>
        {
            Key = key,
            Value = message,
        });
    }
}
