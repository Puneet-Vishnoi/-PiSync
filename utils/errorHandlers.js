// Error handling middleware for operational errors
function handleError(err, req, res, next) {
  if (err.name === 'ValidationError') {
    // Handling validation errors (for example, Mongoose validation errors)
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'CastError') {
    // Handling invalid ObjectId or other cast errors
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  if (err.status) {
    // Handle custom errors with a specific status code
    return res.status(err.status).json({ error: err.message });
  }

  // If the error is not handled by above cases, return a generic error
  console.error(err);  // Log the error details for debugging
  return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
}

// Middleware for catching 404 errors (Page Not Found)
function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Not Found' });
}

module.exports = { handleError, notFoundHandler };
