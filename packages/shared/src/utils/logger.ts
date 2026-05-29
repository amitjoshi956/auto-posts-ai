type LogLevel = 'INFO' | 'WARN' | 'ERROR';

type LogEntry = {
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  metadata?: Record<string, unknown>;
};

export class Logger {
  constructor(private service: string) {}

  private transport(level: LogLevel, entry: LogEntry): void {
    const output = JSON.stringify(entry);

    if (level === 'ERROR') return console.error(output);
    if (level === 'WARN') return console.warn(output);
    console.log(output);
  }

  private createLog(level: LogLevel, message: string, metadata?: Record<string, unknown>): void {
    this.transport(level, {
      timestamp: new Date().toUTCString(),
      level,
      service: this.service,
      message,
      metadata,
    });
  }

  logInfo(message: string, metadata?: Record<string, unknown>): void {
    this.createLog('INFO', message, metadata);
  }

  logWarning(message: string, metadata?: Record<string, unknown>): void {
    this.createLog('WARN', message, metadata);
  }

  logError(message: string, metadata?: Record<string, unknown>): void {
    this.createLog('ERROR', message, metadata);
  }
}
