import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatePickerComponent } from "./date-picker/date-picker.component";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
	declarations: [DatePickerComponent],
	imports: [CommonModule, FormsModule, FontAwesomeModule],
	exports: [DatePickerComponent]
})
export class DateModule {}
