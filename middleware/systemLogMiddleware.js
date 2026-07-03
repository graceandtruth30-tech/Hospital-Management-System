const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFilePath = path.join(logDir, 'system.log');

const formatDate = () => new Date().toISOString();

const writeLog = (text) => {
  fs.appendFileSync(logFilePath, text + '\n', 'utf8');
};

const sensitiveFieldPattern = /password|pass|pwd|secret|token|auth/i;

const sanitizeData = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitizeData);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [
        key,
        sensitiveFieldPattern.test(key) ? '[REDACTED]' : sanitizeData(val)
      ])
    );
  }
  return value;
};

const safeJson = (value) => {
  try {
    return JSON.stringify(value);
  } catch {
    return '"[UNABLE TO SERIALIZE]"';
  }
};

const systemLogMiddleware = (req, res, next) => {
  const start = process.hrtime();
  const { method, originalUrl } = req;
  const ip = req.ip || req.connection.remoteAddress;

  const bodySummary = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && req.body && Object.keys(req.body).length
    ? ` | body=${safeJson(sanitizeData(req.body))}`
    : '';

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
    const logEntry = `${formatDate()} | ${ip} | ${method} ${originalUrl}${bodySummary} | ${res.statusCode} | ${durationMs}ms`;
    writeLog(logEntry);
    console.log(logEntry);
  });

  next();
};

module.exports = systemLogMiddleware;
