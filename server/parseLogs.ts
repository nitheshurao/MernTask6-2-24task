import * as fs from 'fs';
import * as readline from 'readline';
 
interface ParsedLog {
  timestamp: number;
  loglevel: string;
  transactionId: string;
  err?: string;
}
 
export function ParseLogs(logData: string): ParsedLog[] {
  const logs: ParsedLog[] = [];
 console.log(")))))",logData)
  const lines = logData.split('\n');
 
  lines.forEach((line) => {
    const match = line.match(/^([\dTZ:\.-]+) - (\w+) - ({.*})$/);
    if (match) {
      const timestamp = new Date(match[1]).getTime();
      const loglevel = match[2];
      const logDetails = JSON.parse(match[3]);
 
      if (loglevel === 'error' || loglevel === 'warn') {
        const parsedLog: ParsedLog = {
          timestamp,
          loglevel,
          transactionId: logDetails.transactionId,
          err: logDetails.err || undefined,
        };
 
        logs.push(parsedLog);
      }
    }
  });
 
  return logs;
}
 
// Example usage
// const fileContent = fs.readFileSync('example.log', 'utf-8');
// const parsedLogs = ParseLogs(fileContent);
// console.log(parsedLogs);