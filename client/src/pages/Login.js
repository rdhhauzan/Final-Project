export default function Login() {
	return (
		<div className="flex w-full min-h-screen justify-center items-center">
			<div className="flex justify-center flex-col block px-8 pt-8 pb-10 w-80 h-content shadow-lg bg-[#2A302F] max-w-sm">
				<form>
					<div className="flex justify-center font-bold text-2xl mb-5">
						<h1> LOGIN </h1>
					</div>
					<div className="form-group mb-6">
						<label className="absolute px-2 form-label inline-block text-sm mb-2 text-slate-900">
							EMAIL ADDRESS
						</label>
						<input
							type="email"
							className="form-control block w-full px-3 py-1.5 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm"
						/>
					</div>
					<div className="form-group mb-6">
						<label
							for="exampleInputPassword1"
							className="absolute px-2 form-label inline-block text-sm mb-2 text-slate-900">
							PASSWORD
						</label>
						<input
							type="password"
							className="form-control block w-full px-3 py-1.5 bg-white bg-clip-padding text-slate-900 border border-solid border-gray-300 rounded-sm"
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
			</div>
		</div>
	);
}
