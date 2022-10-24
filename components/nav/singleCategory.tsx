import { DynamicIcon } from "../widgets/dynamicIcons";
import LinkCard from "../widgets/linkCard"

import { useEffect,useState } from "react";

export default function SingleCategory(c: {
      name: string;
      description: string;
      icon: string
      hidden: boolean;
}): JSX.Element {

      // get links of the current category from the api /api/getLinksByCategory
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
            </>
      )
}