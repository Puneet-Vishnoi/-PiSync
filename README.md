# PiSync Backend

PiSync is a lightweight backend service that handles sync events from offline-first devices like PiBook and PiBox. When devices regain internet access, they send sync logs which are processed, stored, and analyzed by this system.

## 🔧 Tech Stack

* **Node.js** with **Express.js**
* **MongoDB** for storage (supports sharding)
* **Redis** for caching
* **BullMQ (Redis-based)** for queuing
* **Prometheus + Grafana** for monitoring
* **Nginx** or **AWS ELB** for load balancing

---

## 🚀 Features

* `POST /sync-event`: Accepts sync events from devices
* `GET /device/:id/sync-history`: Returns sync history of a device
* `GET /devices/repeated-failures`: Returns devices with >3 sync failures
* Logs a warning if a device fails to sync 3 times in a row
* Cache latest sync in Redis
* Scalable via load balancing, DB sharding, and async queue

---

## 📦 Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/your-org/pisync-backend.git
cd pisync-backend
```

### 2. Environment Variables

Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/pisync
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
npm start
```

---

## 📊 Monitoring (Optional)

### Prometheus Endpoint

* Visit `/metrics` to view Prometheus-compatible metrics

### Grafana

* Connect Grafana to Prometheus server scraping your API's `/metrics` endpoint

---

## ⚙️ Scalability Plan (100k+ Devices)

| Concern        | Strategy                                    |
| -------------- | ------------------------------------------- |
| High traffic   | Horizontal scaling via Nginx load balancing |
| DB bottlenecks | MongoDB sharding on `device_id`             |
| Write overload | Use RabbitMQ/BullMQ queue, async DB writes  |
| Frequent reads | Cache latest sync in Redis                  |
| Monitoring     | Prometheus metrics + Grafana dashboards     |

---

## 📫 API Docs (Brief)

### POST /sync-event

```json
{
  "device_id": "abc123",
  "timestamp": "2024-05-08T12:00:00Z",
  "total_files_synced": 20,
  "total_errors": 1,
  "internet_speed": 3.2
}
```

### GET /device/:id/sync-history

Returns last 50 sync events for a device.

### GET /devices/repeated-failures

Returns devices with more than 3 error-filled syncs.

---

## 🧪 Testing

Use Postman or curl to test the endpoints. Swagger/OpenAPI support coming soon.

---

## 🤝 Contributing

Pull requests are welcome. Please follow clean code practices and document your changes.

---

## 🛡️ License

# PiSync Backend

PiSync is a lightweight backend service that handles sync events from offline-first devices like PiBook and PiBox. When devices regain internet access, they send sync logs which are processed, stored, and analyzed by this system.

## 🔧 Tech Stack

* **Node.js** with **Express.js**
* **MongoDB** for storage (supports sharding)
* **Redis** for caching
* **BullMQ (Redis-based)** for queuing
* **Prometheus + Grafana** for monitoring
* **Nginx** or **AWS ELB** for load balancing

---

## 🚀 Features

* `POST /sync-event`: Accepts sync events from devices
* `GET /device/:id/sync-history`: Returns sync history of a device
* `GET /devices/repeated-failures`: Returns devices with >3 sync failures
* Logs a warning if a device fails to sync 3 times in a row
* Cache latest sync in Redis
* Scalable via load balancing, DB sharding, and async queue

---

## 📦 Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/your-org/pisync-backend.git
cd pisync-backend
```

### 2. Environment Variables

Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/pisync
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
npm start
```

---

## 📊 Monitoring (Optional)

### Prometheus Endpoint

* Visit `/metrics` to view Prometheus-compatible metrics

### Grafana

* Connect Grafana to Prometheus server scraping your API's `/metrics` endpoint

---

## ⚙️ Scalability Plan (100k+ Devices)

| Concern        | Strategy                                    |
| -------------- | ------------------------------------------- |
| High traffic   | Horizontal scaling via Nginx load balancing |
| DB bottlenecks | MongoDB sharding on `device_id`             |
| Write overload | Use RabbitMQ/BullMQ queue, async DB writes  |
| Frequent reads | Cache latest sync in Redis                  |
| Monitoring     | Prometheus metrics + Grafana dashboards     |

---

## 📫 API Docs (Brief)

### POST /sync-event

```json
{
  "device_id": "abc123",
  "timestamp": "2024-05-08T12:00:00Z",
  "total_files_synced": 20,
  "total_errors": 1,
  "internet_speed": 3.2
}
```

### GET /device/:id/sync-history

Returns last 50 sync events for a device.

### GET /devices/repeated-failures

Returns devices with more than 3 error-filled syncs.

---

## 🧪 Testing

Use Postman or curl to test the endpoints. Swagger/OpenAPI support coming soon.

---

## 🤝 Contributing

Pull requests are welcome. Please follow clean code practices and document your changes.

---

## 🛡️ License

ISC License.
