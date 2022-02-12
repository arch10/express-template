type MetaData = { [key: string]: string | number | null };

export function sendError(
    status = 400,
    message = "Unknown error",
    metadata?: MetaData
) {
    return {
        status,
        message,
        metadata
    };
}
