import { Button, CircularProgress } from "@mui/material";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Empty from "../assets/empty.svg";

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      getDocs(query(collection(db, "posts"), orderBy("date", "desc"))).then(
        (snapshot) => {
          const temp = [];
          snapshot.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }));
          setPosts(temp);
          setIsLoading(false);
        }
      );
    }
  }, [isLoading]);
  return (
    <div className="relative">
      {isLoading ? (
        <div
          className="flex items-center justify-center w-full h-full"
          style={{ height: "calc(100vh - 3.5rem)" }}
        >
          <CircularProgress />
        </div>
      ) : posts.length === 0 ? (
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
            No post here for now, Add a post and you can manage it here later
          </p>
        </div>
      ) : (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full overflow-auto gap-4"
          style={{ maxHeight: "calc(100vh - 3.5rem)" }}
        >
          {posts.map(({ id, title, content, date, url }) => (
            <li key={id}>
              <Post {...{ id, title, content, date, url, setIsLoading }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Post = ({ id, title, content, date, url, setIsLoading }) => {
  const handleClickDeletePost = () => {
    deleteDoc(doc(db, "posts", id));
    setIsLoading(true);
  };
  return (
    <article className="rounded-md h-72 m-4 h-fit shadow-md shadow-slate-200 relative">
      <img
        src={url}
        alt="post"
        className="w-full h-full rounded-md object-cover"
      />
      <div
        className="absolute top-1 right-0 bottom-0  left-0 rounded-md flex flex-col justify-between text-white cursor-pointer overflow-hidden leading-5"
        style={{ backgroundColor: "rgba(0,0,0,.9)" }}
      >
        <p className="text-4xl font-semibold text-gray-200 p-4 flex-1 w-full">
          {title}
        </p>
        <div className="flex w-full justify-end p-2">
          <Button
            variant="contained"
            color="error"
            onClick={handleClickDeletePost}
          >
            delete
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ManagePost;
