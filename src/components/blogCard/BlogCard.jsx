import React from "react";

const blogs = [
  {
    category: "Muscle",
    title: "Rehab after total knee replacement",
    author: "Dr. Alexander",
    readTime: "6 min Read",
  },
  {
    category: "Cardiovascular",
    title: "Rehab after total knee replacement",
    author: "Dr. Alexander",
    readTime: "6 min Read",
  },
  {
    category: "Muscle",
    title: "Rehab after total knee replacement",
    author: "Dr. Alexander",
    readTime: "6 min Read",
  },
];

const BlogCard = ({ category, title, author, readTime }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden p-2 border ">
    <div className="md:min-h-52 h-40 bg-gradient-to-b from-gray-200 to-purple-200 rounded-lg mb-3 relative p-2">
      <div className="text-xs bg-gray-100 px-3 py-1 rounded-full inline-block mb-2 absolute">
        {readTime}
      </div>
    </div>
    <p className="text-sm text-purple-600 font-medium">{category}</p>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600 mt-2">{author}</p>
  </div>
);

const BlogSection = () => {
  return (
    <div className=" p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-purple-600 text-sm font-semibold uppercase">
            BLOGS
          </h2>
          <h1 className="text-4xl font-bold mt-1">Explore all our insight</h1>
        </div>
        <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
          Read More
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
