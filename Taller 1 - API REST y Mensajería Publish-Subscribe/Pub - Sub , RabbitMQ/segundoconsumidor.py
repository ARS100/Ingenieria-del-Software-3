import pika
from pika.exchange_type import ExchangeType 

def on_mensaje_recibido(ch, method, properties, body):
  print(f"Segundo consumidor: Nuevo mensaje recibido: {body}")

parametrosDeConexion = pika.ConnectionParameters('localhost')

conexion = pika.BlockingConnection(parametrosDeConexion)

canal = conexion.channel()

canal.exchange_declare(exchange='pubsub', exchange_type= ExchangeType.fanout)

cola = canal.queue_declare(queue='', exclusive = True)           

canal.queue_bind(exchange='pubsub', queue =cola.method.queue)

canal.basic_consume(queue=cola.method.queue, auto_ack=True,
      on_message_callback=on_mensaje_recibido)

print("Empezando a consumir")

canal.start_consuming()