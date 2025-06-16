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


```
How does HPA work internally?

How does metrics-server collect pod metrics?

Why HPA failed if CPU request not set?

Difference between request & limit in CPU

Can HPA work with memory or custom metrics?

What if metrics-server is not reachable?

How HPA reacts during pod crash or rollout?

``` Interview Questions From This:
How does service discovery work in Kubernetes?

What is the role of CoreDNS?

What happens if CoreDNS is down?

What does kube-proxy do?

How does DNS work across namespaces?

What is the difference between ClusterIP and DNS name?

How to debug inter-service communication issues?


### Service flow
```Imagine frontend pod doing:

fetch('http://backend-service:80/api/books')
DNS resolves backend-service into a ClusterIP


Frontend Pod ──> wants to talk to ──> backend-service
                |
                └──> DNS Lookup ───> 10.96.X.Y (ClusterIP of backend-service)
                                          |
                            kube-proxy routes this to backend pod IP

CoreDNS ->	Resolves service names like backend-service.default.svc.cluster.local to ClusterIP

kube-proxy -> Maintains iptables rules to route ClusterIP to actual Pod IP

1 frontend nai backend service call ki (http://backend-service.default.svc.cluster.local:80/api/books
) -> coredns handle karega and convert it into clusterIP

2 CoreDNS resolves it to ClusterIP means wo clusterIP dega -> coredns

frontend pod kai andar se
$# nslookup backend-service.default.svc.cluster.local
Name:   backend-service.default.svc.cluster.local
Address: 10.96.92.147



3 pod tries to connect to clusterip -> kube-proxy

Ab IP mil gaya, connection try karta hai.
Par... ye IP kisi Pod ka nahi hai — ye ek Service IP hai jo Cluster mein internal hoti hai.

4 kube-proxy forwards traffic to backend pod -> iptables
kube-proxy ka role aata hai
kube-proxy	Service IP (ClusterIP) ko actual backend pod IP pe forward karta hai using iptables
frontend → 10.96.12.34:80  (ClusterIP)
→ kube-proxy dekhta hai backend-service ke peeche 2 pod hai
→ randomly ek pod ka IP select karta hai, jaise 10.244.1.23:3000
→ traffic wahan bhej deta hai

5 Backend pod handles it	

Overall Responsibility:
Task	Handled By
backend-service DNS resolve → IP	CoreDNS
ClusterIP → actual pod IP route	kube-proxy
HTTP Response handle	Backend Pod (App)


