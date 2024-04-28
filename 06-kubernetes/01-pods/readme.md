# PODS

### Listar pods

```
kubectl get pod
```

### Enlazar con un pod

```
kubectl port-forward <nombre del pod> <puerto host>:<puerto contenedor>
```

### Obtener información del pod

```
kubectl get pod <nombre del pod> -o <yaml | json>
kubectl describe pod <nombre del pod>
```

### Para ejecutar un manifiesto

```
kubectl apply -f <nombre del archivo>
```

### Para eliminar desde un manifiesto

```
kubectl delete -f <nombre del archivo>
```
