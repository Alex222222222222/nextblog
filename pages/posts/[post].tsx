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
      return {
            paths: [
                  {
                        params: {
                              post: "1"
                        }
                  }
            ],
            fallback: false,
      }
}