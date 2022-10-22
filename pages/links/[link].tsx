import { useEffect, useState } from "react"
import { URLLink, blankLink } from "../../interface/link"
import nav from "../../nav.json"
import Link from "next/link"

import { useWidth, minWidth, mainWindowWidth } from "../../lib/windowWidth"

export async function getStaticProps({ params }: {
      params: {
            link: string
      }
}): Promise<{
      props: {
            link: string,
      }
}> {
      return {
            props: {
                  link: params.link
            }
      }
}

export async function getStaticPaths() {
      const ids: {
            params: {
                  link: string
            }
      }[] = nav.links.map(({ id }) => {
            return {
                  params: {
                        link: id.toString()
                  }
            }
      })

      return {
            paths: ids,
            fallback: false,
      }
}

function getLinkData(id: string): URLLink {
      const [linkData, setData] = useState(blankLink)
      const [success, setSuccess] = useState(false)
      useEffect(
            () => {
                  if (!success) {
                        fetch("/api/getLinkData",
                              {
                                    method: 'POST',
                                    body: JSON.stringify(
                                          {
                                                id: id,
                                          }
                                    ),
                              }
                        )
                              .then((res) => res.json())
                              .then(
                                    (data) => {
                                          if (data) {
                                                setData(data)
                                                setSuccess(true)
                                          }
                                    }
                              )
                  }
            }
      )

      return linkData
}

export default function URLLinkPage({ link }: {
      link: string
}): JSX.Element {

      const l: URLLink = getLinkData(link)

      return (
            <>
                  <div className="w-full px-2 py-2 grid justify-center">
                        <div
                              className="border-solid border-2 rounded-lg border-violet-500 dark:border-sky-500 w-96 grid grid-cols-3 hover:cursor-pointer"
                              onClick={() => {
                                    window.open(l.url)
                              }}
                        >
                              <div className="grid justify-center items-center my-2">
                                    {(typeof l.icon !== "undefined") ? (
                                          <img
                                                className="w-full"
                                                src={l.icon}
                                          />
                                    ) : (<img
                                          className="w-full"
                                          src="/img/linkFallback.png"
                                    />)}
                              </div>
                              <div className="ml-4 col-span-2 grid justify-center items-center">
                                    <p className="truncate w-40 text-2xl">{l.title}</p>
                              </div>
                        </div>
                        <div
                              className="w-96 px-4"
                        >

                              {(l.description) ? (<>
                                    <div className="px-2">
                                          {l.description}
                                    </div>
                              </>) : (<></>)}
                              {(l.tags) ? (<>
                                    <div className="flex flex-wrap mt-2">
                                          {l.tags.map((value): JSX.Element => {
                                                return (
                                                      <Link href={"/tags#" + encodeURI(value)}>
                                                            <div
                                                                  className="flex mr-2"
                                                                  key={"linksDetailPageLinkTags:" + l.id.toString() + ":" + value}
                                                            >

                                                                  <div className="c-triangle-left text-orange-300 dark:text-amber-800" />
                                                                  <div className="grid justify-center h-6 items-center bg-orange-300 dark:bg-amber-800">
                                                                        <div className="mx-2">
                                                                              {value}
                                                                        </div>
                                                                  </div>

                                                            </div>
                                                      </Link>
                                                )
                                          })}
                                    </div>
                              </>) : (<></>)}
                              {(l.category) ? (<>
                                    <div className="flex flex-wrap mt-2">
                                          {l.category.map((value): JSX.Element => {
                                                return (
                                                      <Link href={"/tags#" + encodeURI(value)}>
                                                            <div
                                                                  className="flex mr-2"
                                                                  key={"linksDetailPageLinkTags:" + l.id.toString() + ":" + value}
                                                            >

                                                                  <div className="c-triangle-left text-emerald-400 dark:text-emerald-800" />
                                                                  <div className="grid justify-center h-6 items-center bg-emerald-400 dark:bg-emerald-800">
                                                                        <div className="mx-2">
                                                                              {value}
                                                                        </div>
                                                                  </div>

                                                            </div>
                                                      </Link>
                                                )
                                          })}
                                    </div>
                              </>) : (<></>)}
                        </div>
                  </div>
            </>
      )
}

