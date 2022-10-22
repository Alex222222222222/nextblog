import Link from "next/link";
import { BsFillArrowRightCircleFill } from "react-icons/bs"


export default function LinkCard(l: {
      id: number;
      url: string;
      title: string;
      description: string;
      icon: string;
      tags: string[];
}): JSX.Element {
      return (
            <div
                  className="w-60 py-2 text-left my-1 h-24 px-3
                  border-slate-900 rounded-xl border dark:border-slate-50
                  shadow-sm dark:shadow-slate-50 shadow-slate-900
                  bg-white dark:bg-zinc-600
                  mr-4
                  "
            >
                  <div className="h-14 w-full flex">
                        <img
                              className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 left-0 top-0"
                              src={l.icon}
                              alt={l.title}
                              width="48"
                              height="48">
                        </img>
                        <Link href={"/links/"+l.id.toString()}>
                        <div className="ml-3 mt-0.5">
                              <p className="truncate w-40 text-lg">{l.title}</p>
                              <p className="truncate w-40 text-sm text-gray-600 dark:text-gray-200">
                                    {l.description}
                              </p>
                        </div>
                        </Link>
                  </div>

                  <hr className="h-px bg-gray-600 border-0 dark:bg-gray-200" />

                  <div className="flex">
                        <p className="mt-1 truncate w-52 text-sm flex">
                              {
                                    l.tags.map((value): JSX.Element => {
                                          return (
                                                <span key={"mainNavigationPageInsideLinkCardTags:" + value}>
                                                      <Link href={"/tags#" + encodeURI(value)}>
                                                            <span className="rounded-full bg-gray-200 dark:bg-zinc-700 px-2 mr-1">
                                                                  {value}
                                                            </span>
                                                      </Link>
                                                </span>
                                          )
                                    })
                              }
                        </p>
                        <span className="mt-1.5 h-4 w-4 rounded-full hover:cursor-pointer" onClick={
                              () => {
                                    window.open(l.url)
                              }
                        }>
                              <BsFillArrowRightCircleFill />
                        </span>
                  </div>
            </div>
      )
}