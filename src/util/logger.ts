import moment from "moment";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { appConfig } from "../setup";

export const logger = createLogger({
    level: "info",
    format: format.combine(
        format.align(),
        format.printf((info) => {
            const date = moment().format("MMM-DD-YYYY HH:mm:ss Z");
            return `${info.level}: ${date}: ${info.message}`;
        })
    ),
    transports: [
        new DailyRotateFile({
            level: "warn",
            utc: true,
            maxFiles: "15d",
            maxSize: "20m",
            dirname: "log",
            filename: "application-%DATE%.log"
        })
    ]
});

export function initializeLogging() {
    if (appConfig.ENV === "dev") {
        const consoleLogger = new transports.Console({
            level: "debug",
            format: format.combine(
                format.colorize(),
                format.printf((info) => {
                    const date = moment().format("MMM-DD-YYYY HH:mm:ss Z");
                    return `${info.level}: ${date}: ${info.message}`;
                })
            )
        });
        logger.add(consoleLogger);
    }
}
