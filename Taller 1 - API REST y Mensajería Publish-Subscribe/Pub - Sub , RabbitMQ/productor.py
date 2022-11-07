import pika
from pika.exchange_type import ExchangeType

parametrosDeConexion= pika.ConnectionParameters('localhost')

conexion = pika.BlockingConnection(parameters= parametrosDeConexion, _impl_class=None)

canal = conexion.channel()

canal.exchange_declare(exchange='pubsub', exchange_type=ExchangeType.fanout)

mensaje = "Hola a todos, quiero reenviar este mensaje"

canal.basic_publish(exchange='pubsub', routing_key='', body= mensaje)

print(f"Enviar mensaje: {mensaje}")

conexion.close()