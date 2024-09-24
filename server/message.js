function  send(message,to){
const accountSid = 'AC0085ec4e1bce402d74d00889238e56e2';
const authToken = '07136809d977364ae8493f0422613ce3';
const client = require('twilio')(accountSid, authToken);
client.messages
    .create({
        body:message ,
        from: '+16062689751',
        to: '+91'+to
    })
    .then(message => console.log(message.sid));
}
module.exports=send;