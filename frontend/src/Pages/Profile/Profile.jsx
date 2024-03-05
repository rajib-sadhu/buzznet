import { Link, useParams } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";
import PostCard from "../Home/UserPosts/PostCard";

const Profile = () => {
  const { email } = useParams();

  const [userInfo, userLoading] = useUserInfo(email);

  return (
    <div className="md:w-1/2 mx-auto bg-slate-300 min-h-[30rem] md:rounded-xl overflow-hidden">
      <div className="relative">
        <img
          src="https://www.shutterstock.com/shutterstock/photos/2225822727/display_1500/stock-vector-abstract-glowing-circle-lines-on-dark-blue-background-geometric-stripe-line-art-design-modern-2225822727.jpg"
          alt="Cover image"
          className="h-80 w-full object-cover object-top"
        />
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-20">
          <img
            src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg"
            alt="Profile image"
            className="w-28 h-28 rounded-full border-8 border-slate-300 "
          />
          <div className="text-center font-semibold">
            <h2>{userInfo?.fullName}</h2>
            <h2 className="font-normal">{userInfo?.email}</h2>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-24 px-5 pb-5">
        <div className="md:space-y-5 space-y-3">
          <div>
            <label className="font-semibold block mb-1">Bio</label>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptas, molestias!
            </p>
          </div>
          <div>
            <label className="font-semibold block mb-1">Descriptions</label>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptas, molestias!
            </p>
          </div>
        </div>
        <div>
          <label className="font-semibold block mb-1">Friends</label>
          <div className="bg-white p-1 rounded-md">
            <label className="font-thin text-sm">Total - 100</label>
            <div className="grid grid-cols-4 gap-1 bg-slate-200 p-1 rounded-md">
              {[...Array(8)].map((_, i) => {
                return (
                  <Link className="mx-auto">
                    <img
                      key={i}
                      src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg"
                      alt="Friends image"
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-5">
        {[...Array(4)].map((_, i) => (
          <PostCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
