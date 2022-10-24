import { useState, useEffect} from "react"

import LinkCard from "../widgets/linkCard"

export default function LinksOfTags({ name }: {
      name: string
}): JSX.Element {

      // get links of the current tag from the api /api/getLinksByTag
      const [links, setLinks] = useState<number[]>([])
      const [reqSuccess, setReq] = useState(false)
      useEffect(
            () => {
                  if (!reqSuccess) {
                        fetch(`/api/getLinksByTag?tag=${name}`)
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
                  {links.map((value): JSX.Element => {
                        return (
                              <div key={"tagsMainPageLinksCard:" + value.toString()}>
                                    <LinkCard name={value.toString()} />
                              </div>
                        );
                  })}
            </>
      );
}