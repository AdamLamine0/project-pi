# Kubernetes manifests

Minimal deployment for:

- mysql
- eureka-server
- user-pi
- api-gateway
- frontend

Apply in order:

```bash
kubectl apply -f mysql-pvc.yaml
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-service.yaml
kubectl apply -f eureka-deployment.yaml
kubectl apply -f eureka-service.yaml
kubectl apply -f user-pi-deployment.yaml
kubectl apply -f user-pi-service.yaml
kubectl apply -f api-gateway-deployment.yaml
kubectl apply -f api-gateway-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
```

Frontend is exposed on NodePort `30080`.
