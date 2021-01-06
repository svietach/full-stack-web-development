const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

const tokenExtractor = (request, response, next) => {
    // code that extracts the token
    request.token = getTokenFrom(request);
    next()
}

module.exports = tokenExtractor;