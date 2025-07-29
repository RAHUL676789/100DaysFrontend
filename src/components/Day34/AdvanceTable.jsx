import React, { useEffect, useState } from "react";

const AdvanceTable = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const pageLength = 5;

  const usersData = [
    {
      id: 1,
      name: "Rahul Lodhi",
      email: "rahul@example.com",
      role: "Admin",
      status: "Active",
      registeredAt: "2024-12-10",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "User",
      status: "Inactive",
      registeredAt: "2024-11-18",
    },
    {
      id: 3,
      name: "Amit Verma",
      email: "amit@example.com",
      role: "Moderator",
      status: "Active",
      registeredAt: "2025-01-05",
    },
    {
      id: 4,
      name: "Sneha Kapoor",
      email: "sneha@example.com",
      role: "User",
      status: "Pending",
      registeredAt: "2025-03-22",
    },
    {
      id: 5,
      name: "Ravi Thakur",
      email: "ravi@example.com",
      role: "Admin",
      status: "Active",
      registeredAt: "2025-04-10",
    },
    {
      id: 6,
      name: "Anjali Mehta",
      email: "anjali@example.com",
      role: "User",
      status: "Inactive",
      registeredAt: "2025-02-14",
    },
    {
      id: 7,
      name: "Mohit Singh",
      email: "mohit@example.com",
      role: "User",
      status: "Active",
      registeredAt: "2025-05-01",
    },
    {
      id: 8,
      name: "Tina Dey",
      email: "tina@example.com",
      role: "Moderator",
      status: "Pending",
      registeredAt: "2025-06-12",
    },
    {
      id: 9,
      name: "Kunal Joshi",
      email: "kunal@example.com",
      role: "User",
      status: "Active",
      registeredAt: "2025-07-01",
    },
    {
      id: 10,
      name: "Neha Raj",
      email: "neha@example.com",
      role: "User",
      status: "Inactive",
      registeredAt: "2025-07-15",
    },
  ];

  const [filteredData, setFilteredData] = useState([]);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    let data = [...usersData];

    if (searchTerm.trim()) {
      data = data.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (["Moderator", "User", "Admin"].includes(filterValue)) {
      data = data.filter((item) => item.role === filterValue);
    } else if (["active", "inactive", "pending"].includes(filterValue.toLowerCase())) {
      data = data.filter(
        (item) => item.status.toLowerCase() === filterValue.toLowerCase()
      );
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(data);
    setPage(1);
  }, [searchTerm, filterValue, sortConfig]);

  useEffect(() => {
    const start = (page - 1) * pageLength;
    const end = page * pageLength;
    setPageData(filteredData.slice(start, end));
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / pageLength);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const direction = prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction };
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Advanced Table (Search, Filter, Sort, Paginate)</h2>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-1/2"
          placeholder="Search by any field..."
        />

        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-1/3"
        >
          <option value="">All Filters</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
          <option value="User">User</option>
          <option value="Moderator">Moderator</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <table className="w-full table-auto border border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {[
              { key: "id", label: "ID" },
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "role", label: "Role" },
              { key: "status", label: "Status" },
              { key: "registeredAt", label: "Registered" },
            ].map((col) => (
              <th
                key={col.key}
                className="border px-4 py-2 cursor-pointer"
                onClick={() => handleSort(col.key)}
              >
                {col.label} {sortConfig.key === col.key ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.length > 0 ? (
            pageData.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="border-r px-4 py-2">{item.id}</td>
                <td className="border-r px-4 py-2">{item.name}</td>
                <td className="border-r px-4 py-2">{item.email}</td>
                <td className="border-r px-4 py-2">{item.role}</td>
                <td className="border-r px-4 py-2">{item.status}</td>
                <td className="px-4 py-2">{item.registeredAt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <span className="font-medium">
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdvanceTable;
