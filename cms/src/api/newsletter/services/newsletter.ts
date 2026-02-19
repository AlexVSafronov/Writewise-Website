const Mailjet = require('node-mailjet');

const MAILJET_LIST_ID = 10537060; // WriteWise Newsletter list

export default {
  async addSubscriber(email: string) {
    const mailjetApiKey = process.env.MAILJET_API_KEY;
    const mailjetSecretKey = process.env.MAILJET_SECRET_KEY;

    if (!mailjetApiKey || !mailjetSecretKey) {
      console.error('Mailjet credentials not configured');
      throw new Error('Email service not configured');
    }

    const mailjet = Mailjet.apiConnect(mailjetApiKey, mailjetSecretKey);

    // Check if contact already exists on the list
    try {
      const existing = await mailjet
        .get('contact', { version: 'v3' })
        .id(encodeURIComponent(email))
        .request();

      if (existing.body?.Data?.length > 0) {
        // Contact exists — check if already on this list
        const contactId = existing.body.Data[0].ID;
        const listMembership = await mailjet
          .get('listrecipient', { version: 'v3' })
          .request({ ContactID: contactId, ListID: MAILJET_LIST_ID, Unsub: false });

        if (listMembership.body?.Count > 0) {
          throw new Error('ALREADY_SUBSCRIBED');
        }
      }
    } catch (error) {
      if (error.message === 'ALREADY_SUBSCRIBED') throw error;
      // 404 means contact doesn't exist yet — that's fine, continue
    }

    // Add contact to the newsletter list (creates contact if new)
    await mailjet.post('contact', { version: 'v3' }).id(MAILJET_LIST_ID).action('managecontact').request({
      Email: email,
      Action: 'addnoforce', // add but don't re-subscribe if previously unsubscribed
    });

    console.log(`Newsletter subscription added: ${email}`);
  },
};
