import { DynamicIcon } from "../widgets/dynamicIcons";
import LinkCard from "../widgets/linkCard"
import { useState } from "react";
import { getSubcategoryByName, getLinkByName } from "../../store/nav";

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
                        <span
                              className="
                        py-1 px-2 rounded-full
                        bg-zinc-300 dark:bg-zinc-700
                        "
                        >
                              {subCategory.map(
                                    ({ name }): JSX.Element => {
                                          if (name == currentSubcategory) {
                                                return (
                                                      <span
                                                            key={"navigationMainPageSubcategorySwitcher:" + name}
                                                            id={encodeURI(name)}
                                                            className="py-0.5 px-2 rounded-full bg-zinc-400 dark:bg-zinc-500"
                                                            onClick={() => {
                                                                  changeSubcategory(name)
                                                            }}
                                                      >
                                                            {name}
                                                      </span>
                                                )
                                          } else {
                                                return (
                                                      <span
                                                            key={"navigationMainPageSubcategorySwitcher:" + name}
                                                            id={encodeURI(name)}
                                                            className="px-2 py-0.5 rounded-full"
                                                            onClick={() => {
                                                                  changeSubcategory(name)
                                                            }}
                                                      >
                                                            {name}
                                                      </span>
                                                )
                                          }
                                    }
                              )}
                        </span>
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