import nav from "../nav.json"

export function getAllTags():string[] {

	const tagsM:Map<string,boolean> = new Map()
	nav.links.forEach((value) => {
		value.tags.forEach((value) => {
			tagsM.set(value,true)
		})
	})

      return Array.from(tagsM.keys())
}