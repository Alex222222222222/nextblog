import { useState } from "react"
import { BsFillBookmarksFill, BsChevronRight } from "react-icons/bs"

import { m } from "framer-motion"

import LinksOfTags from "./linksOfTags"

export default function TagCategoryWithName({ name }: {
      name: string
}): JSX.Element {

      const [openState, setOpenState] = useState(false)

      return (
            <>
                  <div className="flex text-xl">
                        <div className="grid justify-center items-center">
                        <BsFillBookmarksFill />
                        </div>
                        <span className="px-2 w-48">{name}</span>
                        <m.div
                              className="grid justify-center items-center"
                              animate={openState ? { rotate: 90 } : { rotate: 0 }}
                              onClick={() => { setOpenState(!openState) }}
                        >
                              <BsChevronRight />
                        </m.div>
                  </div>

                  <div
                        key={"tagsMainPageLinksOfTags:" + name}
                        className="flex flex-wrap"
                  >
                        {(openState)?(
                              <LinksOfTags name={name} />
                        ):(
                              <></>
                        )}
                  </div>
            </>
      )
}