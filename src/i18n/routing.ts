import { defineRouting } from 'next-intl/routing';
import { PATHNAMES_INTL } from '@/lib/pathnames';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['es', 'en'],

    // Used when no locale matches
    defaultLocale: 'es',
    localePrefix: 'as-needed',

    // false: This will disable locale detection based on the accept-language header
    // and a potentially existing cookie value from a previous visit.
    // meaning if I set this to false, the new tab or new window won't respect the cookie value.
    localeDetection: true,

    // The `pathnames` object holds pairs of internal and
    // external paths. Based on the locale, the external
    // paths are rewritten to the shared, internal ones.
    pathnames: PATHNAMES_INTL,
});
