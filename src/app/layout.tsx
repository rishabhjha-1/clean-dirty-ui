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
        <header className="bg-gradient-to-r from-violet-950 via-violet-800 to-blue-700  w-full p-6 sm:p-8 shadow-lg dark:text-white text-center font-bold text-3xl sm:text-4xl flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/000/395/417/original/modern-company-logo-design-vector.jpg" // replace with your logo's path
                alt="CleanDirty Logo"
                className="h-10 sm:h-12 object-contain"
              />
              <h1 className="tracking-wide text-white">CleanDirty User Dashboard</h1>
            </div>
            {/* Subtext */}
            <p className="text-sm sm:text-base mt-2 text-gray-200 hidden sm:block">Track and manage your favorite stories with ease</p>
          </header>
          {children}
        </main>

        <footer className="w-full bg-gray-200 dark:bg-gray-900 p-4 text-center text-sm text-gray-600 dark:text-gray-300 mt-8">
            <p>© 2024 CleanDirty. All Rights Reserved.</p>
          </footer>
      </body>
    </html>
  );
}
