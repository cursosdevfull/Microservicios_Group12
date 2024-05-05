# Despliegue en AWS

### Herramientas a instalar

- Chocolatey (Windows)
- Brew (MAC)
- aws-cli (https://awscli.amazonaws.com/AWSCLIV2.msi)
- helm (choco install kubernetes-helm -y)
- eksctl (choco install eksctl -y)

### Configurar un usuario para que acceda a AWS

```
aws configure
```

### Crear Cluster EKS

```
eksctl create cluster --name cluster0405 --without-nodegroup --region us-east-1 --zones us-east-1a,us-east-1b,us-east-1c
```

### Crear y agregar nodos

```
eksctl create nodegroup --name cluster0405-nodegroup --cluster cluster0405 --node-type t3.large --nodes 1 --nodes-min 1 --nodes-max 3 --asg-access
```

### Crear IAM Provider

```
eksctl utils associate-iam-oidc-provider --cluster cluster0405 --approve
```

### Para descargar la política

```
curl -o iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.1.2/docs/install/iam_policy.json
```

### Crear la política

```
aws iam create-policy --policy-name AWSLoadBalancer0405 --policy-document file://iam_policy.json
```

### Crear cuenta Service Account para el cluster

```
eksctl create iamserviceaccount --cluster cluster0405 --namespace=kube-system --name=aws-lb-ms0405 --attach-policy-arn=arn:aws:iam::282865065290:policy/AWSLoadBalancer0405 --override-existing-serviceaccounts --approve
```

### Verificar si existe el ingress controller

```
kubectl get deploy -n kube-system alb-ingress-controller
```

### Instalar el target group binding

```
kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller/crds?ref=master"
```

### Actualizar los repositorios de Helm

```
helm repo update
```

### Instalar el ingress controller

```
helm upgrade -i aws-load-balancer-controller eks/aws-load-balancer-controller --set clusterName=cluster0405 --set serviceAccount.name=aws-lb-ms0405 --set serviceAccount.create=false -n kube-system
```

### Verificar el ingress controller

```
kubectl get deploy -n kube-system aws-load-balancer-controller
```

### Crear repositorios privados en ECR para cada ms

### Autorización para vincular el repositorio local de imágenes con el repositorio privado de AWS

```
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 282865065290.dkr.ecr.us-east-1.amazonaws.com
```
