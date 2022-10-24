import { DynamicIcon } from "../widgets/dynamicIcons";
import LinkCard from "../widgets/linkCard"
import { useEffect, useState } from "react";
import { getSubcategoryByName } from "../../lib/nav";

import LinksOfSubcategory from "./linksOfSubcategory";

import { m } from "framer-motion";

export default function CategoryWithSubcategories(c: {
      name: string;
      description: string;
      icon: string
      hidden: boolean;
}): JSX.Element {
      const [currentSubcategory, setSubcategory] = useState("")
      function changeSubcategory(name: string) {
            setSubcategory(name)
      }

      const subCategory = getSubcategoryByName(c.name)

      // get all links of the current subcategory from the api /api/getLinksByCategory
      const [links, setLinks] = useState<number[]>([])
      const [reqSuccess, setReq] = useState(false)
      useEffect(
            () => {
                  if (!reqSuccess) {
                        fetch(`/api/getLinksByCategory?category=${c.name}`)
                              .then(res => res.json())
                              .then(
                                    (result) => {
                                          setLinks(result)
                                          setReq(true)
                                    }
                              )
                  }
            }
      )

      // TODO add animation when open sub category
      return (
            <>
                  <span
                        className="flex items-center w-full text-lg text-gray-700 dark:text-gray-50"
                        id={encodeURI(c.name)}
                  >
                        <span className="pr-2">
                              <DynamicIcon name={c.icon} ></DynamicIcon>
                        </span>
                        {c.name}
                  </span>
                  <div className="flex max-w-4xl flex-wrap items-center content-start sm:w-full">
                        {links.map((value): JSX.Element => {
                              return (
                                    <div key={"navigationMainPageLinksCard:" + value.toString()}>
                                          <LinkCard name={value.toString()} />
                                    </div>
                              )
                        })}
                  </div>

                  <div className="my-1.5">
                        <span
                              className="py-1 px-2 rounded-full bg-zinc-300 dark:bg-zinc-700"
                        >
                              {subCategory.map(
                                    ({ name }): JSX.Element => {
                                          return (
                                                <m.span
                                                      transition={{ duration: 0.5 }}
                                                      variants={{
                                                            initial: {
                                                                  background: ((name == currentSubcategory) ? "rgb(161 161 170)" : "rgb(212 212 216)")
                                                            },
                                                            on: { background: "rgb(161 161 170)" },
                                                            off: { background: "rgb(212 212 216)" }
                                                      }}
                                                      initial={"initial"}
                                                      animate={(name == currentSubcategory) ? "on" : "off"}
                                                      key={"navigationMainPageSubcategorySwitcher:" + name}
                                                      id={encodeURI(name)}
                                                      className="py-0.5 px-2 rounded-full dark:bg-zinc-500"
                                                      onClick={() => {
                                                            if (name == currentSubcategory) {
                                                                  changeSubcategory("")
                                                            } else {
                                                                  changeSubcategory(name)
                                                            }
                                                      }}
                                                >
                                                      {name}
                                                </m.span>
                                          )
                                    }
                              )}

                        </span>
                  </div>

                  {subCategory.map(({ name }): JSX.Element => {
                        return (
                              <m.div
                                    variants={{
                                          off: { opacity: [1, 0, 0, 0, 0, 0] },
                                          on: { opacity: 1 }
                                    }}
                                    initial={false}
                                    hidden={name != currentSubcategory}
                                    animate={(name != currentSubcategory) ? "off" : "on"}
                                    key={"navigationMainPageDivOfLinksOfSubcategory:" + encodeURI(name)}
                              >
                                    <LinksOfSubcategory name={name} />
                              </m.div>
                        )
                  })}
            </>
      )
}