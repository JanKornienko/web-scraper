import type { Metadata } from 'next';
import { Providers } from './providers';
import { Inter } from 'next/font/google';
import { Container } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Web Scraper',
	description: 'Web scrapping books from an e-shop',
};

/**
 * Layout stránka, která se používá pro základní layout všech stránek aplikace.
 * @param children
 * @returns
 */
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<Navbar />
					<Container maxW="container.lg">{children}</Container>
				</Providers>
			</body>
		</html>
	);
}
