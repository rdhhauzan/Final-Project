import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../store/actions/action";

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { users } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="flex xl:flex-row 2xs:flex-col-reverse font-poppins text-[#FFFFFF] w-full min-h-screen font-chakra">
      <div className="flex xl:flex-row 2xs:flex-col-reverse xl:gap-10 2xs:gap-5 w-screen h-content 2xs:py-5 xl:py-10 xl:px-12 2xs:px-8">
        <div className="flex flex-col w-full mt-0 basis-8/12 gap-3">
          <div className="card w-full bg-primary rounded shadow-xl shadow-black flex justify-center">
            {users.map((user) => {
              return (
                <div className="card-body text-start">
                  <h2 className="card-title">{user.username}</h2>
                  <p>{user.Posts.content}</p>
                  <figure className="pt-5">
                    <img
                      src={user.Posts.imgUrl}
                      alt="Shoes"
                      className="rounded-xl w-full"
                    />
                  </figure>
                </div>
              );
            })}
          </div>
          <div className="card w-full bg-primary rounded shadow-xl shadow-black flex justify-center">
            <div className="card-body text-start">
              <h2 className="card-title">@beban1</h2>
              <p>Ranked bersama @adminjisoo & @beban2!</p>
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
        <div className="flex flex-col w-full xl:mt-0 2xs:mt-4 basis-4/12">
          <div className="card w-full bg-[#303030] rounded-sm flex"></div>
          <div className="card w-full bg-[#303030] rounded-sm flex">
            <div className="card-title items-start bg-[#D7385E]">
              <div>
                <figure className="flex">
                  <img
                    src="https://i.imgur.com/qAFLT3Z.jpeg"
                    alt="Shoes"
                    className="mx-5 my-3 w-20 h-20 rounded-full"
                  />
                </figure>
              </div>
              <div>
                <p className="mt-5">@adminjisoo</p>
                <button
                  className="btn btn-sm mx-1 rounded-full text-slate-200 font-normal mt-2 text-sm"
                  onClick={() => navigation("/profile")}
                >
                  Profile
                </button>
                <button className="btn btn-sm mx-1 rounded-full text-slate-200 font-normal mt-2 text-sm">
                  Add a Game
                </button>
              </div>
            </div>
            <div className="card-body items-start text-start">
              <p>harusnya ini orang banyak yg onlen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
