'use client';

import { Globe } from 'lucide-react';
import { Locale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { routing } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LocaleToggle() {
    const t = useTranslations('LocaleSwitcher');
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    function onSelectChange(value: Locale) {
        const nextLocale = value;
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="ms-5" disabled={isPending}>
                    <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Globe className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle Locale</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {routing.locales.map((cur) => (
                    <DropdownMenuItem onClick={() => onSelectChange(cur)} key={cur}>
                        {t('locale', { locale: cur })}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
