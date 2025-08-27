'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ChangeEvent, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LocaleSwitcher() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value;
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }

    return (
        <select
            className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6 ms-5"
            defaultValue={locale}
            disabled={isPending}
            onChange={onSelectChange}>
            {routing.locales.map((cur) => (
                <option key={cur} value={cur}>
                    {t('locale', { locale: cur })}
                </option>
            ))}
        </select>
    );
}
