import Image from "next/image";
import React from "react";
import products from "@/lib/dummy-data";
interface Props {}

const HeroSection = (props: Props) => {
	return (
		<div className="">
			<div className="mx-auto px-8 max-w-2xl  py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="sr-only">Products</h2>

				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{products.map((product) => (
						<a
							key={product.id}
							href={product.href}
							className="group"
						>
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
								<img
									src={product.imageSrc}
									alt={product.imageAlt}
									className="h-full w-full object-cover object-center group-hover:opacity-75"
								/>
							</div>
							<h3 className="mt-4 text-sm text-gray-200">{product.name}</h3>
							<p className="mt-1 text-lg font-medium text-gray-300">
								{product.price}
							</p>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};
export default HeroSection;
