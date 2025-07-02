interface LoadingOverlayProps {
  isVisible: boolean;
}

export default function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">Processing your request...</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Please wait a moment</p>
          </div>
        </div>
      </div>
    </div>
  );
}