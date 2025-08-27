import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

const Header = async () => {
    const t = await getTranslations('Main');

    return (
        <nav className="flex justify-between items-center p-5">
            <Link href="/" title="MyChatbot">
                {t('title')}
            </Link>
        </nav>
    );
};
export default Header;
