// app/layout.tsx
// Note: The file extension is now .tsx

import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import QueryProvider from '../components/QueryProvider';
import { ReactNode } from 'react'; // Import ReactNode

export const metadata = {
  title: 'E-commerce Product Listing',
  description: 'A responsive e-commerce product listing page built with Next.js and Tailwind CSS.',
};

// Define the type for the props of RootLayout
interface RootLayoutProps {
  children: ReactNode; // children prop will be of type ReactNode
}

// Use the defined interface for the component props
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans antialiased">
        <QueryProvider>
          <Header />
          <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}