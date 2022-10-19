import { DynamicIcon } from "../../store/dynamicIcons"
import { FaAngleRight, FaAngleDown } from "react-icons/fa"
import { useState } from "react";
import { BsArrowReturnRight } from "react-icons/bs"
import Link from "next/link";

export function SubCategory(c: {
      name: string;
      description: string;
      subCategory: string[];
      icon: string
      hidden: boolean;
}): JSX.Element {
      const [categoryOpen, setCategoryOpen] = useState(false)
      function changeCategoryOpenState() {
            setCategoryOpen(!categoryOpen)
      }

      if (c.hidden) {
            // TODO user authentication required
            return (
                  <></>
            )
      } else {
            return (
                  <>
                        <a className="flex sticky top-0 justify-between px-2 items-center backdrop-blur-sm w-full text-lg">
                              <Link href={"/category" + "#" + encodeURI(c.name)}>
                                    <span
                                          className="flex sticky top-0 items-center backdrop-blur-sm w-full"
                                    >
                                          <DynamicIcon name={c.icon} />
                                          <span className="px-2">{c.name}</span>
                                    </span>
                              </Link>
                              <span onClick={changeCategoryOpenState}>
                                    {categoryOpen ? <FaAngleDown /> : <FaAngleRight />}
                              </span>
                        </a>
                       
                  </>
            )
      }
}

