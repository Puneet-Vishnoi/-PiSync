# PiSync Backend

PiSync is a lightweight backend service that handles sync events from offline-first devices like PiBook and PiBox. When devices regain internet access, they send sync logs which are processed, stored, and analyzed by this system.

## 🔧 Tech Stack

* **Node.js** with **Express.js**
* **MongoDB** for storage
---

## 🚀 Features

* `POST /sync-event`: Accepts sync events from devices
* `GET /device/:id/sync-history`: Returns sync history of a device
* `GET /devices/repeated-failures`: Returns devices with >3 sync failures
* Logs a warning if a device fails to sync 3 times in a row
---

## 📦 Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/Puneet-Vishnoi/pisync-backend.git
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
## 📫 API Docs (Brief)

### POST /api/sync-event

```json
{
  "device_id": "abc123",
  "timestamp": "2024-05-08T12:00:00Z",
  "total_files_synced": 20,
  "total_errors": 1,
  "internet_speed": 3.2
}
```

### GET  /api/device/:id/sync-history

Returns last 50 sync events for a device.

### GET /api/devices/repeated-failures

Returns devices with more than 3 error-filled syncs.

---

## 🧪 Testing

Use Postman or curl to test the endpoints.

---

## 🛡️ License

ISC License.
