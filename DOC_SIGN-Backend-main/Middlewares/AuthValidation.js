// const Joi = require('joi');

// const signupValidation = (req,res,next) =>{
//     const schema = Joi.object({
//         name: Joi.string().min(3).max(30).required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().min(6).max(20).required()
//     });

//     const { error } = schema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ message: error.details[0].message });
//     }
//     next();
// }

// const loginValidation = (req,res,next) =>{
//     const schema = Joi.object({
//         email: Joi.string().email().required(),
//         password: Joi.string().min(6).max(20).required()
//     });

//     const { error } = schema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ message: error.details[0].message });
//     }
//     next();
// }

// module.export={
//     signupValidation,
//     loginValidation
// }

const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
