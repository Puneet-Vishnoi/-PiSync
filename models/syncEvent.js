const mongoose = require('mongoose');

const syncEventSchema = new mongoose.Schema({
  device_id: { type: String, required: true },
  timestamp: { type: Date, required: true },
  total_files_synced: { type: Number, required: true },
  total_errors: { type: Number, required: true },
  internet_speed: { type: Number, required: true }
});

const SyncEvent = mongoose.model('SyncEvent', syncEventSchema);

module.exports = SyncEvent;
