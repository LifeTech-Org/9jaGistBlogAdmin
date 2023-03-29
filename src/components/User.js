import React, { useState } from "react";
import NewPost from "../routes/NewPost";
import ManagePost from "../routes/ManagePost";
import { Add, Edit } from "@mui/icons-material";

const User = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const routes = [
    { title: <div>new post</div>, content: <NewPost />, icon: <Add /> },
    { title: <div>manage posts</div>, content: <ManagePost />, icon: <Edit /> },
  ];
  return (
    <div className="flex w-full flex-1 ">
      <nav>
        <ul className="h-full w-auto md:w-64 bg-gray-900">
          {routes.map(({ title, icon }, index) => (
            <li key={index}>
              <div
                className={
                  (index === currentIndex
                    ? "text-blue-300 "
                    : "text-gray-100 ") +
                  "h-14 text-sm px-4 flex items-center capitalize cursor-pointer font-semibold hover:bg-gray-800 "
                }
                style={{ borderTop: "solid 1px rgba(225,225,225,.3)" }}
                onClick={() => setCurrentIndex(index)}
              >
                <span>{icon}</span>
                <span className="hidden md:inline-flex ml-2">{title}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-1 h-full">{routes[currentIndex].content}</div>
    </div>
  );
};

export default User;
