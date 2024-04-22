import { Request, Response } from 'express';
import * as fs from 'fs';

type Book = {
	id: number;
	title: string;
	imageUrl: string;
	category: string;
	rating: number;
	price: string;
	description: string;
};

export const getAll = async (req: Request, res: Response) => {
	try {
		const books = await fs.readFileSync('generatedData/books.json', 'utf8');
		const categories = await fs.readFileSync(
			'generatedData/categories.json',
			'utf8'
		);

		if (!categories) {
			res.status(404).json({ message: 'No categories found' });
		}

		if (!books) {
			res.status(404).json({ message: 'No books found' });
		}

		res
			.status(200)
			.json({ books: JSON.parse(books), categories: JSON.parse(categories) });
	} catch (e: any) {
		const status = e.response ? e.response.status : 500;
		res.status(status).json(e);
	}
};

export const getBook = async (req: Request, res: Response) => {
	try {
		const books = await fs.readFileSync('generatedData/books.json', 'utf8');
		const book = JSON.parse(books).find(
			(book: Book) => book.id === parseInt(req.params.id)
		);

		if (!book) {
			res.status(404).json({ message: 'Book not found' });
		}

		res.status(200).json(book);
	} catch (e: any) {
		const status = e.response ? e.response.status : 500;
		res.status(status).json(e);
	}
};
