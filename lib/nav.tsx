import nav from "../nav.json"

export function getCategoryByName(name: string) {
      for (let c of nav.categories) {
            if (c.name == name) {
                  return c
            }
      }
      return null
}

export function getSubcategoryByName(name: string): {
      name: string;
      description: string;
      icon: string
      hidden: boolean;
}[] {
      var res = []
      for (let c of nav.categories) {
            if (c.fatherCategory == name) {
                  const _ = res.push({
                        name: c.name,
                        description: c.description,
                        icon: c.icon,
                        hidden: c.hidden,
                  })
            }
      }

      return res
}

const allLinksOfCategory: Map<string, number[]> = getAllLinksOfCategory()

function getAllLinksOfCategory():Map<string,number[]> {
      const links: Map<string, number[]> = new Map()
      nav.links.forEach(
            (link, index) => {
                  link.category.forEach(
                        (category) => {
                              if (links.has(category)) {
                                    links.get(category)?.push(index)
                              } else {
                                    links.set(category, [index])
                              }
                        }
                  )
            }
      )

      return links
}

export function getLinkByCategory(name: string):number[]{
      return allLinksOfCategory.get(name) ?? []
}