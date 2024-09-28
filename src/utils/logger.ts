import logger from "pino";
import dayjs from "dayjs";

/**
 * Configured Pino logger instance.
 *
 * Uses `pino-pretty` for formatted output and `dayjs` for timestamp formatting.
 *
 * @type {logger}
 */
const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
