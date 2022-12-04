export default function Register() {
	return (
		<div className="flex w-full min-h-screen justify-center items-center font-poppins">
			<div className="flex justify-center flex-col px-8 py-5 w-90 h-content shadow-lg bg-[#2A302F] max-w-sm">
				<form>
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
							className="form-control block w-full px-3 py-2.5 text-gray-700 text-ellipsis bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm"
						/>
					</div>
					<div className="form-group mb-6">
						<label className="absolute px-2 form-label inline-block text-xs mb-2 text-slate-900">
							EMAIL ADDRESS
						</label>
						<input
							type="email"
							className="form-control block w-full px-3 py-2.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xs"
						/>
					</div>
					<div className="form-group mb-6">
						<label
							for="exampleInputPassword1"
							className="absolute px-2 form-label inline-block text-xs mb-2 text-slate-900">
							PASSWORD
						</label>
						<input
							type="password"
							className="form-control block w-full px-3 py-2.5 bg-white bg-clip-padding text-slate-900 border border-solid border-gray-300 rounded-sm"
						/>
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
