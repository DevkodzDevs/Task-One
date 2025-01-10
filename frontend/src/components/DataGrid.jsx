import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import Row from "./Row";
import { formatRevenue } from "../utils/formatUtils";

const DataGrid = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(155000000);
  const [filterType, setFilterType] = useState("location");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/products");
    const result = await response.json();

    const updatedData = result.map(row => ({
      ...row,
      percentage: (33.33).toFixed(2),
      revenue: ((33.33 / 100) * total).toFixed(2),
    }));

    setData(updatedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const totalRevenue = data.reduce((sum, row) => sum + parseFloat(row.revenue), 0);
    setTotal(totalRevenue);
  }, [data]);

  const handleDelete = (id) => {
    setData(data.filter(row => row.id !== id));
  };

  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };

  const handleSort = (key) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <Dropdown onSelect={handleFilterChange} />
      <table className="w-2/4">
        <thead>
          <tr className="grid justify-items-start grid-cols-[1fr_1fr_1fr_1fr] gap-4 bg-gray-200 p-2 border-b-2 border-white">
            <th onClick={() => handleSort(filterType === "location" ? "location" : "branch")}>
              {filterType === "location" ? "Location" : "Branch"}
              <button onClick={handleSort} className="ml-2 p-1 text-black rounded">
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </th>
            <th onClick={() => handleSort("percentage")}>Percentage
              <button onClick={handleSort} className="ml-2 p-1 text-black rounded">
                {sortOrder === "asc" ? "↑" : "↓"}
              </button></th>
            <th onClick={() => handleSort("revenue")}>Revenue
              <button onClick={handleSort} className="ml-2 p-1 text-black rounded">
                {sortOrder === "asc" ? "↑" : "↓"}
              </button></th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Total Row */}
          <tr className="grid justify-items-start grid-cols-[1fr_1fr_1fr_1fr] gap-4 bg-gray-200 p-2">
            <td>Total</td>
            <td>100%</td>
            <td>{formatRevenue(total)}</td>
            <td>-</td>
          </tr>
          {/* Data Rows */}
          {data.map(row => (
            <Row
              key={row.id}
              row={row}
              displayField={filterType}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
