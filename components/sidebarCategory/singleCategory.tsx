import Link from "next/link";
import { DynamicIcon } from "../../store/dynamicIcons"

export function SingleCategory(c: {
      name: string;
      description: string;
      icon: string
      hidden: boolean;
}): JSX.Element {
      // TODO user authentication required
      if (c.hidden) {
            return (
                  <></>
            )
      }
      return (
            <Link href={"/category" + "#" + encodeURI(c.name)}>
                  <a className="flex sticky top-0 justify-between px-2 items-center backdrop-blur-sm w-full text-lg">
                        <span className="flex sticky top-0 items-center backdrop-blur-sm w-full">
                              <DynamicIcon name={c.icon} />

                              {
                                    // TODO the Hydration bug here
                              }
                              <span className="px-2">{c.name}</span>
                        </span>
                  </a>
            </Link>
      )
}