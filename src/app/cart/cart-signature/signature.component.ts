import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from "@angular/core";
import SignaturePad from "signature_pad";
import { BlError, SerializedSignature } from "@boklisten/bl-model";
import ResizeObserver from "resize-observer-polyfill";

@Component({
	selector: "app-cart-signature",
	templateUrl: "./signature.component.html",
	styleUrls: ["./signature.component.scss"],
})
export class CartSignatureComponent
	implements AfterViewInit, OnInit, OnDestroy {
	@ViewChild("signaturePadCanvas") canvasRef: ElementRef<HTMLCanvasElement>;
	@Input() customerName: string;
	@Input() signerName: string | null;
	@Input() isGuardian: boolean;
	@Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();
	typedGuardianName?: string;
	private lastIsValid: boolean = false;
	private signaturePad: SignaturePad;
	private resizeObserver: ResizeObserver;

	ngOnInit() {
		this.isValid.subscribe((val) => (this.lastIsValid = val));
	}

	ngAfterViewInit(): void {
		this.signaturePad = new SignaturePad(this.canvasRef.nativeElement, {
			dotSize: 0.5,
		});
		this.resizeObserver = new ResizeObserver(this.resizeCanvas.bind(this));
		this.resizeObserver.observe(this.canvasRef.nativeElement);
		this.resizeCanvas();
		this.isValid.emit(false);
		this.validate();
	}

	ngOnDestroy() {
		this.resizeObserver.disconnect();
	}

	public getSignatureAsPNGDataURL(): string {
		return this.signaturePad.toDataURL("image/png");
	}

	public getSignatureAsBase64EncodedPNG(): string {
		const dataUrl = this.getSignatureAsPNGDataURL();
		const header = "data:image/png;base64,";
		if (dataUrl.slice(0, header.length) != header) {
			throw new BlError(
				`Unable to parse signature header; '${dataUrl}' does not begin with '${header}'`
			);
		}
		return dataUrl.slice(header.length);
	}

	public getSerializedSignature(): SerializedSignature {
		return {
			id: null,
			base64EncodedImage: this.getSignatureAsBase64EncodedPNG(),
			signingName: this.isGuardian
				? this.typedGuardianName
				: this.signerName,
			signedByGuardian: this.isGuardian,
			creationTime: new Date(),
		};
	}

	public resizeCanvas() {
		const canvas = this.canvasRef.nativeElement;
		const ratio = window.devicePixelRatio;

		const content = this.signaturePad.toData();
		const oldWidth = canvas.width;
		canvas.width = canvas.offsetWidth * ratio;
		canvas.height = canvas.offsetHeight * ratio;
		const scaleFactor = canvas.width / oldWidth;
		const scaleRatio = Math.max(ratio, 1);
		canvas.getContext("2d").scale(scaleRatio, scaleRatio);
		this.signaturePad.fromData(
			content.map((pg) => ({
				...pg,
				points: pg.points.map((p) => ({
					...p,
					x: p.x * scaleFactor,
					y: p.y * scaleFactor,
				})),
			}))
		);
	}

	public clearSignature() {
		this.signaturePad.clear();
		this.validate();
	}

	validate() {
		const trimmedTypedGuardianName = this.typedGuardianName?.trim() ?? "";
		const isTypedNameValid = !(
			this.isGuardian && trimmedTypedGuardianName === ""
		);
		const isSignatureEdited = !this.signaturePad.isEmpty();

		const isValid = isSignatureEdited && isTypedNameValid;
		if (isValid != this.lastIsValid) {
			this.isValid.emit(!this.lastIsValid);
		}
	}
}
