import { DynamicIcon } from "../widgets/dynamicIcons";
import LinkCard from "../widgets/linkCard"
import { useState } from "react";
import { getSubcategoryByName, getLinkByName } from "../../lib/nav";

import { LayoutGroup, m } from "framer-motion";
import { off } from "process";

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
      const links = getLinkByName(c.name)

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
                        {links.map(({ id, url, title, description, icon, tags }): JSX.Element => {
                              return (
                                    <div key={"navigationMainPageLinksCard:" + title.toString()}>
                                          <LinkCard id={id} url={url} title={title} description={description} icon={icon} tags={tags} />
                                    </div>
                              )
                        })}
                  </div>
                  <div className="my-1.5">
                        <LayoutGroup
                        >
                              <span
                                    className="py-1 px-2 rounded-full bg-zinc-300 dark:bg-zinc-700"
                              >

                                    {subCategory.map(
                                          ({ name }): JSX.Element => {
                                                return (
                                                      <m.span
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
                        </LayoutGroup>
                  </div>

                  {subCategory.map(({ name }): JSX.Element => {
                        const links = getLinkByName(name)
                        return (
                              <span hidden={name != currentSubcategory} key={"navigationMainPageDivOfLinksOfSubcategory:" + encodeURI(name)}>
                                    <div
                                          className="flex max-w-4xl flex-wrap items-center content-start sm:w-full"
                                    >
                                          {links.map(({ id, url, title, description, icon, tags }): JSX.Element => {
                                                return (
                                                      <div key={"navigationMainPageLinksCard:" + id.toString()}>
                                                            <LinkCard id={id} url={url} title={title} description={description} icon={icon} tags={tags} />
                                                      </div>
                                                )
                                          })}

                                    </div>
                              </span>
                        )
                  })}
            </>
      )
}