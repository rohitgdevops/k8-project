## 🚀 CI/CD Strategy

### 📦 Docker + Helm + GitHub Actions

This project uses GitHub Actions for CI/CD. Each service (frontend/backend) has its own pipeline.

### 🔄 Pipelines
- **backend-ci-cd.yml**
- **frontend-ci-cd.yml**

Steps:
1. Code pushed/merged to `main`
2. Build Docker image
3. Push to Docker Hub
4. Deploy to Minikube via Helm

### 🔧 Branching Strategy

- `main`: Production, triggers deploy
- `dev`: Development
- `feature/*`: Short-lived feature branches

### 🔐 Secrets Required

Add the following to GitHub repo settings → Secrets:
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `KUBE_CONFIG_DATA`

## 🔁 CI/CD Overview

### 📁 Folder Structure
- app/backend → Node.js backend app
- app/frontend → HTML frontend
- helm-charts → Helm charts for backend & frontend

### ⚙️ CI (GitHub Actions)
- `backend.yaml`: Builds and pushes Docker image for backend
- `frontend.yaml`: Same for frontend

### 🚀 CD (GitHub Actions)
- Uses Helm to deploy images to Kubernetes cluster

### 🗂️ Branching Strategy
- `main` → Stable, triggers CI/CD
- `dev` → Development work, PRs merged here
