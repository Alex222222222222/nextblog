export default function Link({link}:{
      link:string
}): JSX.Element {
      return (<></>)
}

export async function getStaticProps({ params }: {
      params: {
            link: string
      }
}) {
      return {
            props:{
                  link:""
            }
      }
}

export async function getStaticPaths() {
      return {
            paths: [
                  {
                        params: {
                              link: "1"
                        }
                  }
            ],
            fallback: false,
      }
}