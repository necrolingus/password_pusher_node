//thanks to this guy https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb
const crypto = require('crypto')

const algorithm = 'aes-256-cbc'
const encryptionKey = process.env.ENCRYPTIONKEY

function encrypt(text) {
    let iv = crypto.randomBytes(16) //must be 16 length
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey), iv)
    let encryptedText = cipher.update(text)
    encryptedText = Buffer.concat([encryptedText, cipher.final()]) //final is a buffer
    return iv.toString('hex') + ':' + encryptedText.toString('hex')
}


function decrypt(text) {
    let textParts = text.split(':')
    let iv = Buffer.from(textParts.shift(), 'hex') 
    let encryptedText = Buffer.from(textParts.join(':'), 'hex')
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey), iv)
    let decryptedText = decipher.update(encryptedText)

    decryptedText = Buffer.concat([decryptedText, decipher.final()])
    return decryptedText.toString()
}

module.exports = {decrypt, encrypt}