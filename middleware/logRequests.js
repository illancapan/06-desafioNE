export const logRequests = (req, res, next) => {
    console.log(`Solicitud recibida: ${req.method} ${req.originalUrl}`)
    next()
}
