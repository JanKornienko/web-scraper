'use client';

import { ChakraProvider } from '@chakra-ui/react';

/**
 * Metoda pro poskytnutí všech providerů potřebných pro fungování aplikace.
 * @param children
 * @returns
 */
export function Providers({ children }: { children: React.ReactNode }) {
	return <ChakraProvider>{children}</ChakraProvider>;
}
