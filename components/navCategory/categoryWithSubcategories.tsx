import { DynamicIcon } from "../widgets/dynamicIcons";
import LinkCard from "../widgets/linkCard"
import nav from "../../nav.json"
import { useState } from "react";
import { getCategoryByName } from "../../store/nav";

export default function CategoryWithSubcategories(c: {
      name: string;
      description: string;
      icon: string
      hidden: boolean;
      subCategory: string[];
      links: number[];
}): JSX.Element {
      const [currentSubcategory, setSubcategory] = useState("")
      function changeSubcategory(name: string) {
            setSubcategory(name)
      }

      return (
            <div className="mt-2 pl-2">
                  <span
                        className="flex items-center w-full text-lg text-gray-700 dark:text-gray-50"
                        id={encodeURI(c.name)}
                  >
                        <span className="pr-2">
                              <DynamicIcon name={c.icon} ></DynamicIcon>
                        </span>
                        {c.name}
                  </span>
                  <span
                        className="
                        py-1 px-2 rounded-full
                        bg-zinc-300 dark:bg-zinc-700
                        "
                  >
                        {c.subCategory.map(
                              (value: string): JSX.Element => {
                                    if (value == currentSubcategory) {
                                          return (
                                                <span id={encodeURI(value)} className="py-0.5 px-2 rounded-full bg-zinc-400 dark:bg-zinc-500" onClick={() => {
                                                      changeSubcategory(value)
                                                }}>
                                                      {value}
                                                </span>
                                          )
                                    } else {
                                          return (
                                                <span id={encodeURI(value)} className="px-2" onClick={() => {
                                                      changeSubcategory(value)
                                                }}>
                                                      {value}
                                                </span>
                                          )
                                    }
                              }
                        )}
                  </span>

                  {c.subCategory.map((value: string): JSX.Element => {
                        const sc = getCategoryByName(value)
                        return (
                              <span hidden={value != currentSubcategory}>
                              <div
                                    className="flex max-w-4xl flex-wrap items-center content-start sm:w-full"
                              >
                                    {sc?.links.map((value1: number): JSX.Element => {
                                          const l = nav.links[value1.toString() as keyof typeof nav.links];
                                          return (
                                                      <LinkCard id={l.id} url={l.url} title={l.title} description={l.description} icon={l.icon} tags={l.tags} />
                                                
                                          )
                                    })}
                                    
                              </div>
                              </span>
                        )
                  })}
            </div>
      )
}