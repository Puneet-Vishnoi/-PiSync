# PiSync Backend

PiSync is a lightweight backend service that handles sync events from offline-first devices like PiBook and PiBox. When devices regain internet access, they send sync logs which are processed, stored, and analyzed by this system.

## 🔧 Tech Stack

* **Node.js** with **Express.js**
* **MongoDB** for storage
* **Redis** for caching (optional)
* **Docker** for containerization

## 🚀 Features

* `POST /api/sync-event`: Accepts sync events from devices
* `GET /api/device/:id/sync-history`: Returns sync history of a device
* `GET /api/devices/repeated-failures`: Returns devices with >3 sync failures
* Logs a warning if a device fails to sync 3 times in a row

## 📦 Setup Instructions

### Using Docker (Recommended)

1. Clone Repo

```bash
git clone https://github.com/Puneet-Vishnoi/pisync-backend.git
cd pisync-backend
```

2. Start Docker Containers

```bash
docker-compose up -d
```

This will:
- Build the Node.js application
- Start MongoDB container
- Start Redis container
- Connect all services through a Docker network

### Manual Setup

1. Clone Repo

```bash
git clone https://github.com/Puneet-Vishnoi/pisync-backend.git
cd pisync-backend
```

2. Environment Variables
Create a `.env` file:

Mannual env
```
MONGODB_URI=mongodb://localhost:27017/pisync
PORT=3000
```
Docker env
```
MONGODB_URI=mongodb://mongodb:27017/pisync
PORT=8080
```

3. Install Dependencies

```bash
npm install
```

4. Start the Server

```bash
npm start
```

## 📫 API Documentation

### POST /api/sync-event

Record a new sync event from a device.

**Request Body:**
```json
{
  "device_id": "abc123",
  "timestamp": "2024-05-08T12:00:00Z",
  "total_files_synced": 20,
  "total_errors": 1,
  "internet_speed": 3.2
}
```

### GET /api/device/:id/sync-history

Returns the last 50 sync events for a specific device.

**Parameters:**
- `id`: Device ID

### GET /api/devices/repeated-failures

Returns a list of devices that have had more than 3 error-filled syncs.

## 🧪 Testing

### Using Docker

```bash
docker exec -it pisync-app npm test
```

### Manual Testing

```bash
npm test
```

Or use Postman/curl to test the endpoints directly.

## 🔍 Container Access

To access the running containers:

```bash
# Access Node.js application
docker exec -it pisync-app sh

# Access MongoDB
docker exec -it pisync-mongodb mongo

# Access Redis
docker exec -it pisync-redis redis-cli
```

## 📊 Volume Information

The Docker setup includes persistent volumes for:
- MongoDB data: `mongo-data`

This ensures your data is preserved even if containers are restarted.

## 🛡️ License

ISC License