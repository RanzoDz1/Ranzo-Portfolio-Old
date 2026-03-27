const { Resend } = require('resend');

const key = 're_6e6vqT9L_9h3UK3tQ9iBid5Z4Z8XHG35Z';
const resend = new Resend(key);

async function test() {
    console.log('Sending test email...');
    try {
        const res = await resend.emails.send({
            from: 'Ranzo Portfolio <notifications@ranzodz.com>',
            to: ['ranzodz1@gmail.com'],
            replyTo: 'testclient@example.com',
            subject: 'Email+Attachment Combined Test',
            html: '<h2>Both Working Test</h2><p>Email is working!</p><p><a href="https://uksjc5epkyj5rji0.public.blob.vercel-storage.com/full-test.jpg">View Attachment</a></p>'
        });
        console.log('Resend result:', JSON.stringify(res, null, 2));
    } catch (e) {
        console.error('Send error:', e.message);
    }
}

test();
