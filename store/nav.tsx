import nav from "../nav.json"

export function getCategoryByName(name:string) {
      for (let c of nav.categories) {
            if (c.name == name){
                  return c
            }
      }
      return null
}