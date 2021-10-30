/* eslint-disable no-console */
const logLevels = {
  TRACE: {
    code: 0,
    key: 'TRACE',
    label: 'Trace'
  },
  DEBUG: {
    code: 1,
    key: 'DEBUG',
    label: 'Debug'
  },
  INFO: {
    code: 2,
    key: 'INFO',
    label: 'Info'
  },
  WARNING: {
    code: 3,
    key: 'WARNING',
    label: 'Warning'
  },
  ERROR: {
    code: 4,
    key: 'ERROR',
    label: 'Error'
  },
  FATAL: {
    code: 5,
    key: 'FATAL',
    label: 'Fatal'
  }
};

const processLog = message => {
  let messageToDisplay = '';

  if (message instanceof Error) {
    messageToDisplay = message.message;
  } else {
    messageToDisplay = JSON.stringify(message);
  }

  return messageToDisplay;
};

const preProcessLog = logLevelKey => {
  const timestamp = `[${new Date().toISOString()}]`;
  const preText = String(logLevels[logLevelKey].label || '')
    .substring(0, 4)
    .toUpperCase();

  return `${timestamp} ${preText}: `;
};

const log = (logLevelKey = logLevels.INFO.key, shouldProcessMessage = false, ...messages) => {
  let messageToDisplay = [preProcessLog(logLevelKey)];

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    messageToDisplay.push(shouldProcessMessage ? processLog(message) : message);

    if (message instanceof Error) {
      // For stack trace
      console.error(`${message.stack}`);
    }
  }

  if (logLevels[logLevelKey].code >= logLevels.WARNING.code) {
    console.warn(...messageToDisplay);
  } else {
    console.log(...messageToDisplay);
  }
};

export const logTrace = (...messages) => log(logLevels.TRACE.key, true, ...messages);
export const logDebug = (...messages) => log(logLevels.DEBUG.key, true, ...messages);
export const logInfo = (...messages) => log(logLevels.INFO.key, true, ...messages);
export const logWarning = (...messages) => log(logLevels.WARNING.key, true, ...messages);
export const logError = (...messages) => log(logLevels.ERROR.key, true, ...messages);
export const logFatal = (...messages) => log(logLevels.FATAL.key, true, ...messages);

export const logTracePure = (...messages) => log(logLevels.TRACE.key, false, ...messages);
export const logDebugPure = (...messages) => log(logLevels.DEBUG.key, false, ...messages);
export const logInfoPure = (...messages) => log(logLevels.INFO.key, false, ...messages);
export const logWarningPure = (...messages) => log(logLevels.WARNING.key, false, ...messages);
export const logErrorPure = (...messages) => log(logLevels.ERROR.key, false, ...messages);
export const logFatalPure = (...messages) => log(logLevels.FATAL.key, false, ...messages);
