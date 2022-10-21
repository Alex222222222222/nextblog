import { DynamicIcon } from "../widgets/dynamicIcons"
import { FaAngleRight, FaAngleDown } from "react-icons/fa"
import { useState } from "react";
import { BsArrowReturnRight } from "react-icons/bs"
import Link from "next/link";
import { getSubcategoryByName } from "../../store/nav";

import { motion } from "framer-motion";

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
                              <Link href={"/navigation" + "#" + encodeURI(c.name)}>
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
                        <ul>
                              {
                                    // subcategory sub items
                              }
                              {subCategory.map(({ name }) => {
                                    return (
                                          <li hidden={!categoryOpen} key={encodeURI(c.name)}>
                                                <Link href={"/navigation" + "#" + encodeURI(c.name)}>
                                                      <span
                                                            className="flex sticky top-0 justify-between px-2 items-center backdrop-blur-sm w-full text-lg"
                                                      >
                                                            <motion.div layout transition={{
                                                                  type: "spring",
                                                                  stiffness: 700,
                                                                  damping: 30,
                                                                  duration: 2,
                                                            }} />
                                                            <span className="flex sticky top-0 items-center backdrop-blur-sm w-full">
                                                                  <BsArrowReturnRight />
                                                                  <span className="px-2 text-base">{name}</span>
                                                            </span>
                                                      </span>
                                                </Link>
                                          </li>
                                    )

                              })}
                        </ul>
                  </>
            )
      }
}

