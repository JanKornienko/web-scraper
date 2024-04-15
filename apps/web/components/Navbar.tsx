import { Flex, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

export default function Navbar() {
	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'Scrape', href: '/scrape' },
	];
	return (
		<Flex p={4} gap={4} justify="center">
			{links.map(({ name, href }) => (
				<ChakraLink as={Link} key={name} href={href}>
					{name}
				</ChakraLink>
			))}
		</Flex>
	);
}
