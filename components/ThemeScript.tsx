export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'light' || theme === 'dark') {
                document.documentElement.className = document.documentElement.className.replace(/\\b(dark|light)\\b/g, '') + ' ' + theme;
              } else {
                var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.className = document.documentElement.className.replace(/\\b(dark|light)\\b/g, '') + ' ' + systemTheme;
              }
            } catch (e) {
              document.documentElement.className = document.documentElement.className.replace(/\\b(dark|light)\\b/g, '') + ' dark';
            }
          })();
        `,
      }}
      suppressHydrationWarning
    />
  );
}
