import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "app-match-questions",
	templateUrl: "./match-questions.component.html",
	styleUrls: ["./match-questions.component.scss"],
})
export class MatchQuestionsComponent implements OnInit {
	constructor(private modalService: NgbModal) {}

	ngOnInit() {}

	open(content) {
		this.modalService.open(content).result.then(
			(result) => {},
			(reason) => {}
		);
	}
}
