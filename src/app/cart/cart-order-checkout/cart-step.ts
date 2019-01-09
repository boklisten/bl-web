export type CartStep = {
	type:
		| "agreement"
		| "delivery"
		| "checkout"
		| "payment-option"
		| "payment"
		| "confirm";
	confirmed: boolean;
};
