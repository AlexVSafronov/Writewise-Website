const Mailjet = require('node-mailjet');

const MAILJET_NEWSLETTER_LIST_ID = 10537060;

/**
 * Subscribes the lead to a Mailjet contact list.
 * Uses 'addnoforce' to respect existing unsubscribes.
 */
async function subscribeToList(
  mailjet: any,
  email: string,
  firstName: string,
  lastName: string,
  listId: number,
  properties?: Record<string, string>
) {
  // Ensure contact exists with name
  try {
    await mailjet.post('contact', { version: 'v3' }).request({
      Email: email,
      Name: `${firstName} ${lastName}`.trim(),
    });
  } catch (_) {
    // Contact may already exist — that's fine
  }

  // Add to list
  await mailjet
    .post('contactslist', { version: 'v3' })
    .id(listId)
    .action('managecontact')
    .request({
      Email: email,
      Name: `${firstName} ${lastName}`.trim(),
      Action: 'addnoforce',
      Properties: properties || {},
    });
}

export default {
  /**
   * Registers a placement test lead:
   * - Subscribes to the newsletter list (existing)
   * - Subscribes to the placement-test-specific list (new, if configured)
   */
  async registerLead({
    firstName,
    lastName,
    email,
    phone,
    language,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    language: string;
  }) {
    const mailjetApiKey = process.env.MAILJET_API_KEY;
    const mailjetSecretKey = process.env.MAILJET_SECRET_KEY;

    if (!mailjetApiKey || !mailjetSecretKey) {
      throw new Error('Mailjet credentials not configured');
    }

    const mailjet = Mailjet.apiConnect(mailjetApiKey, mailjetSecretKey);
    const properties: Record<string, string> = {
      language,
      source: 'placement_test',
      ...(phone ? { phone } : {}),
    };

    // Always subscribe to newsletter list
    await subscribeToList(mailjet, email, firstName, lastName, MAILJET_NEWSLETTER_LIST_ID, properties);

    // Optionally subscribe to placement test list if configured
    const placementListId = parseInt(process.env.MAILJET_PLACEMENT_TEST_LIST_ID || '0', 10);
    if (placementListId > 0) {
      await subscribeToList(mailjet, email, firstName, lastName, placementListId, properties);
      console.log(`Lead subscribed to placement test list ${placementListId}: ${email}`);
    }

    console.log(`Lead registered: ${email} (${language})`);
  },

  /**
   * Proxies the test generation request to the WriteWise app service.
   */
  async generateTest({
    language,
    nativeLanguage,
    sessionId,
  }: {
    language: string;
    nativeLanguage: string;
    sessionId: string;
  }): Promise<any> {
    const appUrl = process.env.WRITEWISE_APP_URL;
    if (!appUrl) {
      throw new Error('WRITEWISE_APP_URL environment variable not set');
    }

    const response = await fetch(`${appUrl}/api/public/placement-test/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, nativeLanguage, sessionId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`App service generate error (${response.status}): ${errorText}`);
    }

    return response.json();
  },

  /**
   * Proxies the evaluation request to the WriteWise app service.
   */
  async evaluateTest({
    sessionId,
    language,
    nativeLanguage,
    test,
    answers,
  }: {
    sessionId: string;
    language: string;
    nativeLanguage: string;
    test: any;
    answers: Record<string, string>;
  }): Promise<any> {
    const appUrl = process.env.WRITEWISE_APP_URL;
    if (!appUrl) {
      throw new Error('WRITEWISE_APP_URL environment variable not set');
    }

    const response = await fetch(`${appUrl}/api/public/placement-test/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, language, nativeLanguage, test, answers }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`App service evaluate error (${response.status}): ${errorText}`);
    }

    return response.json();
  },
};
