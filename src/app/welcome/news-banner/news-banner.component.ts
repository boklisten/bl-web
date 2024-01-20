import { Component, OnInit } from "@angular/core";
import { EditableText } from "@boklisten/bl-model";
import { EditableTextService } from "@boklisten/bl-connect";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
	selector: "app-news-banner",
	templateUrl: "./news-banner.component.html",
	styleUrls: ["./news-banner.component.scss"],
})
export class NewsBannerComponent implements OnInit {
	public content: SafeHtml | null;

	constructor(
		private _editableTextService: EditableTextService,
		private _domSanitizer: DomSanitizer
	) {}

	ngOnInit() {
		this._editableTextService
			.getEditableText(EditableTextService.editableTextIds.newsBanner)
			.then((editableText: EditableText) => {
				this.content =
					editableText == null || editableText?.text == ""
						? null
						: this.sanitize(editableText.text);
			});
	}

	private sanitize(unsafe: string): SafeHtml {
		return this._domSanitizer.bypassSecurityTrustHtml(unsafe);
	}
}
