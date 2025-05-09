import "./globals.css";
import DesktopTaskbar from "@/components/desktopTaskbar";
import { ThemeProvider } from "@/helper/ThemeContext";
import Ls from "@/components/ls";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Background from "@/components/Background";

export const metadata: Metadata = {
  title: "gabe@dev",
  description: "Portfolio website of Gabriel Suoth, a software developer",
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
    apple: "/icon.ico",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/icon.png" />
      </head>

      <body className="h-screen overflow-hidden">
        <Background />
        <div className="flex flex-col h-screen">
          <ThemeProvider>
            <DesktopTaskbar />
          </ThemeProvider>

          {/* Main content container */}
          <div className="flex flex-col md:mt-16 items-center h-full">
            <div className="flex flex-col w-full md:w-[70%] color-8 h-screen">

              {/* Taskbar */}
              <div className="relative flex w-full bg-[var(--task-bar)] items-center justify-between rounded-t-lg">
                <div className="ml-5"></div>
                <div className="taskbar-title ml-auto mr-auto">gabe@dev</div>
                <div className="flex flex-row gap-2 mr-5 items-center">
                  <span className="hover:cursor-pointer color-3">⬤</span>
                  <span className="hover:cursor-pointer color-4">⬤</span>
                  <span className="hover:cursor-pointer color-2">⬤</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="terminal-body overflow-y-auto overflow-x-hidden h-full md:h-[80%] 2xl:h-3/4
                    flex flex-col justify-start items-start pt-4 px-8 bg-[var(--bg-color)] pb-16 rounded-b-lg shadow-2xl">
                <Ls />
                {children}
              </div>
            </div>
          </div>
        </div>
        <SpeedInsights />

      </body>
    </html>
  );
}
