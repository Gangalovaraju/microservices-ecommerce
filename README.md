# 🛒 MicroCommerce — Microservices E-Commerce Platform

<div align="center">

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**A production-grade, cloud-ready microservices e-commerce platform**

*Built by [Ganga Lova Raju](https://www.linkedin.com/in/gangalovaraju/) — Java Full Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-Gangalovaraju-181717?style=flat-square&logo=github)](https://github.com/Gangalovaraju/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-gangalovaraju-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/gangalovaraju/)

</div>

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        React.js SPA (Port 3000)                  │
│              Redux Toolkit · React Router · Axios                │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP
┌──────────────────────────▼──────────────────────────────────────┐
│                    API Gateway (Port 8080)                        │
│         Spring Cloud Gateway · Rate Limiting · CORS              │
└────┬──────────────┬──────────────┬──────────────┬───────────────┘
     │              │              │              │
┌────▼────┐   ┌─────▼────┐  ┌─────▼─────┐  ┌────▼──────────┐
│  Order  │   │ Inventory │  │  Payment  │  │ Notification  │
│Service  │   │  Service  │  │  Service  │  │   Service     │
│:8081    │   │  :8082    │  │  :8083    │  │   :8084       │
└────┬────┘   └─────┬────┘  └─────┬─────┘  └───────────────┘
     │              │              │
┌────▼────┐   ┌─────▼────┐  ┌─────▼─────┐
│orders_db│   │inventory │  │payments_db│
│(Postgres│   │   _db    │  │(Postgres) │
└─────────┘   └──────────┘  └───────────┘
```

## 🚀 Microservices

| Service | Port | Database | Responsibility |
|---------|------|----------|----------------|
| **API Gateway** | 8080 | — | Routing, CORS, rate limiting |
| **Order Service** | 8081 | orders_db | Order lifecycle management |
| **Inventory Service** | 8082 | inventory_db | Product catalog & stock |
| **Payment Service** | 8083 | payments_db | Payment processing |
| **Notification Service** | 8084 | — | Email/event notifications |
| **React Frontend** | 3000 | — | Customer-facing SPA |

## ✨ Key Features

- **Microservices Architecture** — Independent deployment, scaling per service
- **Multi-Database Design** — Each service owns its data (orders_db, inventory_db, payments_db)
- **Transactional Ordering** — Inventory check → Order creation → Payment → Notification
- **React Redux Frontend** — SPA with persistent cart, order history, real-time status
- **PostgreSQL** — Optimized indexes, normalized schemas, efficient queries
- **Docker Compose** — One-command full-stack startup
- **CI/CD Pipeline** — GitHub Actions for build, test, and lint
- **CORS + API Gateway** — Centralized routing with header management
- **Structured Logging** — SLF4J with contextual MDC fields
- **Global Exception Handling** — Consistent API error responses

## 🛠️ Tech Stack

### Backend
- **Java 17** + **Spring Boot 3.2**
- Spring Web (REST APIs), Spring Data JPA, Spring Cloud Gateway
- Hibernate ORM, Lombok, WebClient (reactive inter-service calls)
- PostgreSQL 15, pgAdmin

### Frontend
- **React 18** with Hooks
- **Redux Toolkit** for global state
- **React Router v6** for navigation
- **Axios** for HTTP
- Modern CSS with CSS Variables

### DevOps
- **Docker** + **Docker Compose**
- **GitHub Actions** CI/CD
- Individual `.gitignore` per service

---

## 🏁 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15 (or use Docker)

### 1. Clone & Run with Docker Compose (Recommended)

```bash
git clone https://github.com/Gangalovaraju/microservices-ecommerce.git
cd microservices-ecommerce
docker-compose up --build
```

Frontend → http://localhost:3000  
API Gateway → http://localhost:8080

### 2. Run Locally (Manual)

**Start PostgreSQL**, then run each service:

```bash
# Terminal 1 - Inventory Service
cd inventory-service && mvn spring-boot:run

# Terminal 2 - Payment Service
cd payment-service && mvn spring-boot:run

# Terminal 3 - Notification Service
cd notification-service && mvn spring-boot:run

# Terminal 4 - Order Service (depends on others)
cd order-service && mvn spring-boot:run

# Terminal 5 - API Gateway
cd api-gateway && mvn spring-boot:run

# Terminal 6 - Frontend
cd frontend && npm install && npm start
```

---

## 📡 API Reference

### Order Service — `POST /api/orders`
```json
{
  "customerEmail": "user@example.com",
  "paymentMethod": "CARD",
  "items": [
    { "skuCode": "LAPTOP-001", "productName": "MacBook Pro", "quantity": 1, "price": 1299.99 }
  ]
}
```

### Inventory Service — `GET /api/inventory`
Returns all products with current stock levels.

### Payment Service — `POST /api/payments/process`
```json
{ "orderNumber": "ORD-ABC12345", "amount": 1299.99, "paymentMethod": "CARD" }
```

---

## 🗄️ Database Schema

See [`database/`](./database/) for:
- `init/01_create_databases.sql` — Database creation
- `init/02_inventory_schema.sql` — Products & inventory table
- `init/03_orders_schema.sql` — Orders & order items table
- `init/04_payments_schema.sql` — Payments table with indexes

---

## 👨‍💻 Author

<div align="center">

**Ganga Lova Raju Yerikireddy**  
Java Full Stack Developer · 2.5+ Years Experience  
Spring Boot · React.js · Microservices · PostgreSQL

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gangalovaraju/)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Gangalovaraju/)
[![Email](https://img.shields.io/badge/-Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gangalovaraju2002@gmail.com)

*Open to Full Stack / Backend Java roles. Let's connect!*

</div>

