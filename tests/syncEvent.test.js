const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Import the express app directly
const SyncEvent = require('../models/syncEvent');

// Set the environment to test
process.env.NODE_ENV = 'test';

// Sample test data
const testSyncEvent = {
  device_id: '1234',
  timestamp: '2025-05-08T00:00:00Z',
  total_files_synced: 100,
  total_errors: 1,
  internet_speed: 50
};

describe('SyncEvent API', () => {
  beforeAll(async () => {
    // Connect to test DB
    await mongoose.connect('mongodb://localhost:27017/pisync_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    // Clean up DB and close connection
    await SyncEvent.deleteMany({});
    await mongoose.connection.close();
  });

  // Test: POST /sync-event
  it('should create a new sync event', async () => {
    const res = await request(app)
      .post('/api/sync-event')
      .send(testSyncEvent);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Event stored successfully');
  });

  // Test: GET /device/:id/sync-history
  it('should return sync history for a device', async () => {
    const syncEvent = new SyncEvent(testSyncEvent);
    await syncEvent.save();

    const res = await request(app).get('/api/device/1234/sync-history');

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].device_id).toBe('1234');
  });

  // Test: GET /devices/repeated-failures
  it('should list devices with repeated failures', async () => {
    // Add multiple failures
    const failedSyncEvent = { ...testSyncEvent, total_errors: 3 };
    await new SyncEvent(failedSyncEvent).save();
    await new SyncEvent(failedSyncEvent).save();

    const res = await request(app).get('/api/devices/repeated-failures');

    expect(res.status).toBe(200);
    expect(res.body).toContain('1234');
  });
});
