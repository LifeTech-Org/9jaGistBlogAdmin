import React from "react";
import Empty from "../assets/empty.svg";

const Null = () => {
  return (
    <div
      className="flex flex-col w-full  items-center justify-center font-semibold text-gray-700"
      style={{ height: "calc(100vh - 3.5rem)" }}
    >
      <img
        src={Empty}
        alt="empty"
        className="w-36 h-auto animate animate-bounce"
      />
      <p className="my-3 max-w-sm text-center">
        You are required to sign in before you can have access. Kindly click the
        Sign In Button at the top right to get started.
      </p>
    </div>
  );
};

export default Null;
