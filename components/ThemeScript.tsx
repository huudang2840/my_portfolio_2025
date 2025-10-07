export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'light' || theme === 'dark') {
                document.documentElement.classList.add(theme);
              } else {
                var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.classList.add(systemTheme);
              }
            } catch (e) {
              document.documentElement.classList.add('dark');
            }
          })();
        `,
      }}
      suppressHydrationWarning
    />
  );
}
