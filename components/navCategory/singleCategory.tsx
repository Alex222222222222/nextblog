import { DynamicIcon } from "../widgets/dynamicIcons";
import LinkCard from "../widgets/linkCard"
import nav from "../../nav.json"

export default function SingleCategory(c: {
      name: string;
      description: string;
      icon: string
      hidden: boolean;
      links: number[];
}): JSX.Element {
      return (
            <div className="mt-2 pl-2">
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
                        {c.links.map((value: number): JSX.Element => {
                              const l = nav.links[value.toString() as keyof typeof nav.links];
                              return (
                                    <LinkCard id={l.id} url={l.url} title={l.title} description={l.description} icon={l.icon} tags={l.tags} />
                              )
                        })}
                  </div>
            </div>
      )
}