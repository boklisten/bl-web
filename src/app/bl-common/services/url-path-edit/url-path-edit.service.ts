import { Injectable } from "@angular/core";

/**
 * UrlWord = Some_sentence_or_word
 * Regular word = Some sentence or word
 */
@Injectable({
	providedIn: "root"
})
export class UrlPathEditService {
	constructor() {}

	public sentenceToUrlWords(sentence: string): string {
		return sentence.replace(" ", "_");
	}

	public urlWordsToSentence(urlWords: string[]): string[] {
		return urlWords.map(urlWord => {
			return this.urlWordToWord(urlWord);
		});
	}

	public urlWordToWord(urlWord: string): string {
		return urlWord.replace("_", " ");
	}
}
