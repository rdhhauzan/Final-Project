import { useDispatch } from "react-redux";
import { payment } from "../store/actions/action";

export default function PremiumCard() {
	const dispatch = useDispatch();

	return (
		<div className="flex flex-col items-center justify-center bg-[#262525] shadow-md shadow-black rounded-sm">
			<p className="text-lg mt-3 mx-3">
				{" "}
				Be a premium member to form a group!{" "}
			</p>
			<button
				className="btn btn-sm mx-1 rounded-full bg-[#D7385E] hover:scale-105 text-slate-200 font-normal my-2 text-sm"
				onClick={(e) => {
					e.preventDefault();
					dispatch(payment());
				}}>
				Go Premium
			</button>
		</div>
	);
}
