import { ThemeToggle } from '@/components/theme-toggle';
import { LocaleToggle } from '@/components/locale-toggle';

const Footer = () => (
    <footer className="fixed bottom-0 w-full p-5 text-right">
        © Copyright {new Date().getFullYear()} My Chatbot
        <LocaleToggle />
        <ThemeToggle />
    </footer>
);

export default Footer;
