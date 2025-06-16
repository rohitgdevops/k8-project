# k8-project
Code hai ✅
YAMLs hai ✅
Version upgrades hai ✅
Troubleshooting hai ✅
Interview-style why-how questions ka practice bhi ✅

```
k8s-project/
├── app/
│   ├── backend/
│   │   └── index.js
│   └── frontend/
│       └── index.html
├── k8s/
│   ├── backend/
│   └── frontend/
├── .github/workflows/
│   └── ci-cd.yaml (later)
└── README.md

``` Commands
kubectl port-forward svc/backend-service 8080:80 (http://localhost:8080/api/books
)
docker tag backend:v2 rohitk09/backend:v2
docker push rohitk09/backend:v2


```
Q DIfference between CMD and Entrypoint
Q Why Deployment and not Pod?
  Because Deployment handles self-healing, upgrades, scaling, and gives us rollback   unlike a plain Pod.
 Q Can two services use same targetPort but different ports?

