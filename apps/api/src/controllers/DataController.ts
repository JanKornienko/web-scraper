import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

type Books = {
	title: string;
	imageUrl: string;
	category: string;
	rating: number;
	price: string;
	description: string;
};

async function getData(endpoint: string) {
	try {
		const baseUrl = 'https://books.toscrape.com/catalogue/';

		const { data: response } = await axios.get(baseUrl + endpoint);
		const $ = cheerio.load(response);

		return $;
	} catch (e) {
		throw e;
	}
}

async function getLinks(
	endpoint: string = 'page-1.html',
	links: string[] = []
) {
	try {
		console.log(endpoint);
		const $ = await getData(endpoint);

		$('section > div > ol > li').each((i, book) => {
			const link = $(book).find('h3 > a').attr('href');

			if (link) {
				links.push(link);
			}
		});

		const nextEndpoint: string = $('ul.pager > li.next > a').attr('href') || '';

		if (nextEndpoint === '') {
			return links;
		} else {
			return getLinks(nextEndpoint, links);
		}
	} catch (e) {
		throw e;
	}
}

async function getBooks(links: string[]) {
	try {
		const books: Books[] = [];
		let id: number = 0;

		await Promise.all(
			links.map(async (link) => {
				const $ = await getData(link);
				let rating: number = 0;

				const title = $('div.product_main > h1').text();
				const imageUrl = $('div.item > img')
					.attr('src')
					?.replace('../..', 'https://books.toscrape.com');
				const price = $('div.product_main > p.price_color').text();
				const category = $('ul.breadcrumb > li:nth-child(3) > a').text();
				const description = $('article.product_page > p').text();

				switch ($('p.star-rating').attr('class')?.split(' ')[1]) {
					case 'One':
						rating = 1;
						break;
					case 'Two':
						rating = 2;
						break;
					case 'Three':
						rating = 3;
						break;
					case 'Four':
						rating = 4;
						break;
					case 'Five':
						rating = 5;
						break;
					default:
						rating = 0;
						break;
				}

				console.log(id);
				id++;

				if (imageUrl) {
					books.push({
						title,
						imageUrl,
						price,
						category,
						description,
						rating,
					});
				}
			})
		);

		fs.writeFileSync('generatedData/books.json', JSON.stringify(books));
		return books;
	} catch (e) {
		throw e;
	}
}

export const create = async (req: Request, res: Response) => {
	try {
		const links = await getLinks();
		const books = await getBooks(links);

		res.status(201).json(books);
	} catch (e: any) {
		const status = e.response ? e.response.status : 500;
		res.status(status).json(e);
	}
};

export const load = async (req: Request, res: Response) => {}