import * as express from 'express';
import { ScrapeController, LoadController } from '../controllers/index';

/**
 * Toto je soubor s routováním API serveru, určuje jednotlivé endpointy, pomocí kterých se volají jednotlivé metody kontrolerů.
 * Metody kontrolerů jsou volány pomocí HTTP metod (GET, POST), které jsou definovány v tomto souboru.
 * Metody určují funkce, které se mají vykonat při volání daného endpointu.
 * Kontrolery jsou vždy importovány z adresáře controllers/index.ts, kde se nachází export všech kontrolerů.
 */

const api = express.Router();

api.post('/scrape/create', ScrapeController.create); // POST metoda pro scrapování dat
api.get('/load/get-all', LoadController.getAll); // GET metoda pro získání všech knih uložených v json souboru
api.get('/load/get-book/:id', LoadController.getBook); // GET metoda pro získání specifické knihy podle id

export default api;
