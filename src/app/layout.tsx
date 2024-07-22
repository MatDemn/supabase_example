import "@/styles/globals.css";

import { Roboto } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Typeracer app",
  description:
    "Challenge yourself in typing competition against other players!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const roboto = Roboto({
  weight: "400",
  style: "normal",
  display: "swap",
  subsets: ["latin"],
  variable: "--roboto-font",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${roboto.className}`}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
