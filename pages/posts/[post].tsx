import { getAllPostIdsFromSortedPostData } from "../../lib/posts"

export default function Post({post}:{
      post:string
}):JSX.Element{
      return (<></>)
}

export async function getStaticProps({ params }: {
      params: {
            post: string
      }
}) {
      return {
            props:{
                  post:""
            }
      }
}

export async function getStaticPaths() {
      const ids = getAllPostIdsFromSortedPostData()
      return {
            paths: ids.map((id) => {
                  return {
                        params: {
                              post: encodeURI(id)
                        }
                  }
            }),
            fallback: false,
      }
}