# Rabbitmq

### Crear un contenedor

```
docker run -d --name server-rabbitmq -p 15672:15672 -p 5672:5672 rabbitmq:management-alpine
```

### UI

```
http://localhost:15672
```

_username: guest, password: guest_
