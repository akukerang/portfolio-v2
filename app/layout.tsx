import type { Metadata } from "next";
import "./globals.css";
import DesktopTaskbar from "@/components/desktopTaskbar";
export const metadata: Metadata = {
  title: "Gabriel Suoth Portfolio",
  description: "Portfolio website of Gabriel Suoth, a software developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <div className="desktop">
          <DesktopTaskbar />
          <div className="terminal">
            <div className="taskbar">
              <div className="taskbar-title">gabe@dev</div>
              <div className="taskbar-buttons">
                <span className="taskbar-button" style={{ color: "var(--color_03)" }}>
                  ⬤
                </span>
                <span className="taskbar-button" style={{ color: "var(--color_04)" }}>
                  ⬤
                </span>
                <span className="taskbar-button" style={{ color: "var(--color_02)" }}>
                  ⬤
                </span>
              </div>
            </div>
            <div className="terminal-body">
              {children}
            </div>
          </div>
        </div>

      </body>
    </html>
  );
}
