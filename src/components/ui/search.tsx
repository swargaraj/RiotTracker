"use client";
import { useState } from "react";

interface SearchBarProps {
	data: { id: number; name: string }[];
}

const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
			<input
				type="text"
				placeholder="Search..."
				value={searchTerm}
				onChange={handleSearchChange}
				className="px-4 py-2 w-full focus:outline-none"
			/>
			{searchTerm && (
				<ul className="bg-white shadow-md rounded-b-md absolute left-0 right-0 top-[90px] mt-1">
					{filteredData.map((item) => (
						<li
							key={item.id}
							className="px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
						>
							{item.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;
