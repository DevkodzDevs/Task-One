import React from "react";
import { formatRevenue } from "../utils/formatUtils";

const Row = ({ row, displayField, onDelete }) => {
    return (
        <tr className="grid justify-items-start grid-cols-[1fr_1fr_1fr_1fr] gap-4 border-b-2 px-2 py-4">
            <td>{displayField === "location" ? row.location : row.branch}</td>
            <td>{formatRevenue(row.revenue)}</td>
            <td>{row.percentage}%</td>
            <td>
                <button onClick={() => onDelete(row.id)} className="rounded-full border-2 px-2 py-1 text-sm">X</button>
            </td>
        </tr>
    );
};

export default Row;
