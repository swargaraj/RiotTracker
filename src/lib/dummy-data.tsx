import React from "react";

interface Props {
	id: number;
	name: string;
	href: string;
	price: string;
	imageSrc: string;
	imageAlt: string;
}
const products = [
	{
		id: 1,
		name: "Valorant",
		href: "#",
		price: "$48",
		imageSrc: "/valo.jpg",
		imageAlt: "Valorant",
	},
	{
		id: 2,
		name: "League of Legend",
		href: "#",
		price: "$35",
		imageSrc: "/League of Legends.jpeg",
		imageAlt: "League of Legend.",
	},
	{
		id: 3,
		name: "Counter-Strike 2",
		href: "#",
		price: "$89",
		imageSrc: "/cs2.jpg",
		imageAlt: "Counter-Strike 2",
	},
	// {
	// 	id: 4,
	// 	name: "Machined Mechanical Pencil",
	// 	href: "#",
	// 	price: "$35",
	// 	imageSrc:
	// 		"https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
	// 	imageAlt:
	// 		"Hand holding black machined steel mechanical pencil with brass tip and top.",
	// },
	// {
	// 	id: 5,
	// 	name: "Machined Mechanical Pencil",
	// 	href: "#",
	// 	price: "$35",
	// 	imageSrc:
	// 		"https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
	// 	imageAlt:
	// 		"Hand holding black machined steel mechanical pencil with brass tip and top.",
	// },
	// {
	// 	id: 6,
	// 	name: "Machined Mechanical Pencil",
	// 	href: "#",
	// 	price: "$35",
	// 	imageSrc:
	// 		"https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
	// 	imageAlt:
	// 		"Hand holding black machined steel mechanical pencil with brass tip and top.",
	// },
	// {
	// 	id: 7,
	// 	name: "Machined Mechanical Pencil",
	// 	href: "#",
	// 	price: "$35",
	// 	imageSrc:
	// 		"https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
	// 	imageAlt:
	// 		"Hand holding black machined steel mechanical pencil with brass tip and top.",
	// },
	// {
	// 	id: 8,
	// 	name: "Machined Mechanical Pencil",
	// 	href: "#",
	// 	price: "$35",
	// 	imageSrc:
	// 		"https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
	// 	imageAlt:
	// 		"Hand holding black machined steel mechanical pencil with brass tip and top.",
	// },
	// {
	// 	id: 9,
	// 	name: "Machined Mechanical Pencil",
	// 	href: "#",
	// 	price: "$35",
	// 	imageSrc:
	// 		"https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
	// 	imageAlt:
	// 		"Hand holding black machined steel mechanical pencil with brass tip and top.",
	// },
	// {
	// 	id: 10,
	// 	name: "Machined Mechanical Pencil",
	// 	href: "#",
	// 	price: "$35",
	// 	imageSrc:
	// 		"https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
	// 	imageAlt:
	// 		"Hand holding black machined steel mechanical pencil with brass tip and top.",
	// },
];

export default products;
