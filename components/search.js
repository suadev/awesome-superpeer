import React from "react";

export default function Search({
  categories,
  setTextFilter,
  setCategoryFilter,
}) {
  const onTextChange = (e) => {
    setTextFilter(e.target.value);
  };

  const onSelectChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  return (
    <div className="flex flex-wrap mb-6 justify-center">
      <div className="flex flex-col ml-2">
        <span>Text Search</span>
        <input
          type="text"
          placeholder="search by name or category"
          className="w-64 h-10 border-2 rounded-md"
          onChange={onTextChange}
        />
      </div>

      <div className="flex flex-col ml-2">
        <span>Categories</span>
        <select
          className="w-64 h-10 border-2 rounded-md"
          onChange={onSelectChange}
        >
          <option value="">All 👌</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
