'use client';

import { X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ChatModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const { messages, sendMessage, status, error, stop } = useChat();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendMessage({ text: input });
        setInput('');
    };

    return (
        <div className="fixed bottom-20 right-4 z-50">
            {/* Botón flotante animado */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        key="chat-button"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setIsOpen(true)}
                        className="flex items-center justify-center w-9 h-9 rounded-full shadow-lg bg-primary text-white hover:bg-primary transition"
                        aria-label="Abrir chat">
                        <MessageCircle size={20} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Modal flotante estilo chat */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chat-modal"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{
                            duration: 0.35,
                            ease: [0.22, 1.28, 0.36, 1], // rebote sutil
                        }}
                        className="fixed bottom-20 right-4 w-80 h-96 rounded-lg shadow-2xl border
                       bg-white dark:bg-gray-900 flex flex-col overflow-hidden p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between space-y-1.5 pb-4">
                            <h2 className="text-sm font-semibold dark:text-white">AI Chatbot</h2>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                                aria-label="Cerrar chat">
                                <X size={18} />
                            </button>
                        </div>

                        {error && <div className="text-red-500 mb-4">{error.message}</div>}

                        {/* Mensajes */}
                        <div className="flex-1 overflow-y-auto pr-4">
                            {messages.map((message) => (
                                <div key={message.id}>
                                    <div className="text-sm font-semibold">{message.role === 'user' ? 'You:' : 'AI:'}</div>
                                    <div
                                        className={`mb-4 px-3 py-2 rounded-lg text-sm ${message.role === 'user' ? 'self-end bg-gray-800 dark:bg-gray-100 text-white dark:text-black' : 'self-start bg-gray-100 dark:bg-gray-800'}`}>
                                        {message.parts.map((part) => {
                                            switch (part.type) {
                                                case 'text':
                                                    return (
                                                        <div key={`${message.id}`} className="whitespace-pre-wrap">
                                                            {part.text}
                                                        </div>
                                                    );
                                                default:
                                                    return null;
                                            }
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {(status === 'submitted' || status === 'streaming') && (
                            <div className="mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400" />
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="pt-4">
                            <div className="flex gap-2">
                                <Input
                                    className=""
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="How can I help you?"
                                />
                                {status === 'submitted' || status === 'streaming' ? (
                                    <Button
                                        type="button"
                                        onClick={stop}
                                        className="bg-red-500 text-white hover:bg-red-600 transition-colors">
                                        Stop
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        disabled={status !== 'ready'}>
                                        Send
                                    </Button>
                                )}
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
