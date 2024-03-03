# Container

### Crear un contenedor a partir de una imagen

```
docker run --name <nombre contenedor> <imagen a descargar>:<version de imagen>
```

### Ejemplo

```
docker run --name prueba-node node:18.19.1-alpine
```

### Eliminar contenedor

```
docker rm -f <nombre de la imagen>
```
