const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

const encryptdata = (text) => {
    
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString('hex')
};

//function to enrypt each properties of the input object
//and return the new encrypted object
function encrypt (data){
    let _id = data._id;
    let firstName = data.firstName;
    let lastName = data.lastName;
    let dateCreated = String(data.dateCreated);

    _id = encryptdata(_id)
    firstName = encryptdata(firstName);
    lastName = encryptdata(lastName);
    dateCreated = encryptdata(dateCreated);

    return {
        _id,
        firstName,
        lastName,
        dateCreated
    };
}

module.exports = encrypt ;