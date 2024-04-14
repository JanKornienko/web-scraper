import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

type Books = {
	[key: string]: string;
};

export const create = async (req: Request, res: Response) => {
	try {
		const url = 'https://books.toscrape.com/index.html';
		const books: Books = {};

		const { data: response } = await axios.get(url);
		const $ = cheerio.load(response);

		const $data = $('section > div > ol > li').each((i, book) => {
			const title = $(book).find('h3 > a').attr('title');
			const price = $(book).find('p.price_color').text();

			if (title) {
				books[title] = price;
			}

			fs.writeFileSync('books.json', JSON.stringify(books));
		});

		res.status(201).json(books);
	} catch (e: any) {
		const status = e.response ? e.response.status : 500;
		res.status(status).json(e);
	}
};
