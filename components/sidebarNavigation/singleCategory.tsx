import Link from "next/link";
import { DynamicIcon } from "../widgets/dynamicIcons";
import { m } from "framer-motion";

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
            <Link href={"/nav/category" + "#" + encodeURI(c.name)}>
                  <a className="flex sticky top-0 justify-between px-2 items-center backdrop-blur-sm w-full text-lg">
                        <m.span
                              whileTap={{ scale: 0.7 }}
                              className="flex sticky top-0 items-center backdrop-blur-sm w-full"
                        >
                              <DynamicIcon name={c.icon} />
                              <span className="px-2">{c.name}</span>
                        </m.span>
                  </a>
            </Link>
      )
}