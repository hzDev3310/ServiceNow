import "./global.css";
import ThemeProvider from "../src/components/ThemeProvider"
export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <ThemeProvider>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
