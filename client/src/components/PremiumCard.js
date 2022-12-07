import { useState } from "react";
import ModalPremium from "../pages/ModalPremium";

export default function PremiumCard() {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);

	return (
		<div className="flex flex-col items-center justify-center bg-[#262525] shadow-md shadow-black rounded-sm">
			<p className="text-lg mt-3 mx-3">
				{" "}
				Be a premium member to form a group!{" "}
			</p>
			<label
				htmlFor="modal-premium"
				className="btn mb-3 rounded-full bg-[#D7385E] text-slate-200"
				onClick={handleShow}>
				Go Premium
			</label>
			<ModalPremium />
		</div>
	);
}
