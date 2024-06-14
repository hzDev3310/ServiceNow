
const ThemeProvider = ({ children }) => {
  return (
    <div className="bg-white dark:bg-slate-900 dark:text-white transition-colors min-h-screen">
      {children}
    </div>
  );
};

export default ThemeProvider;
