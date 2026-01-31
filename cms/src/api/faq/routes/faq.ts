/**
 * faq router
 */

import { factories } from '@strapi/strapi';

// @ts-ignore - Content type will be available after build
export default factories.createCoreRouter('api::faq.faq');
