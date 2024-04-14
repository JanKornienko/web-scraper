import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

type Books = {
	[key: string]: string;
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
			console.log(nextEndpoint);
			return getLinks(nextEndpoint, links);
		}
	} catch (e) {
		throw e;
	}
}

export const create = async (req: Request, res: Response) => {
	try {
		const links = await getLinks();

		res.status(201).json(links);
	} catch (e: any) {
		const status = e.response ? e.response.status : 500;
		res.status(status).json(e);
	}
};
