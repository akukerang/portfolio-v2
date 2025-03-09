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
