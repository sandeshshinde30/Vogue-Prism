import React, { useEffect, useState } from "react";
import { HiMiniUserCircle, HiStar } from "react-icons/hi2";
import config from '../config';
export default function Reviews() {
  const [reviews, setReviews] = useState([]); // Ensure this is initialized as an empty array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ user: "", rating: 1, text: "", img: null });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setNewReview((prev) => ({ ...prev, img: file })); // Store file instead of URL
    }
  };

  const handleUploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'vogue_prism');

    const response = await fetch("https://api.cloudinary.com/v1_1/dldrjl92a/image/upload", {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      return data.secure_url; // Return the URL of the uploaded image
    } else {
      console.error('Image upload failed:', response.statusText);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    const uploadedImageUrl = await handleUploadImage(newReview.img); // Upload the image first

    if (uploadedImageUrl) {
      const reviewData = {
        user: newReview.user,
        rating: newReview.rating,
        text: newReview.text,
        img: uploadedImageUrl, // Use the uploaded image URL
      };

      try {
        const response = await fetch(`${config.BASE_URL}/api/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reviewData)
        });

        if (response.ok) {
          const newReviewResponse = await response.json();
          setReviews((prev) => [...prev, newReviewResponse.review]);
          setNewReview({ user: "", rating: 1, text: "", img: null }); // Reset form
          setImagePreview(null); // Reset preview
          toggleModal(); // Close modal
        } else {
          alert('Failed to add review.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding review.');
      }
    }

    setLoading(false); // Set loading state to false after the process
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/api/getReviews`);
        const data = await response.json(); // Always parse JSON response
        if (response.ok) {
          console.log(data); // Log the data to see its structure
          setReviews(data || []);
        } else {
          console.error('Failed to fetch reviews:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
    
  }, []);
  

  return (
    <>
      <div id="rew" className="mt-20 mb-20">
        <div className="text-center">
          <h1 className="lg:text-4xl text-2xl font-bold text-dark-green tracking-[.25em]">
            REVIEWS
          </h1>
        </div>

        <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-10 gap-20 mt-24 lg:mx-20 mx-16">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={review.id}
                className={`relative flex md:h-80 flex-col lg:w-2/6 h-86 rounded-xl items-center ${
                  index === 1 ? "bg-dark-green" : "bg-gray-300"
                }`}
              >
                <div className="absolute -top-16">
                  <img src={review.img} alt="" className="h-32 w-32 rounded-full" />
                </div>
                
                <div
                  className={`flex pt-20 ${
                    index === 1 ? "text-white" : "text-darker-green"
                  }`}
                >
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <HiStar key={i} size={32} />
                  ))}
                </div>
                <div  className={`px-10 py-1 text-justify ${
                    index === 1 ? "text-white" : "text-darker-green"
                  }`}>
                  <h1>{review.user}</h1>
                </div>
                <p
                  className={`px-10 py-4 text-justify ${
                    index === 1 ? "text-white" : "text-darker-green"
                  }`}
                >
                  {review.text}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p> // Display a message when there are no reviews
          )}
        </div>

        <div className="flex justify-center items-center mt-10">
          <button
            className="uppercase font-bold text-white bg-dark-green p-4 rounded-xl"
            onClick={toggleModal}
          >
            ADD REVIEW
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-8 rounded-xl lg:w-1/2 max-h-[calc(100vh-20px)] overflow-y-auto">
            <h2 className="text-2xl text-center font-bold mb-4">Add Review</h2>

            <form onSubmit={handleSubmit} className="h-full w-full">
              <div>
                <input
                  type="text"
                  name="user"
                  placeholder="Your Name"
                  value={newReview.user}
                  onChange={handleChange}
                  className="text-white bg-dark-green w-full p-2 mb-4 border rounded"
                  required
                />

                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  placeholder="Rating (1-5)"
                  value={newReview.rating}
                  onChange={handleChange}
                  className="w-full p-2 mb-4 border bg-dark-green rounded text-white"
                  required
                />

                <textarea
                  name="text"
                  placeholder="Your Review"
                  value={newReview.text}
                  onChange={handleChange}
                  className="w-full h-32 p-2 mb-4 bg-dark-green border rounded text-white"
                  required
                />

                <div className="text-white bg-dark-green rounded-2xl border">
                  <label className="m-0 bg-dark-green p-2">Your Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full rounded bg-dark-green"
                    required
                  />
                </div>

                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-full mx-auto"
                    />
                  </div>
                )}

                {/* Loading indicator */}
                {loading && <p className="text-center mt-4">Uploading...</p>}
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-dark-green text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
