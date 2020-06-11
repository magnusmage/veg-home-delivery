const DEBUG_LOGGING_ENABLED = true; //TODO Setup environmental variables
const ERROR_LOGGING_ENABLED = true;

export class Log {

    /**
     * Info Log - show all the time.
     * @param tag
     * @param message
     */
    static i(tag, message) {
        console.info(tag, message);
    }

    /**
     * Debug don't show on Prod
     * @param tag
     * @param message
     */
    static d(tag, message) {
        if (DEBUG_LOGGING_ENABLED) console.debug(tag, message);
    }

    /**
     * Error Logs - show
     * @param tag
     * @param message
     */
    static e(tag, message) {
        if (ERROR_LOGGING_ENABLED) console.error(tag, message);
    }
}


