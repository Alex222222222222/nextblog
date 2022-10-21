import Link from "next/link";
import { DynamicIcon } from "../widgets/dynamicIcons"

export default function SingleCategory(c: {
      name: string;
      icon: string
      cnt:number;
}): JSX.Element {
      return (
            <Link href={"/post/category" + "#" + encodeURI(c.name)}>
                  <a className="flex sticky top-0 justify-between px-2 items-center backdrop-blur-sm w-full text-lg">
                        <span className="flex sticky top-0 items-center backdrop-blur-sm w-full">
                              <DynamicIcon name={c.icon} />
                              <span className="px-2">{c.name}</span>
                        </span>
                        <span className="px-2.5 py-0.5 my-0.5 rounded-full bg-gray-100 dark:bg-gray-600">
                              {c.cnt}
                        </span>
                  </a>
            </Link>
      )
}