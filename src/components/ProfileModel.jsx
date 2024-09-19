import React, { useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { addScore } from "../redux/slices/addScoreSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchAllUsers } from "../redux/slices/getAllUserSlice";

function ProfileModel({ userInfo, onClickHandler }) {
  const dispatch = useDispatch();
  const { name, avatar, points } = userInfo;
  const { totalScore, addedScore, isError, errorMessage } = useSelector(state => state.addScore);

  useEffect(() => {
    if (addedScore) {
      toast.success(`${addedScore} points added to ${name}`);
      dispatch(fetchAllUsers())
    }
    if (isError) {
      toast.error(errorMessage);
    }
  }, [addedScore, isError, errorMessage, name]);

  const claimPointsHandler = () => {
    dispatch(addScore(userInfo._id));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-md p-6 rounded-lg shadow-lg z-20">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
          onClick={onClickHandler}
        >
          <RxCross1 className="w-6 h-6" />
        </button>

        {/* Profile Info */}
        <div className="text-center">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <img
              src={avatar}
              alt={name}
              className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
            />
          </div>

          {/* Name */}
          <h2 className="text-2xl font-semibold mb-2">{name}</h2>

          {/* Points */}
          <p className="text-lg text-gray-600">Points: {totalScore ? totalScore : points}</p>

          {/* Claim Points */}
          <button
            className="bg-blue-900 text-white px-4 py-3 rounded-lg mt-3 font-semibold"
            onClick={claimPointsHandler}
          >
            Claim Points
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileModel;
