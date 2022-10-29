import { getAllCategoryOfPosts, getAllPostIDOfCategory } from "../../../lib/posts"

import PostDetailCard from "../../../components/widgets/postDetailCard"

export async function getStaticProps({ params }: {
      params: {
            category: string
      }
}): Promise<{
      props: {
            category: string,
            allPostIds: string[]
      }
}> {
      const name = decodeURI(params.category)

      return {
            props: {
                  category: name,
                  allPostIds: getAllPostIDOfCategory(name),
            }
      }
}

export async function getStaticPaths() {
      const postCategories = getAllCategoryOfPosts()
      return {
            paths: postCategories.map((value) => {
                  return {
                        params: {
                              category: encodeURI(value)
                        }
                  }
            }),
            fallback: false,
      }
}

export default function Post({ allPostIds, category }: {
      category: string,
      allPostIds: string[]
}): JSX.Element {
      return (<>
            <div
                  className="text-2xl font-bold mx-2"
            >
                  <h1>{category}</h1>
            </div>

            {allPostIds.map((value) => {
                  return (
                        <div key={"PostsCardInPostEachCategoryPage:" + value}>
                              <PostDetailCard id={value} />
                        </div>
                  )
            })}
      </>)
}