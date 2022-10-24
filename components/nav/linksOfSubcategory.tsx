import { useState, useEffect } from "react"

import LinkCard from "../widgets/linkCard"

export default function LinksOfSubcategory({ name }: {
      name: string
}): JSX.Element {

      // get all links of the current subcategory from the api /api/getLinksByCategory
      const [links, setLinks] = useState<number[]>([])
      const [reqSuccess, setReq] = useState(false)
      useEffect(
            () => {
                  if (!reqSuccess) {
                  fetch(`/api/getLinksByCategory?category=${name}`)
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
            <div
                  className="flex max-w-4xl flex-wrap items-center content-start sm:w-full"
            >
                  {links.map((value): JSX.Element => {
                        return (
                              <div key={"navigationMainPageLinksCard:" + value.toString()}>
                                    <LinkCard name={value.toString()}  />
                              </div>
                        )
                  })}

            </div>
      )

}