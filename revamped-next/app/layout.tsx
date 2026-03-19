import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: 'Cozy Rooms in Kaakdeo, Kanpur | Hostel & PG for Students & Professionals',
  description:
    'Find cozy hostel and PG rooms in Kaakdeo, Kanpur, Uttar Pradesh for students and working professionals. Available rooms, price, amenities, and resident reviews.',
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

