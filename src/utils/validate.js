const Joi = require("joi");

const schema = Joi.object({
    firstName: Joi.string()
                  .required(),
    lastName: Joi.string()
                .required()
});

async function validateData(data) {
    try {
        const value = await schema.validateAsync(data);
        return {
            valid: true,
            value
        };
    } catch (err) {
        err = err.details[0].message
        
        return {
            valid: false,
            err
        };
    };
};

module.exports = validateData;