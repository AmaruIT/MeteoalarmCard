import * as de from './languages/de.json';
import * as en from './languages/en.json';
import * as fr from './languages/fr.json';
import * as it from './languages/it.json';
import * as nl from './languages/nl.json';
import * as pl from './languages/pl.json';
import * as et from './languages/et.json';
import * as es from './languages/es.json';
import * as sk from './languages/sk.json';
import * as sv from './languages/sv.json';
import * as hr from './languages/hr.json';

const languages: any = {
	en: en,
	de: de,
	nl: nl,
	pl: pl,
	et: et,
	fr: fr,
	it: it,
	es: es,
	hr: hr,
	sk: sk,
	sv: sv
};
export function localize(string: string): string {
	if(string.toLocaleLowerCase() != string) {
		console.warn(`MeteoalarmCard: Recived invalid translation key: ${string}`);
	}
	string = string.toLocaleLowerCase();
	const lang = (localStorage.getItem('selectedLanguage') || navigator.language.split('-')[0]  || 'en').replace(/['"]+/g, '').replace('-', '_');

	let translated: string | undefined = undefined;

	// Try using specified language
	try {
		translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
	}
	catch (e) {
		console.warn(`MeteoalarmCard: Translation for "${string}" is not specified in "${lang}" language.`);
	}
	// Try using english
	if (translated == undefined) {
		try {
			translated = string.split('.').reduce((o, i) => o[i], languages['en']);
		}
		catch (e) {
			console.warn(`MeteoalarmCard: Translation for "${string}" is not specified in fallback english language.`);
		}
	}
	// Fall back to string
	if(translated == undefined) translated = string;
	return translated;
}
