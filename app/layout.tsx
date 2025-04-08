import "./globals.css";
import DesktopTaskbar from "@/components/desktopTaskbar";
import { AnimationProvider } from "@/helper/AnimationContext";
import { ThemeProvider } from "@/helper/ThemeContext";
import Ls from "@/components/ls";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "gabe@dev",
  description: "Portfolio website of Gabriel Suoth, a software developer",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/icon.png" />

      </head>
      <body>
        <div className="flex flex-col justify-between min-h-screen">
          <AnimationProvider>
            <ThemeProvider>
              <DesktopTaskbar />
            </ThemeProvider>
            <div className="terminal text-[var(--color_08)] min-h-[80vh] min-w-70%
          flex flex-col items-center justify-center
          overflow-y-auto overflow-x-hidden bg-[var(--bg-color)]
          ]">
              <div className="relative flex w-full
            bg-[var(--task-bar)] items-center 
            ">
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
              <div className="">
                <Ls />
                {children}
              </div>
            </div>
          </AnimationProvider>
        </div>

      </body>
    </html>
  );
}
