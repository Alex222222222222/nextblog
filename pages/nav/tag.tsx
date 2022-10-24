import TagCategoryWithName from "../../components/nav/tagCategoryWithName"
import { getAllTags } from "../../lib/tag"

export function getStaticProps(): {
      props: {
            allTags: string[]
      }
} {
      return {
            props: {
                  allTags: getAllTags()
            }
      }
}

export default function Tag({ allTags }: {
      allTags: string[]
}): JSX.Element {

      return (
            <div
                  className="ml-2"
            >
                  {allTags?.map((value): JSX.Element => {
                        return (
                              <div
                                    key={"tagsMainPageLinksOfTagsWithName:" + value}
                              >
                                    <TagCategoryWithName name={value} />
                              </div>
                        )
                  }
                  )}
            </div>
      )
}