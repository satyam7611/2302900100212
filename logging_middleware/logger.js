import { sendLogRequest } from './api';
import { LOG_LEVELS } from './constants';

// Base logger dispatching to local console and remote endpoint
export const Log = async (stack, level, packageName, message) => {
  const logData = {
    stack,
    level,
    package: packageName,
    message,
    timestamp: new Date().toISOString()
  };

  const consoleMessage = `[${logData.timestamp}] [${level.toUpperCase()}] [${packageName.toUpperCase()}] ${message}`;
  if (level === LOG_LEVELS.ERROR || level === LOG_LEVELS.FATAL) {
    console.error(consoleMessage);
  } else if (level === LOG_LEVELS.WARN) {
    console.warn(consoleMessage);
  } else {
    console.log(consoleMessage);
  }

  try {
    await sendLogRequest(logData);
  } catch (error) {
    console.warn(`[Logger] Failed to dispatch remote log: ${error.message}`);
  }
};

// Level helpers built on top of Log()
export const logInfo = (packageName, message) => Log('frontend', LOG_LEVELS.INFO, packageName, message);
export const logWarn = (packageName, message) => Log('frontend', LOG_LEVELS.WARN, packageName, message);
export const logError = (packageName, message) => Log('frontend', LOG_LEVELS.ERROR, packageName, message);
export const logFatal = (packageName, message) => Log('frontend', LOG_LEVELS.FATAL, packageName, message);

export default Log;
