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

kubectl top pod - check metrics service is available or not
kubectl patch deployment metrics-server -n kube-system \
  --type='json' -p='[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--kubelet-insecure-tls"}]'



```
Q DIfference between CMD and Entrypoint
Q Why Deployment and not Pod?
  Because Deployment handles self-healing, upgrades, scaling, and gives us rollback   unlike a plain Pod.
 Q Can two services use same targetPort but different ports?


```
 Step-by-step Architecture:
1. Each Kubelet on every node continuously monitors the pods running on that node:
It collects CPU and memory usage via cAdvisor (built-in into Kubelet)

2. Metrics Server talks to each kubelet and pulls metrics for all running pods:
Pulls data like:

Pod name

Namespace

Container name

CPU usage (millicores)

Memory usage

3. HPA Controller queries the metrics-server API regularly (every ~15s)
HPA asks:
“For my target deployment backend-deployment, tell me the average CPU usage of all replicas.”

4. Based on this data, HPA calculates whether to scale or not.
⚙️ Components in Play:
Component	Role
Pod (cAdvisor)	Sends metrics to kubelet
Kubelet	Serves metrics via https://<node>:10250/stats/summary
Metrics Server	Aggregates metrics from all kubelets
HPA Controller	Queries metrics-server via API: /apis/metrics.k8s.io/v1beta1


