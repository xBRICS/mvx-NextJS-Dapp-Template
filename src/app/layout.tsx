import '../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DynamoDAO',
  description: 'A revolutionary DeFi ecosystem with stable, asset-backed digital currency',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="overflow-x-hidden">
        {children}
        <div id="modal-root" className="relative z-50" />
      </body>
    </html>
  );
}
