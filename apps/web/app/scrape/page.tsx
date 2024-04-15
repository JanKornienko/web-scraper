'use client';

import { Flex, Heading, Text, Button, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';

export default function Scrape() {
	const toast = useToast();
	const [loading, setLoading] = useState(false);

	const onClick = async () => {
		setLoading(true);
		toast({
			title: 'Scraping data...',
			status: 'loading',
			position: 'top-right',
			duration: null,
			isClosable: false,
		});

		await axios
			.post('http://localhost:3001/create')
			.then(() => {
				setLoading(false);
				toast.closeAll();

				toast({
					title: 'Data scraped successfully',
					status: 'success',
					position: 'top-right',
					duration: 5000,
					isClosable: true,
				});
			})
			.catch((e) => {
				console.log('fe: ', e);
				setLoading(false);
				toast.closeAll();

				toast({
					title: 'Something went wrong',
					status: 'error',
					position: 'top-right',
					duration: 5000,
					isClosable: true,
				});
			});
	};

	return (
		<Flex align="center" direction="column" mt={40}>
			<Heading as="h1" mb={4}>
				Re-scrape data
			</Heading>
			<Text w={80} mb={16}>
				The data displayed on the page takes information from&nbsp;
				<Link href="https://books.toscrape.com/">
					https://books.toscrape.com/
				</Link>
				. This information must be stored in a json file. Please click below to
				save the data again.
			</Text>
			<Button
				isLoading={loading}
				size="lg"
				colorScheme="blue"
				onClick={onClick}
			>
				Scrape data
			</Button>
		</Flex>
	);
}
