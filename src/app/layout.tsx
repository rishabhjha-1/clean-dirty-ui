import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'User Dashboard - CleanDirty',
  description: 'Track your favorite stories on CleanDirty.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 dark:bg-custom-gradient">
        <main className="flex flex-col items-center w-full min-h-screen">
          <header className="bg-blue-600 w-full p-4 dark:text-white text-center font-bold text-2xl">
            CleanDirty User Dashboard
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
