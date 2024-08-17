import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../state/userSlice";


const BookUpload = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        author: "",
        price: "",
        quantity: "",
        status: "",
        cover_image: ""
    });
    const user = useSelector(getUser);

  
    const [error, setError] = useState("");
    const [category, setCategory] = useState("");
    // const [cover_image, setCoverImage] = useState("")
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    const image = document.getElementById("cover_image").files[0];

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mern_product");

    await fetch(`${import.meta.env.VITE_BASE_IMAGE_URL}`, {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        formData.cover_image = data.secure_url;
        handleSubmit();
      })
      .catch((error) => console.log(error));

    }
  const handleSubmit = async () => {
    console.log("I am called bitches");
    // e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const form = {
        name: formData.name,
        author: formData.author,
        price: formData.price,
        category: category,
        quantity: formData.quantity,
        cover_image: formData.cover_image,
        status: "inactive",
        owner: user.id,
      }

      console.log(form, "logged");
      await fetch("https://book-rent-delta.vercel.app/books/",{
        method : "POST",
        headers : {
          "Content-Type": "application/json",},
        body: JSON.stringify(form)
    }).then(
      navigate("/product-list")); 
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={uploadImage}
      >
        <h2 className="text-center text-lg font-bold mb-4">upload new book</h2>

        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bookName"
            type="text"
            placeholder="Book Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="authorName"
            type="text"
            placeholder="Author Name"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            required
          >
            <option value="fiction">Fiction</option>
            <option value="self-help">Self-help</option>
            <option value="business">business</option>
          </select>
        </div>

        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cover_image"
            type="file"
            name="cover_image"
            accept="image/*"
            required
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
        {error && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {error}
              </div>
            )}
      </form>
    </div>
  );
};

export default BookUpload;

