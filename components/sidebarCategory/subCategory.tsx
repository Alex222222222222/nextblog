import { DynamicIcon } from "../widgets/dynamicIcons"
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
                              {c.subCategory.map((value: string) => {
                                    return (
                                          <li hidden={!categoryOpen} key={encodeURI(c.name)}>
                                                <Link href={"/navigation" + "#" + encodeURI(c.name)}>
                                                      <span
                                                            className="flex sticky top-0 justify-between px-2 items-center backdrop-blur-sm w-full text-lg"
                                                      >

                                                            <span className="flex sticky top-0 items-center backdrop-blur-sm w-full">
                                                                  <BsArrowReturnRight />
                                                                  <span className="px-2 text-base">{value}</span>
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

