const express = require('express');
const { createSyncEvent, getSyncHistory, getDevicesWithRepeatedFailures } = require('../controllers/syncEventController');

const router = express.Router();

// POST /sync-event - Store sync event
router.post('/sync-event', createSyncEvent);

// GET /device/:id/sync-history - Get sync history for a device
router.get('/device/:id/sync-history', getSyncHistory);

// GET /devices/repeated-failures - List device with more than 3 failed syncs
router.get('/devices/repeated-failures', getDevicesWithRepeatedFailures);

module.exports = router;
