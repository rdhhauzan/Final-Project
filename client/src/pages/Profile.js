export default function Profile() {
	return (
		<div className="flex xl:flex-row sm:flex-col w-full min-h-screen">
			<div className="flex xl:flex-row sm:flex-col gap-10 w-screen h-content sm:py-5 px-5">
				<div className="flex flex-col w-full basis-1/4">
					<div className="flex mt-10 xl:justify-center sm:mx-5">
						<img
							src="https://i.imgur.com/LzMZywV.png"
							className="w-40 h-40 rounded-full"></img>
					</div>
					<div className="flex mt-5 xl:justify-center sm:mx-10">
						<p className="text-[#F8EFD4]">
							<strong>@adminbwang</strong>
						</p>
					</div>
					<div className="flex mt-3 xl:justify-center sm:mx-10">
						<button className="btn bg-[#D7385E] text-[#F8EFD4]">
							{" "}
							Edit Profile
						</button>
					</div>
				</div>
				<div className="flex flex-col w-full basis-1/2 gap-3">
					<div className="card w-full bg-[#1C2120] rounded border border-white flex justify-center">
						<div className="card-body text-start">
							<h2 className="card-title">@adminbwang</h2>
							<p>KelazzZzZzzz digendong @adminjugabwang!</p>
							<figure className="pt-5">
								<img
									src="https://placeimg.com/400/225/arch"
									alt="Shoes"
									className="rounded-xl w-full"
								/>
							</figure>
						</div>
					</div>
					<div className="card w-full bg-[#1C2120] rounded border border-white flex justify-center">
						<div className="card-body text-start">
							<h2 className="card-title">@adminbwang</h2>
							<p>Main apa hari ini ges?</p>
							<figure className="pt-5">
								<img
									src="https://placeimg.com/400/225/arch"
									alt="Shoes"
									className="rounded-xl w-full"
								/>
							</figure>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-full basis-1/4 gap-3">
					<div className="card w-full bg-[#2A302F] rounded flex justify-center">
						<div className="card-body items-center text-center">
							<h2 className="card-title">Mobile Legends</h2>
						</div>
					</div>
					<div className="card w-full bg-[#2A302F] rounded flex justify-center">
						<figure className="px-10 pt-10">
							<img
								src="https://placeimg.com/400/225/arch"
								alt="Shoes"
								className="rounded-xl"
							/>
						</figure>
						<div className="card-body items-center text-center">
							<h2 className="card-title">Apex Legends</h2>
							<p>
								{" "}
								Ceritanya ini deskripsi. Tapi ga mau pake lorem ipsum hehe.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
