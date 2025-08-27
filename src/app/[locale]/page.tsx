import { getTranslations } from 'next-intl/server';
import ChatModal from '@/components/ChatModal';

const Home = async () => {
    const t = await getTranslations('Main');
    return (
        <div className="flex flex-col justify-center items-center">
            <h1>{t('title')}</h1>
            <ChatModal />
        </div>
    );
};

export default Home;
