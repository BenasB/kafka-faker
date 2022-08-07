using Confluent.Kafka;

namespace KafkaFaker.BE;

public class Producer
{
    private readonly IProducer<string, string> _keyProducer;
    private readonly IProducer<Null, string> _producer;

    public Producer()
    {
        var config = new ProducerConfig
        {
            BootstrapServers = "localhost:9092", // TODO: get from vars
            MessageSendMaxRetries = 1,
            MessageTimeoutMs = 5000,
        };
        _keyProducer = new ProducerBuilder<string, string>(config).Build();
        _producer = new ProducerBuilder<Null, string>(config).Build();
    }

    public Task<DeliveryResult<string, string>> ProduceAsync(string topic, string message, string key)
    {
        return _keyProducer.ProduceAsync(topic, new Message<string, string>
        {
            Key = key,
            Value = message,
        });
    }

    public Task<DeliveryResult<Null, string>> ProduceAsync(string topic, string message)
    {
        return _producer.ProduceAsync(topic, new Message<Null, string>
        {
            Value = message,
        });
    }
}
