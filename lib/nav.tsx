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

export function getLinkByName(name: string):{
      id: number;
      url:string;
      title: string;
      description: string;
      icon: string
      tags:string[];
      category:string[];
}[]{
      var res = []
      for (let l of nav.links) {
            for (let cName of l.category){
                  if (name == cName) {
                        const _ = res.push(l)
                  }
            }
      }

      return res
}