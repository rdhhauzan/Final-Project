import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  editUser,
  editUserGame,
  fetchGames,
  fetchUserById,
} from "../store/actions/action";
export default function Profile() {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");
  const [clicked, setClicked] = useState(false);
  const [modalClick, setModalClick] = useState(false);
  const { userDetail, games } = useSelector((state) => state);
  const [form, setForm] = useState({
    username: userDetail?.user?.username,
    password: "",
    domisili: userDetail?.user?.domisili,
    image: "",
  });

  const [editGame, setEditGame] = useState({
    rank: "",
    role: "",
    matchType: "",
    aboutMe: "",
  });

  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(fetchGames);
    // eslint-disable-next-line
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("domisili", form.domisili);
    if (form.image) formData.append("image", form.image);
    dispatch(editUser(formData, userDetail?.user?.id));
    setClicked(false);
  };

  const onChangeHandler = (event) => {
    let { name, value } = event.target;
    if (name === "image") {
      let image = event.target.files[0];
      value = image;
    }
    setForm({ ...form, [name]: value });
  };

  const onChangeModal = (event) => {
    let { name, value } = event.target;
    setEditGame({ ...editGame, [name]: value });
  };

  const onSubmitModal = (gameId) => {
    dispatch(editUserGame(editGame, gameId));
    dispatch(fetchUserById(id));
    setModalClick(false);
  };

  return (
    <div className="flex xl:flex-row 2xs:flex-col text-slate-200 xl:w-full xl:min-h-screen font-poppins">
      <Link
        to="/home"
        className="flex flex-row gap-2 fixed p-5 text-xl hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="flex justify-center self-center w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <p className="mb-1">Home</p>
      </Link>
      <div className="flex xl:flex-row 2xs:flex-col xl:gap-10 w-screen h-content 2xs:py-5 xl:px-5 2xs:px-2">
        {clicked ? (
          <form
            className="flex flex-col w-full basis-1/4 transition-all"
            enctype="multipart/form-data"
            onSubmit={onSubmitHandler}
          >
            <div className="flex mt-10 justify-center">
              <label
                className="w-40 h-40 rounded-full absolute hover:bg-black hover:bg-opacity-75 opacity-0 hover:opacity-100 flex justify-center items-center hover:border-white btn"
                htmlFor="upload"
              >
                <div className="flex flex-col">Icon</div>
              </label>
              <input
                id="upload"
                type="file"
                className="hidden"
                name="image"
                onChange={onChangeHandler}
              />
              <img
                src={userDetail?.user?.profPict}
                className="w-40 h-40 rounded-full"
                alt="placeholder profile"
              ></img>
            </div>
            <div className="flex mt-5 justify-center">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col text-center">
                  <label htmlFor="username">Username</label>
                  <input
                    type="username"
                    className="rounded-md"
                    name="username"
                    value={form.username}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="flex flex-col text-center">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="rounded-md"
                    name="password"
                    value={form.password}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="flex flex-col text-center">
                  <label htmlFor="domisili">Domicile</label>
                  <input
                    type="text"
                    className="rounded-md"
                    name="domisili"
                    value={form.domisili}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="flex flex-row justify-between">
                  <div className="h-full">
                    <button
                      className="btn-sm btn-outline border border-red-500  rounded-lg text-red-500 hover:text-white hover:border-red-500 hover:bg-red-500 transition-all m-2"
                      onClick={() => {
                        setClicked(false);
                      }}
                    >
                      cancel
                    </button>
                  </div>
                  <div className="h-full">
                    <button
                      className="btn-sm btn-outline border border-sky-400 rounded-lg text-sky-400 hover:text-white hover:border-sky-400 hover:bg-sky-400 transition-all m-2"
                      type="submit"
                    >
                      done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex flex-col w-full basis-1/4 transition-all">
            <div className="flex mt-10 justify-center">
              <img
                src={userDetail?.user?.profPict}
                className="w-40 h-40 rounded-full"
                alt="placeholder profile"
              ></img>
            </div>
            <div className="flex mt-5 justify-center">
              <p>
                <strong>@{userDetail?.user?.username}</strong>
              </p>
            </div>
            <div className="flex mt-3 justify-center">
              <button
                className="btn rounded-full bg-[#D7385E] text-[#F8EFD4]"
                onClick={() => setClicked(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col w-full basis-1/2 gap-3 xl:mt-0 md:mt-4">
          {userDetail?.user?.Posts.map((post) => {
            return (
              <div className="card w-full bg-primary rounded shadow-xl shadow-black flex justify-center">
                <div className="card-body text-start">
                  <h2 className="card-title">@{userDetail?.user?.username}</h2>
                  <p>{post.content}</p>
                  <figure className="pt-5">
                    <img
                      src={post.imgUrl}
                      alt="Shoes"
                      className="rounded-xl w-full"
                    />
                  </figure>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col xl:mt-0 2xs:mt-4 w-full basis-1/4 gap-5">
          {userDetail?.user?.UserGames.map((game) => {
            return (
              <div
                className="card xl:w-96 md:w-full h-auto flex justify-center"
                key={game.id}
              >
                <label
                  htmlFor={game.id}
                  className="btn bg-primary hover:bg-primary hover:border-primary border-primary hover:scale-105 w-fit h-fit hover:bg-none"
                >
                  <img src={game.Game.imgUrl} />
                </label>
                <input type="checkbox" id={game.id} className="modal-toggle" />
                <label
                  className="bg-black flex flex-col items-center bg-opacity-90 h-auto modal"
                  htmlFor={game.id}
                >
                  <label
                    className="modal-box relative flex flex-col gap-5"
                    htmlFor=""
                  >
                    <div className="flex flex-row justify-center border-b border-gray-600 pb-2">
                      <p className="text-slate-300 text-lg font-semibold">
                        {userDetail.user.username}'s {game.Game.name} profile
                      </p>
                    </div>
                    {modalClick ? (
                      <form className="flex flex-col gap-3">
                        <div className="flex flex-row w-full justify-around">
                          <div>
                            <p className="text-slate-300 text-sm text-center font-semibold">
                              Rank
                            </p>
                            <select
                              className="text-sm rounded-sm  bg-[#20252e]"
                              onChange={onChangeModal}
                              name="rank"
                              value={editGame.rank}
                            >
                              {game.Game.rankList.map((rank, index) => {
                                return <option value={index}>{rank}</option>;
                              })}
                            </select>
                          </div>
                          <div>
                            <p className="text-slate-300 text-sm text-center font-semibold">
                              Type
                            </p>
                            <select
                              className="text-sm rounded-sm  bg-[#20252e]"
                              onChange={onChangeModal}
                              name="matchType"
                              value={editGame.matchType}
                            >
                              <option value="Competitive">Competitive</option>
                              <option value="Casual">Casual</option>
                            </select>
                          </div>

                          <div className="">
                            <p className="text-slate-300 text-sm text-center font-semibold">
                              Role
                            </p>
                            <select
                              className="text-sm rounded-sm  bg-[#20252e]"
                              onChange={onChangeModal}
                              name="role"
                              value={editGame.role}
                            >
                              {game.Game.roleList.map((role) => {
                                return <option value={role}>{role}</option>;
                              })}
                            </select>
                          </div>
                        </div>

                        <div className="">
                          <p className="text-slate-300 text-sm mb-2 font-semibold">
                            About
                          </p>
                          <input
                            className="text-slate-300 text-sm bg-[#20252e] p-2 rounded-md w-full"
                            value={editGame.aboutMe}
                            onChange={onChangeModal}
                            name="aboutMe"
                          />
                        </div>
                        <div className="flex flex-row justify-evenly">
                          <button
                            className="btn w-fit btn-sm hover:bg-red-500 hover:text-white border-none"
                            onClick={(e) => {
                              e.preventDefault();
                              setModalClick(false);
                              setEditGame({
                                rank: "",
                                role: "",
                                matchType: "",
                                aboutMe: "",
                              });
                            }}
                          >
                            Cancel
                          </button>
                          <label
                            onClick={(e) => {
                              onSubmitModal(game.id);
                            }}
                            className="btn w-fit btn-sm hover:bg-info hover:text-white border-none"
                            type="submit"
                          >
                            Submit
                          </label>
                        </div>
                      </form>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-row w-full justify-around">
                          <div>
                            <p className="text-slate-300 text-sm text-center font-semibold">
                              Rank
                            </p>
                            <p className="text-slate-300 text-sm text-center">
                              {game.Game.rankList[game.rank]}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-300 text-sm text-center font-semibold">
                              Type
                            </p>
                            <p className="text-slate-300 text-sm text-center">
                              {game.matchType}
                            </p>
                          </div>

                          <div>
                            <p className="text-slate-300 text-sm text-center font-semibold">
                              Role
                            </p>
                            <p className="text-slate-300 text-sm text-center">
                              {game.role}
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <p className="text-slate-300 text-sm mb-2 font-semibold">
                            About
                          </p>
                          <p className="text-slate-300 text-sm bg-[#111419] p-2 rounded-md">
                            {game.aboutMe}
                          </p>
                        </div>
                        <button
                          className="btn w-fit self-end btn-sm hover:bg-tertiary hover:text-white border-none"
                          onClick={(e) => {
                            e.preventDefault();
                            setModalClick(true);
                            setEditGame({
                              rank: game.rank,
                              role: game.role,
                              matchType: game.matchType,
                              aboutMe: game.aboutMe,
                            });
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </label>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
