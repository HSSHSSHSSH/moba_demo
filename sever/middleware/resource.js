module.exports =  options => {
    const inflection = require('inflection')
    return async(req,res,next) => {
        req.Model = require(`../models/${inflection.classify(req.params.resource)}`)
        next()
      }
}