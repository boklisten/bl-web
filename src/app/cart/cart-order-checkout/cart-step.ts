export type CartStep = {
	type: "agreement" | "delivery" | "checkout" | "payment" | "confirm";
	confirmed: boolean;
};
