import { useState } from "react";
import { useDispatch } from "react-redux";
import { payment } from "../store/actions/action";

export default function ModalPremium() {
	const dispatch = useDispatch();

	const [show, setShow] = useState(false);

	return (
		<form>
			<input type="checkbox" id="modal-premium" className="modal-toggle" />
			<label htmlFor="modal-premium" className="modal cursor-pointer">
				<label className="modal-box relative">
					<div>
						<h1 className="mb-3 text-2xl text-center">PREMIUM</h1>
						<p className="mb-4"> Only Rp 20.000 / month. </p>
					</div>
					<div className="border border-t-[1px]"></div>
					<div className="flex flex-col gap-1 mt-2 justify-center">
						<div className="flex flex-row gap-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 self-center">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4.5 12.75l6 6 9-13.5"
								/>
							</svg>
							<p className="text-center mt-5 mb-3 text-md">
								{" "}
								Initiate a 1-on-1 call with your friend.
							</p>
						</div>
						<div className="flex flex-row gap-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 self-center">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4.5 12.75l6 6 9-13.5"
								/>
							</svg>
							<p className="text-center mt-5 mb-3 text-md">
								{" "}
								Make a group and invite your friend to join!
							</p>
						</div>
						<label
							className="btn bg-[#D7385E] text-slate-200"
							onClick={(e) => {
								e.preventDefault();
								dispatch(payment());
								setShow(false);
							}}>
							AGREE, BUY PREMIUM NOW
						</label>
					</div>
				</label>
			</label>
		</form>
	);
}
