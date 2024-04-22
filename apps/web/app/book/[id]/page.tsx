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

export default function Book({ params }: { params: { id: string } }) {
	const toast = useToast();
	const [book, setBook] = useState<Book | null>(null);

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
				<h1>{book.title}</h1>
				<img src={book.imageUrl} alt={book.title} />
				<p>Category: {book.category}</p>
				<p>Description: {book.description}</p>
				<p>Price: {book.price}</p>
				<p>Rating: {book.rating}</p>
			</Box>
		);
	}
}
