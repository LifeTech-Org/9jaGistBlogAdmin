import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { useRef, useState } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { generateKey } from "./../utils/generateKey";
import { ref } from "firebase/storage";
import { db, storage } from "../firebase";
import { uploadBytes } from "firebase/storage";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
const NewPost = () => {
  const editorRef = useRef("Write post here.");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [submitStatus, setSubmitStatus] = useState("pending");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const categories = [
    "Software",
    "Food",
    "Technology",
    "Lifestyle",
    "Shopping",
  ];
  const handleSubmitPost = async () => {
    if (
      file === null ||
      category === "" ||
      editorRef.current.getContent() === "" ||
      submitStatus !== "pending" ||
      title === ""
    ) {
      return;
    }
    setSubmitStatus("submitting");
    const path = "images/" + generateKey();
    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, file)
      .then(async () => {
        await getDownloadURL(storageRef)
          .then(async (url) => {
            await setDoc(doc(db, "posts", title), {
              date: Timestamp.now(),
              likes: [],
              dislikes: [],
              seen: [],
              comments: [],
              title,
              content: editorRef.current.getContent(),
              category,
              url,
            })
              .then((data) => {
                setSubmitStatus("sent");
              })
              .catch((err) => setSubmitStatus("failed"));
          })
          .catch((err) => setSubmitStatus("failed"));
      })
      .catch((err) => setSubmitStatus("failed"))
      .finally(() => {
        setTimeout(() => {
          setSubmitStatus("pending");
        }, 3000);
      });
  };
  return (
    <>
      {isLoading && (
        <div
          className="flex items-center justify-center w-full h-full"
          style={{ height: "calc(100vh - 3.5rem)" }}
        >
          <CircularProgress />
        </div>
      )}
      <form
        className="flex flex-col overflow-y-auto p-2"
        style={{
          maxHeight: "calc(100vh - 3.5rem)",
          display: isLoading ? "none" : "flex",
        }}
      >
        <input
          type="text"
          className="w-full h-12 font-semibold text-gray-700 text-md p-2 my-2 "
          placeholder="Write a unique title of post."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Editor
          apiKey="twayqreiaycjma963n7x19ofxbbg1ltk1ejst1ecn41i3ktv"
          onInit={(evt, editor) => {
            editorRef.current = editor;
            setIsLoading(false);
          }}
          plugins="wordcount"
          initialValue={"Write something here."}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | image | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        ></Editor>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-3">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="file"
              required
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={category}
                label="Age"
                required
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {categories.map((cat, index) => (
                  <MenuItem value={cat} key={index}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex w-full justify-end">
            <Button
              type="submit"
              variant="contained"
              style={{ marginLeft: "8px" }}
              color={
                submitStatus === "pending" || submitStatus === "submitting"
                  ? "primary"
                  : submitStatus === "failed"
                  ? "error"
                  : "success"
              }
              onClick={(e) => {
                e.preventDefault();
                handleSubmitPost();
              }}
            >
              {submitStatus === "pending" ? (
                "submit post"
              ) : submitStatus === "submitting" ? (
                <div>
                  <CircularProgress size={13} color="warning" /> Submitting
                </div>
              ) : submitStatus === "failed" ? (
                "error"
              ) : (
                "success"
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewPost;
