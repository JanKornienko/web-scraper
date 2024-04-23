'use client';

import { Box, Image, Heading, Text, Flex, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Star } from '@/components/Icons';

type Book = {
	id: number;
	title: string;
	imageUrl: string;
	category: string;
	rating: number;
	price: string;
	description: string;
};

/**
 * Stránka, kde se zobrazuje detail knihy.
 * Endpoint: /book/[id]
 * @param params
 * @returns
 */
export default function Book({ params }: { params: { id: string } }) {
	const toast = useToast();
	const [book, setBook] = useState<Book | null>(null);

	/**
	 * Metoda pro získání knihy podle id.
	 * V případě chyby se zobrazí toast s chybovou hláškou.
	 */
	const load = async () => {
		await axios
			.get(process.env.apiUrl + `/load/get-book/${params.id}`)
			.then((res) => {
				setBook(res.data);
			})
			.catch(() => {
				toast({
					title: 'Book cannot be loaded',
					status: 'error',
					position: 'top-right',
					duration: 5000,
					isClosable: true,
				});
			});
	};

	useEffect(() => {
		load();
	}, []);

	if (book !== null) {
		return (
			<Box>
				<Flex justify="space-between" gap={10} mb={10}>
					<Image src={book.imageUrl} alt={book.title} />
					<Flex direction="column" justify="space-between" textAlign="end">
						<Flex direction="column" align="flex-end" gap={4}>
							<Heading size="xl">{book.title}</Heading>
							<Heading size="md">{book.category}</Heading>
							<Flex align="center">
								{[...Array(book.rating)].map((_, i) => (
									<Star key={i} h={6} w={6} color="#FFCD3C" />
								))}
							</Flex>
						</Flex>
						<Heading size="lg">{book.price}</Heading>
					</Flex>
				</Flex>
				<Heading size="lg" mb={2}>
					Description
				</Heading>
				<Text fontSize="lg">{book.description}</Text>
			</Box>
		);
	}
}
