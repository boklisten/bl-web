export type CartStep = {
	type:
		| "agreement"
		| "delivery"
		| "checkout"
		| "partly-payment-info"
		| "payment-option"
		| "payment"
		| "confirm";
	confirmed: boolean;
};
