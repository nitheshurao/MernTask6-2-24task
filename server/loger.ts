import { createLogger, format, transports } from "winston";

const logger1 = createLogger({
  level: "debug",
  format: format.json(),
  transports: [new transports.Console()],
});
export default logger1;