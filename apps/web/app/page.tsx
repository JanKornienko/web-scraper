'use client';

import { Box, Button, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Book = {
	id: number;
	title: string;
	imageUrl: string;
	category: string;
	rating: number;
	price: string;
	description: string;
};

export default function Home() {
	const toast = useToast();
	const [books, setBooks] = useState<Book[]>([]);

	const load = async () => {
		await axios
			.get(process.env.apiUrl + '/load/get-all')
			.then((res) => {
				setBooks(res.data);
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

	return (
		<Box>
			{books.map((book) => (
				<Box key={book.id}>
					<img src={book.imageUrl} alt={book.title} />
					<h1>{book.title}</h1>
					<h2>{book.category}</h2>
					<p>{book.id}</p>
					<p>{book.description}</p>
					<p>{book.price}</p>
					<p>{book.rating}</p>
					<Link href={`/book/${book.id}`}>view</Link>
				</Box>
			))}
		</Box>
	);
}
