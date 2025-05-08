const SyncEvent = require('../models/syncEvent');

// POST /sync-event - Store sync event and check for 3 consecutive failures
const createSyncEvent = async (req, res, next) => {
  const { device_id, timestamp, total_files_synced, total_errors, internet_speed } = req.body;

  if (
    !device_id ||
    !timestamp ||
    total_files_synced === undefined ||
    total_errors === undefined ||
    internet_speed === undefined
  ) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const syncEvent = new SyncEvent({
      device_id,
      timestamp: new Date(timestamp),
      total_files_synced,
      total_errors,
      internet_speed
    });

    await syncEvent.save();

    // Check for 3 consecutive failures
    const lastThree = await SyncEvent.find({ device_id }).sort({ timestamp: -1 }).limit(3);
    const failedThreeTimes = lastThree.length === 3 && lastThree.every(event => event.total_errors > 0);

    if (failedThreeTimes) {
      console.log(`Alert: Device ${device_id} has failed to sync 3 times in a row.`);
    }

    res.status(201).json({ message: 'Event stored successfully' });
  } catch (error) {
    next(error);
  }
};

// GET /device/:id/sync-history - Get sync history for a device
const getSyncHistory = async (req, res, next) => {
  try {
    const events = await SyncEvent.find({ device_id: req.params.id }).sort({ timestamp: -1 });

    if (events.length === 0) {
      return res.status(404).json({ error: 'No sync history found for this device' });
    }

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// GET /devices/repeated-failures - List devices with more than 3 failed syncs total
const getDevicesWithRepeatedFailures = async (req, res, next) => {
  try {
    const failures = await SyncEvent.aggregate([
      { $match: { total_errors: { $gt: 0 } } },
      { $group: { _id: "$device_id", failureCount: { $sum: 1 } } },
      { $match: { failureCount: { $gt: 3 } } }
    ]);

    const deviceIds = failures.map(failure => failure._id);

    res.status(200).json(deviceIds);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSyncEvent,
  getSyncHistory,
  getDevicesWithRepeatedFailures
};
