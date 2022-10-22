import { DynamicIcon } from "../widgets/dynamicIcons"
import { FaAngleRight } from "react-icons/fa"
import { useState } from "react";
import { BsArrowReturnRight } from "react-icons/bs"
import Link from "next/link";
import { getSubcategoryByName } from "../../lib/nav";

import { m } from "framer-motion";

export function SubCategory(c: {
	name: string;
	description: string;
	icon: string
	hidden: boolean;
}): JSX.Element {
	const [categoryOpen, setCategoryOpen] = useState(false)
	function changeCategoryOpenState() {
		setCategoryOpen(!categoryOpen)
	}

	const subCategory = getSubcategoryByName(c.name)

	if (c.hidden) {
		// TODO user authentication required
		return (
			<></>
		)
	} else {
		return (
			<>
				{
					// subcategory main item
				}
				<a className="flex sticky top-0 justify-between px-2 items-center backdrop-blur-sm w-full text-lg">
					<Link href={"/nav/category" + "#" + encodeURI(c.name)}>
						<m.span
							whileTap={{scale:0.7}}
							className="flex sticky top-0 items-center backdrop-blur-sm w-full"
						>
							<DynamicIcon name={c.icon} />
							<span className="px-2">{c.name}</span>
						</m.span>
					</Link>
					<span onClick={changeCategoryOpenState}>
						<m.div animate={categoryOpen ? { rotate: 90 } : {}}>
							<FaAngleRight />
						</m.div>
					</span>
				</a>
				<m.ul animate={categoryOpen ? {} : { opacity: 0, height: 0 }} transition={{ duration: 0.1 }}>
					{
						// subcategory sub items
					}
					{subCategory.map(({ name }) => {
						return (
							<li key={"sidebarNavigationSubcategoryItems:" + encodeURI(name)}>
								<Link href={"/nav/category" + "#" + encodeURI(name)}>
									<span
										className="flex sticky top-0 justify-between px-2 items-center backdrop-blur-sm w-full text-lg"
									>
										<span className="flex sticky top-0 items-center backdrop-blur-sm w-full">
											<BsArrowReturnRight />
											<span className="px-2 text-base">{name}</span>
										</span>
									</span>
								</Link>
							</li>
						)

					})}
				</m.ul>
			</>
		)
	}
}

