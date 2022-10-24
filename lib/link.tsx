import { URLLink, blankLink } from "../interface/link";
import nav from "../nav.json"

function linksIndexedById(): Map<number, URLLink> {
      const links: Map<number, URLLink> = new Map()
      nav.links.forEach(
            (link) => {
                  links.set(link.id, link)
            }
      )

      return links
}

export const allLinksIndexedById: Map<number, URLLink> = linksIndexedById()

export function getLinkFromID(name:String):URLLink{
      const id = parseInt(name as string)
      return allLinksIndexedById.get(id) ?? blankLink
}