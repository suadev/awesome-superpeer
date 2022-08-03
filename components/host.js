import React from "react";

export default function Host({ host }) {
  return (
    <div className="w-64 mb-6 p-2 ml-2 border-4 rounded-md group">
      <a href={host.link} target="_blank" rel="noreferrer">
        <h3 className="text-lg font-medium group-hover:text-blue-600">
          {host.name}
        </h3>
        <h5 className="text-sm font-light h-12 overflow-y-auto">
          {host.categories.join(", ")}
        </h5>
        <p className="">{host.description || "description not specified"}</p>
      </a>
    </div>
  );
}
