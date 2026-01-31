/**
 * faq controller
 */

import { factories } from '@strapi/strapi'

// @ts-ignore - Content type will be available after build
export default factories.createCoreController('api::faq.faq');
