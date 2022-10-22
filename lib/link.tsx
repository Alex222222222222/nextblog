import { URLLink, blankLink } from "../interface/link";
import nav from "../nav.json"

export function getLinkFromID(name:String):URLLink{
      for (let l of nav.links) {
            if (l.id.toString() == name) {
                  return l
            }
      }
      
      return blankLink
}