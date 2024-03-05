import { useState } from "react";
import { FaRegImage } from "react-icons/fa6";

const Post = () => {
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("");

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

  return (
    <div className="md:w-1/2 mx-auto">
      <div className="md:bg-slate-100 bg-slate-200 rounded-xl overflow-hidden" >
        <h1 className="py-4 text-2xl font-semibold px-2">Post</h1>
        <form className="bg-slate-200 md:h-48 w-full flex md:flex-row flex-col-reverse">
          <div className="flex flex-col md:w-[70%]">
            <textarea
              name="post"
              className="md:h-full h-28 p-3 bg-slate-100"
              placeholder="Write your post content"
            ></textarea>
            <button className="bg-green-500 py-1">Post</button>
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
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Post;
