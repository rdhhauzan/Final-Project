import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  fetchUserById,
  fetchOnlineUsers,
  deletePost,
  followFriend,
  findMatch,
  fetchGames,
} from "../store/actions/action";
import ModalPost from "./ModalPost";
import Swal from "sweetalert2";
import PremiumCard from "../components/PremiumCard";

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const id = localStorage.getItem("id");
  const { userDetail, posts, onlineUsers, match, games } = useSelector(
    (state) => state
  );
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("All");
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState({ name: "", id: "" });

  const handleShow = () => setShow(true);
  const logout = (e) => {
    e.preventDefault();
    window.CometChatWidget.logout();
    localStorage.clear();
    Swal.fire({
      title: "Logged Out",
      text: "Please login to find friends to play with.",
      background: "#303030",
      color: "#FFFFFF",
      confirmButtonColor: "#D7385E",
    });
    navigation("/");
  };

  const handleChange = (e) => {
    let { value } = e.target;

    setFilter(value);
  };

  const startMatchmaking = () => {
    dispatch(findMatch(selected.id));
  };

  useEffect(() => {
    if (filter === "All") {
      setFiltered([...posts]);
    } else {
      let filteredPosts = posts.filter((post) => filter === post.Game.name);
      setFiltered([...filteredPosts]);
    }
  }, [filter, posts]);

  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(fetchOnlineUsers());
    dispatch(fetchGames());
    dispatch(fetchPosts());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="flex xl:flex-row 2xs:flex-col-reverse 3xs:flex-col-reverse font-poppins text-[#FFFFFF] w-full min-h-screen">
      <div className="flex xl:flex-row 2xs:flex-col-reverse 3xs:flex-col-reverse xl:gap-10 2xs:gap-5 w-screen h-content 2xs:py-5 xl:py-10 xl:px-12 2xs:px-8">
        <div className="flex flex-col w-full mt-0 basis-8/12 gap-3">
          {posts.length > 0 ? (
            <div className="flex justify-end">
              <label
                htmlFor="modal-post"
                className="btn bg-[#D7385E] text-slate-200"
              >
                Make a Post
              </label>

              <ModalPost key={userDetail.id} />
            </div>
          ) : null}

          {posts.length > 0 ? (
            filtered.map((post) => {
              return (
                <div className="card w-full bg-primary rounded shadow-xl shadow-black flex justify-center">
                  <div className="card-body text-start" key={post.id}>
                    <div className="flex flex-row justify-between">
                      <h2 className="card-title text-2xl">
                        @{post?.User?.username}
                      </h2>
                      <p className="text-end text-slate-300 text-sm">
                        {" "}
                        {new Date(post.createdAt)
                          .toDateString()
                          .slice(4, 15)}{" "}
                      </p>
                    </div>
                    <p className="text-md">{post.content}</p>
                    {post.imgUrl ? (
                      <figure className="pt-5 w-64 h-auto">
                        <img
                          src={post.imgUrl}
                          alt="Shoes"
                          className="rounded-xl w-full"
                        />
                      </figure>
                    ) : null}
                    <div className="flex self-end">
                      <div className="text-xs text-slate-300">
                        {post.UserId === userDetail?.user?.id ? (
                          <button
                            className="btn flex self-end bg-transparent hover:bg-transparent hover:scale-110 border-0"
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                background: "#303030",
                                color: "#FFFFFF",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  dispatch(deletePost(post.id));
                                  Swal.fire({
                                    title: "Deleted!",
                                    text: "Your tweet has been deleted.",
                                    icon: "success",
                                    background: "#303030",
                                    color: "#FFFFFF",
                                    confirmButtonColor: "#D7385E",
                                  });
                                } else if (
                                  result.dismiss === Swal.DismissReason.cancel
                                ) {
                                  Swal.fire({
                                    title: "Cancelled.",
                                    text: "Your tweet is safe.",
                                    icon: "error",
                                    background: "#303030",
                                    color: "#FFFFFF",
                                    confirmButtonColor: "#D7385E",
                                  });
                                }
                              });
                            }}
                          >
                            {" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Welcome post from developer when first joining TeamUP
            <div className="card w-full bg-primary rounded shadow-xl shadow-black flex justify-center">
              <div className="card-body text-start">
                <h2 className="card-title">@developer</h2>
                <p>
                  Please add a game to play together with your new teammates!
                  Never play alone, and share the joy to your post!{" "}
                </p>
                <figure className="pt-5">
                  <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/gamers-play-online-video-game-5071155-4231654.png"
                    alt="Shoes"
                    className="rounded-xl w-full"
                  />
                </figure>
                <div className="flex justify-end">
                  <label
                    htmlFor="modal-post"
                    className="btn bg-[#D7385E] text-slate-200"
                    onClick={handleShow}
                  >
                    Make a Post
                  </label>
                  <ModalPost key={userDetail.id} />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Profile + Online users + Group + Recommended Friends section */}
        <div className="flex flex-col w-full xl:mt-0 2xs:my-4 gap-3 basis-4/12">
          <div className="card w-full bg-[#262525] rounded-sm flex">
            <div className="card-title sticky top-0 items-start bg-[#D7385E]">
              <div>
                <figure className="flex">
                  <img
                    src="https://i.imgur.com/qAFLT3Z.jpeg"
                    alt="Shoes"
                    className="mx-5 my-3 w-20 h-20 rounded-full"
                  />
                </figure>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <p className="mt-5">@{userDetail?.user?.username}</p>
                  {userDetail?.user?.isPremium ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="yellow"
                      class="w-4 h-4 mt-3"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : null}
                </div>
                <div className="flex flex-row">
                  <button
                    className="btn btn-sm mx-1 rounded-full bg-[#303030] hover:scale-105 text-slate-200 font-normal mt-2 text-sm"
                    onClick={() =>
                      navigation(`/profile/${userDetail?.user?.id}`)
                    }
                  >
                    Profile
                  </button>
                  <button
                    className="btn btn-sm mx-1 rounded-full bg-[#303030] hover:scale-105 text-slate-200 font-normal mt-2 2xs:mb-2 text-sm"
                    onClick={() => navigation("/addgame")}
                  >
                    Add a Game
                  </button>
                </div>
              </div>
              <button
                className="btn absolute right-0 bg-transparent border-0 rounded-md hover:bg-transparent hover:border-0"
                onClick={logout}
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6 hover:scale-125"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </div>

            {onlineUsers.map((onlineUser) => {
              return (
                <div className="card-body flex mx-5">
                  <div
                    className="flex flex-row gap-3 justify-between"
                    key={onlineUser.id}
                  >
                    <img
                      src={onlineUser.userData.profPict}
                      className="self-center h-10 w-10"
                      alt="profile pict"
                    />
                    <p className="self-center">
                      {onlineUser.userData.username}
                    </p>

                    {userDetail.followed.filter(
                      (e) => e.FollowedId == onlineUser.userData.id
                    ).length > 0 && (
                      <p className="flex justify-end mr-1 items-end self-center text-slate-200">
                        {" "}
                        FOLLOWED{" "}
                      </p>
                    )}
                    {userDetail.followed.filter(
                      (e) => e.FollowedId == onlineUser.userData.id
                    ).length == 0 && (
                      <button
                        className="btn btn-primary justify-end self-end rounded-sm"
                        onClick={() => {
                          dispatch(followFriend(onlineUser.userData.id))
                            .then(() => {
                              dispatch(fetchUserById(id));
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        {" "}
                        Follow{" "}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {userDetail?.user?.isPremium ? null : <PremiumCard />}
          <div>
            <div className="card w-full bg-primary rounded shadow-xl shadow-black flex justify-center text-center">
              <div className="card-body flex items-center">
                <h2 className="card-title ">Go matchmaking!</h2>
                <figure className="pt-5 text-center">
                  <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/gamers-play-online-video-game-5071155-4231654.png"
                    alt="Shoes"
                    className="rounded-xl w-full"
                  />
                </figure>
                <div className="flex justify-center">
                  <label
                    htmlFor="modal-matchmaking"
                    className="btn bg-[#D7385E] text-slate-200"
                    onClick={() => {
                      setSelected({ id: "", name: "" });
                    }}
                  >
                    Enter matchmaking lobby
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      id="modal-matchmaking"
                      className="modal-toggle"
                    />
                    <label
                      htmlFor="modal-matchmaking"
                      className="bg-black flex flex-col items-center bg-opacity-90 h-auto modal"
                    >
                      <label
                        className="modal-box relative flex flex-col gap-3"
                        htmlFor=""
                      >
                        {match.length > 0 ? (
                          <div>
                            <h1 className="text-2xl">MATCH FOUND!</h1>
                            <h1 className="text-lg">
                              Do you want to find another match?
                            </h1>
                          </div>
                        ) : (
                          <h1 className="text-2xl">
                            Pick a game to start matchmaking!
                          </h1>
                        )}

                        {selected.id ? (
                          <p className="">Selected game: {selected.name}</p>
                        ) : (
                          <p className="text-[#2a303c]">Selected game: </p>
                        )}
                        <div className="flex flex-wrap justify-center gap-5 my-3">
                          {userDetail?.user?.UserGames.map((game) => {
                            return (
                              <button
                                className="w-[13.5rem] h-auto hover:scale-105 transition-all btn bg-[#2a303c] hover:bg-[#2a303c] hover:border-[#2a303c] border-[#2a303c]"
                                key={game.Game.id}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelected({
                                    name: game.Game.name,
                                    id: game.Game.id,
                                  });
                                }}
                              >
                                <img src={game.Game.imgUrl} />
                              </button>
                            );
                          })}
                        </div>

                        <label
                          className="btn bg-[#D7385E] text-slate-200"
                          htmlFor="modal-matchmaking"
                          onClick={(e) => {
                            e.preventDefault();
                            startMatchmaking();
                          }}
                        >
                          START MATCHMAKING
                        </label>
                        {match.length > 0 ? (
                          <div>
                            <p>Your Team</p>
                            <div className="flex flex-row gap-3 justify-around">
                              {match?.map((player, index) => {
                                return (
                                  <button
                                    className="flex flex-col items-center bg-gradient-to-b from-primary via-[#201010] to-[#7f2036] rounded-lg p-2 hover:scale-110 transition-all"
                                    onClick={() => {
                                      navigation(`/profile/${player.User.id}`);
                                    }}
                                  >
                                    <p className="text-center font-semibold">
                                      {
                                        games[player.GameId].rankList[
                                          +player.rank
                                        ]
                                      }
                                    </p>
                                    <img
                                      src={player.User.profPict}
                                      className="w-14 h-14 rounded-full"
                                    />
                                    {player.User.username ===
                                    userDetail.user.username ? (
                                      <p className="text-center text-sm">You</p>
                                    ) : (
                                      <p className="text-center text-sm">
                                        {player.User.username}
                                      </p>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ) : null}
                      </label>
                    </label>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
