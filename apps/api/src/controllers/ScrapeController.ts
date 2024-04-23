import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

/**
 * Toto je kontroler pro scrapování dat z webové stránky https://books.toscrape.com/.
 */

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
 * Metoda pro získání dat z webové stránky.
 * Data se získávají pomocí knihovny axios, která umožňuje získání HTML stránky.
 *
 * @param endpoint
 * @returns
 */
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

/**
 * Metoda pro získání kategorií knih.
 * Kategorie se ukládají do JSON souboru.
 * Kategorie se používají pro filtrování knih na frontendu.
 */
async function getCategories() {
	try {
		const categories: string[] = [];
		const $ = await getData('page-1.html');

		$('ul.nav-list > li > ul > li > a').each((i, category) => {
			const categoryName = $(category).text();

			categories.push(categoryName.trim().replace(/\s+/g, ' '));
		});

		console.log(categories);

		fs.writeFileSync(
			'generatedData/categories.json',
			JSON.stringify(categories)
		);
	} catch (e) {
		throw e;
	}
}

/**
 * Metoda pro získání odkazů na jednotlivé knihy.
 * Odkazy se ukládají do pole, které se dále používá pro získání jednotlivých knih.
 * Odkazy se získávají rekurzivně, dokud existuje další stránka s knihami.
 * @param endpoint
 * @param links
 * @returns
 */
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

/**
 * Metoda pro získání knih z odkazů.
 * Knihy se ukládají do JSON souboru.
 * @param links
 * @returns
 */
async function getBooks(links: string[]) {
	try {
		const books: Book[] = [];
		let index: number = 1;

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
				const id = index;

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

				console.log(index);
				index++;

				if (imageUrl) {
					books.push({
						id,
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

/**
 * Metoda pro scrapování dat z webové stránky https://books.toscrape.com/.
 * Volají se zde jednotlivé metody pro získání kategorií, odkazů na jednotlivé knihy a samotných knih.
 * @param req
 * @param res
 */
export const create = async (req: Request, res: Response) => {
	try {
		await getCategories();
		const links = await getLinks();
		await getBooks(links);

		res.status(201).end();
	} catch (e: any) {
		const status = e.response ? e.response.status : 500;

		res.status(status).json(e);
	}
};
