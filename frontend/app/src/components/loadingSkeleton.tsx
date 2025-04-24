// components/LoadingSkeleton.js
export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded col-span-1"></div>
          <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded col-span-3"></div>
        </div>
        <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded"></div>
      </div>
    </div>
  );
};
