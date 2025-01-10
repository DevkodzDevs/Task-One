import React from "react";

const Dropdown = ({ onSelect }) => {
    const options = [
        { value: "location", label: "Location" },
        { value: "branch", label: "Branch" },
    ];

    return (
        <select onChange={(e) => onSelect(e.target.value)} className="p-2 m-2 border border-gray-300 rounded-md">
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
