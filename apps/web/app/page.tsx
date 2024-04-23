'use client';

import {
	Box,
	Button,
	useToast,
	Input,
	Select,
	SimpleGrid,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Heading,
	Text,
	Image,
	Flex,
	Grid,
	GridItem,
} from '@chakra-ui/react';
import Link from 'next/link';
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
 * Domovská stránka aplikace, kde se zobrazují všechny knihy.
 * Endpoint: /
 * @returns
 */
export default function Home() {
	const toast = useToast();
	const [books, setBooks] = useState<Book[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [ratingFilter, setRatingFilter] = useState<number | null>(null);
	const [categoryFilter, setCategoryFilter] = useState<string>('');

	/**
	 * Metoda pro získání všech knih a kategorií.
	 * V případě chyby se zobrazí toast s chybovou hláškou.
	 */
	const load = async () => {
		await axios
			.get(process.env.apiUrl + '/load/get-all')
			.then((res) => {
				setBooks(res.data.books);
				setCategories(res.data.categories);
			})
			.catch(() => {
				toast({
					title: 'Books cannot be loaded',
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

	/**
	 * Filtruje knihy podle zadaných parametrů.
	 */
	const filteredBooks = books.filter((book) => {
		const matchesSearchQuery = book.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesRatingFilter = ratingFilter
			? book.rating >= ratingFilter
			: true;
		const matchesCategoryFilter = categoryFilter
			? book.category === categoryFilter
			: true;
		return matchesSearchQuery && matchesRatingFilter && matchesCategoryFilter;
	});

	return (
		<Box>
			<Grid templateColumns="repeat(5, 1fr)" gap={4} mb={10}>
				<GridItem colSpan={3}>
					<Input
						placeholder="Search by title"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</GridItem>
				<GridItem colSpan={1}>
					<Select
						placeholder="Filter by rating"
						value={ratingFilter || ''}
						onChange={(e) => setRatingFilter(parseInt(e.target.value))}
					>
						<option value={1}>1 Star</option>
						<option value={2}>2 Stars</option>
						<option value={3}>3 Stars</option>
						<option value={4}>4 Stars</option>
						<option value={5}>5 Stars</option>
					</Select>
				</GridItem>
				<GridItem colSpan={1}>
					<Select
						placeholder="Filter by category"
						value={categoryFilter || ''}
						onChange={(e) => setCategoryFilter(e.target.value)}
					>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</Select>
				</GridItem>
			</Grid>
			<SimpleGrid columns={3} spacing={10}>
				{filteredBooks.map((book) => (
					<Card key={book.id}>
						<CardHeader as={Flex} justify="center">
							<Image
								h={96}
								objectFit="cover"
								src={book.imageUrl}
								alt={book.title}
							/>
						</CardHeader>
						<CardBody>
							<Heading size="lg" mb={4}>
								{book.title}
							</Heading>
							<Flex direction="row" justify="space-between">
								<Text fontSize="lg">{book.category}</Text>
								<Text fontSize="lg">{book.price}</Text>
							</Flex>
						</CardBody>
						<CardFooter as={Flex} justify="space-between">
							<Button
								as={Link}
								href={`/book/${book.id}`}
								variant="solid"
								colorScheme="blue"
							>
								View
							</Button>
							<Flex align="center">
								{[...Array(book.rating)].map((_, i) => (
									<Star key={i} h={6} w={6} color="#FFCD3C" />
								))}
							</Flex>
						</CardFooter>
					</Card>
				))}
			</SimpleGrid>
			{filteredBooks.length === 0 && (
				<Text textAlign="center">No books found</Text>
			)}
		</Box>
	);
}
