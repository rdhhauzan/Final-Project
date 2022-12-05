import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../store/actions/action";

export default function Register() {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const [registerForm, setRegisterForm] = useState({
		username: "",
		email: "",
		password: "",
		dob: "01/01/1970",
		domisili: "Jakarta",
		gender: "",
	});

	const genders = ["FEMALE", "MALE", "DISCLOSED	"];

	const handleChange = (e) => {
		let { name, value } = e.target;

		setRegisterForm({
			...registerForm,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(registerForm, "ini form ");
		dispatch(register(registerForm))
			.then(() => {
				console.log("registered");
				navigation("/");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="flex w-full min-h-screen justify-center items-center font-poppins">
			<div className="flex justify-center flex-col px-8 py-5 w-full h-content shadow-lg bg-[#2A302F] max-w-sm">
				<form onSubmit={handleSubmit}>
					<div className="flex justify-center font-bold text-2xl mb-5">
						<h1> REGISTER</h1>
					</div>
					<div className="form-group mb-6">
						<label
							className="absolute px-2 form-label inline-block text-xs mb-2 uppercase text-slate-900"
							htmlFor="username">
							USERNAME
						</label>
						<input
							type="text"
							name="username"
							value={registerForm.username}
							onChange={handleChange}
							className="form-control block w-full px-3 py-2.5 text-gray-700 text-ellipsis bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm"
						/>
					</div>
					<div className="form-group mb-6">
						<label className="absolute px-2 form-label inline-block text-xs mb-2 text-slate-900">
							EMAIL ADDRESS
						</label>
						<input
							type="email"
							name="email"
							value={registerForm.email}
							onChange={handleChange}
							className="form-control block w-full px-3 py-2.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xs"
						/>
					</div>
					<div className="form-group mb-6">
						<label className="absolute px-2 form-label inline-block text-xs mb-2 text-slate-900">
							PASSWORD
						</label>
						<input
							type="password"
							name="password"
							value={registerForm.password}
							onChange={handleChange}
							className="form-control block w-full px-3 py-2.5 bg-white bg-clip-padding text-slate-900 border border-solid border-gray-300 rounded-sm"
						/>
					</div>
					<div className="form-group flex flex-col mb-6 gap-2">
						<div className="flex flex-">
							<label className="form-label inline-block text-xs mb-2 text-slate-100">
								GENDER
							</label>
						</div>
						<div className="flex flex-row gap-5">
							{genders.map((gender) => {
								return (
									<div className="flex flex-row gap-2">
										<input
											type="radio"
											name="gender"
											onChange={handleChange}
											value={registerForm.gender}
											className="radio checked:bg-[#D7385E]"
											checked
										/>
										<label className="flex text-xs self-center">{gender}</label>
									</div>
								);
							})}
						</div>
					</div>
					<div className="flex justify-center">
						<button
							type="submit"
							className="btn btn-wide bg-[#D7385E] text-slate-200 rounded-sm">
							Submit
						</button>
					</div>
				</form>
				<div className="pt-5">
					<p className="text-sm">OR YOU CAN REGISTER USING GOOGLE</p>
					<div className="flex justify-center pt-5">
						<button
							type="submit"
							className="btn btn-wide bg-[#D7385E] text-slate-200 rounded-sm">
							CERITANYA GOOGLE LOGIN
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
