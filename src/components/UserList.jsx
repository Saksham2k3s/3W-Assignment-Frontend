import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileModel from "./ProfileModel";
import { setScore } from "../redux/slices/addScoreSlice";

function UserList() {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.allUsers);
  const [openProfile, setOpenProfile] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const onClickHandler = (user) => {
    dispatch(setScore())
    setOpenProfile(!openProfile);
    setUserInfo(user);
  };

  return (
    <>
      <div className="w-full px-5 py-10">
        <div className=" text-blue-900 text-4xl ">
          <h4 className="text-center" >Users List</h4>
        </div>
        <div className="px-10 w-full">
          {!users ? (
            <div>Loading...</div>
          ) : (
            <div>
              <table className="min-w-full bg-white shadow-md rounded-lg my-5  ">
                <thead>
                  <tr className="rounded-lg">
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Avatar</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Points</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users && users.length > 0 ? (
                    users.map((user, index) => (
                      <tr
                        key={user._id}
                        onClick={() => onClickHandler(user)}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {/* Rank */}
                        <td className="px-6 py-4 text-center">{index + 1}</td>

                        {/* Avatar */}
                        <td className="px-6 py-4">
                          <div className="h-full w-full flex items-center justify-center overflow-hidden">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-16 w-16 object-cover rounded-full border-2 border-white"
                            />
                          </div>
                        </td>

                        {/* Name */}
                        <td className="px-6 py-4 text-center">{user.name}</td>

                        {/* Points */}
                        <td className="px-6 py-4 text-center">{user.points}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No users available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* User Modal */}
      {openProfile && (
        <ProfileModel userInfo={userInfo} onClickHandler={onClickHandler} />
      )}
    </>
  );
}

export default UserList;
