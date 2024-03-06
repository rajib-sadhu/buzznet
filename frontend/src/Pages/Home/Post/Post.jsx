import { useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDB } from "../../../firebase/firebase.config";
import { v4 as uuidv4 } from "uuid";

import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { LiaSpinnerSolid } from "react-icons/lia";
import useGetAllPosts from "../../../hooks/useGetAllPosts";

const Post = () => {
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [axiosSecure] = useAxiosSecure();
  const [_1, _2, postsFetch] = useGetAllPosts();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();

    const form = e.target;
    const content = form.content.value;
    const image = form.image.files[0];

    if (!content) {
      return toast.error("Please write any contents.");
    }

    let photoUrl = "";

    setIsLoading(true);

    if (image) {
      const imgRef = ref(imageDB, `postImages/${uuidv4()}`);

      try {
        await uploadBytes(imgRef, image);
        const imageURL = await getDownloadURL(imgRef);
        photoUrl = imageURL;
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsLoading(false);
        toast.error("Something is wrong, try again later.");
      }
    }

    try {
      const res = await axiosSecure.post("/posts/add-post", {
        content,
        image: photoUrl,
      });

      const data = res.data;
      if (data.success) {
        toast.success("Post upload successfully.");
        postsFetch();
        setImage(null);
        setFilename("");
        form.reset();
      }
      setIsLoading(false);
    } catch (error) {
      console.error("BACKEND ERROR:", error);
      setIsLoading(false);
      toast.error("Something is wrong, try again later.");
    }
  };

  return (
    <div className="md:w-1/2 mx-auto">
      <div className="md:bg-slate-100 bg-slate-200 rounded-xl overflow-hidden">
        <h1 className="py-4 text-2xl font-semibold px-2">Post</h1>
        <form
          onSubmit={handleAddPost}
          className="bg-slate-200 md:h-48 w-full flex md:flex-row flex-col-reverse"
        >
          <div className="flex flex-col md:w-[70%]">
            <textarea
              name="content"
              className="md:h-full h-28 p-3 bg-slate-100"
              placeholder="Write your post content"
            ></textarea>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-green-500 py-1 flex justify-center items-center"
            >
              {isLoading && <LiaSpinnerSolid className="me-1 animate-spin" />}
              Post
            </button>
          </div>
          <label className="file-input-label bg-slate-400 flex items-center justify-center md:w-[30%] py-4">
            {image ? (
              <p className="py-2 flex justify-center flex-col items-center md:h-auto h-60">
                <img
                  src={image}
                  alt="Selected"
                  className="file-preview-image p-2 md:h-24 object-contain rounded-lg overflow-hidden"
                />
                <span className="file-input-text p-2">
                  {filename.slice(0, 50)}...
                </span>
              </p>
            ) : (
              <span className="file-input-icon">
                <FaRegImage className="text-7xl mx-auto" />
                <span className="file-input-text">Choose image file</span>
              </span>
            )}
            <input
              type="file"
              className="file-input hidden"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
              name="image"
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Post;
