import { imdb } from './imdb';
import { SocialMedia } from './SocialMedia';
import { rottenTomatoes } from './rottenTomatoes';
import ObjectID from 'node_modules/bson-objectid/objectid'
export interface movies{
	id: string;
    title: string;
	year: number;
	runtime: string;
	cast: string[];
	poster: string;
	plot: string;
	nowShowing:boolean;
	directors: string[];
	countries: string[];
	genres: string[];
	languages: string[];
	rated: string;
	imdb: imdb;
	tomatoes: rottenTomatoes;
	social_media: SocialMedia;
}
