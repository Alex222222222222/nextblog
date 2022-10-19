import Welcome from "../components/widgets/welcome"
import nav from "../nav.json"
import SingleCategory from "../components/navCategory/singleCategory"

// TODO every category need a term id

export default function Category(): JSX.Element {
      return (
            <div className="w-full mx-4">
                  <Welcome>Welcome to Alex222222222222 Blog</Welcome>

                  {nav.categories.map(({ name, description, fatherCategory, subCategory, links,icon, hidden }) => {
                        if (fatherCategory == "") {
                              if (subCategory.length > 0) {
                                    return (
                                         <></> 
                                    )
                              } else {
                                    return (
                                          <SingleCategory name={name} description={description} icon={icon} hidden={hidden} links={links} />
                                    )
                              }
                        } else {
                              return ""
                        }

                  })}
            </div>
      )
}

