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
            <a
                  className="w-60 py-2 text-left my-1 h-24 px-3
                  border-slate-900 rounded-xl border dark:border-slate-50
                  shadow-sm dark:shadow-slate-50 shadow-slate-900
                  bg-white dark:bg-zinc-600
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
                        <div className="ml-3 mt-0.5">
                              <a
                                    href={l.url}
                                    className="text-lg"
                              >
                                    <p className="truncate w-40">{l.title}</p>
                              </a>
                              <a
                                    href={l.url}
                                    className="text-sm text-gray-600 dark:text-gray-200"
                              >
                                    <p className="truncate w-40">{l.description}</p>
                              </a>
                        </div>
                  </div>

                  <hr className="h-px bg-gray-600 border-0 dark:bg-gray-200" />

                  <div className="flex">

                        <p className="mt-1 truncate w-52 text-sm">
                              {
                                    l.tags.map((value): JSX.Element => {

                                          return (
                                                <Link href={"/tags#" + encodeURI(value)}>
                                                      <span className="rounded-full bg-gray-200 dark:bg-zinc-700 px-2 mr-1">
                                                            {value}
                                                      </span>
                                                </Link>
                                          )

                                    })
                              }
                        </p>



                        <a href={l.url} className="mt-1.5 h-4 w-4 rounded-full">
                              <BsFillArrowRightCircleFill />
                        </a>



                  </div>

            </a>
      )
}