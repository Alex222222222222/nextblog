import { DynamicIcon } from "../widgets/dynamicIcons";
import LinkCard from "../widgets/linkCard"
import nav from "../../nav.json"
import { getLinkByName } from "../../store/nav";

export default function SingleCategory(c: {
      name: string;
      description: string;
      icon: string
      hidden: boolean;
}): JSX.Element {
      const links = getLinkByName(c.name)

      return (
            <>
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
                        {links.map(({id,url,title,description,icon,tags}): JSX.Element => {
                              return (
                                    <div key={"navigationMainPageLinksCard:" + title.toString()}>
                                          <LinkCard id={id} url={url} title={title} description={description} icon={icon} tags={tags} />
                                    </div>
                              )
                        })}
                  </div>
            </>
      )
}