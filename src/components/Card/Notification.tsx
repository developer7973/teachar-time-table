import  { useEffect } from 'react';

const Notification = ({ message, type, onClose }:any) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const getNotificationStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-600 text-white';
            case 'error':
                return 'bg-red-600 text-white';
            default:
                return 'bg-cyan-400 text-black';
        }
    };

    return (
        <div className={`fixed top-4 right-4 px-6  py-3 rounded-lg font-medium z-50 transition-all duration-300 shadow-lg ${getNotificationStyles()}`}>
            {message}
        </div>
    );
};

export default Notification;
