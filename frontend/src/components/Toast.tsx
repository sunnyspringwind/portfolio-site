type ToastProps = {
  show: boolean;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ show, message, type, onClose }) => {
  if (!show) return null;

  return (
    <div
      className={`fixed top-4 z-50 right-4 p-4 rounded-lg shadow-lg transition-all duration-500 transform translate-y-0 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <div className="flex items-center gap-2">
        <p className="text-white font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;