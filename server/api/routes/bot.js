import FacebookMessenger from 'fb-messenger';

const verify_token = 'supersecrecttoken';
const token = 'your secret token';

const messenger = new FacebookMessenger(token);

export default (router) => {
  router
    .get('/webhook', async ctx => {
      const challenge = ctx.request.query['hub.challenge'];
      if (challenge === verify_token) {
        ctx.status = 200;
        ctx.body = challenge;
      }
    })

    // handle incoming messages
    .post('/webhook', async ctx => {
      console.log(ctx.request.body);

      const messagingEvents = ctx.request.body.entry[0].messaging;

      messagingEvents.map(event => {
        const sender = event.sender.id
        if (event.message && event.message.text) {
          messenger.sendTextMessage(sender, "Echo: " + event.message.text);
        }
      });

      ctx.status = 200;
      ctx.body = 'ok';
    })
}
