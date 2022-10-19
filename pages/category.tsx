import Welcome from "../components/widgets/welcome"
import nav from "../nav.json"
import SingleCategory from "../components/navCategory/singleCategory"
import CategoryWithSubcategories from "../components/navCategory/categoryWithSubcategories"

export default function Category(): JSX.Element {
      return (
            <>
                  {
                        nav.categories.map(({ name, description, fatherCategory, subCategory, links, icon, hidden }) => {
                              if (fatherCategory == "") {
                                    if (subCategory.length > 0) {
                                          return (
                                                <CategoryWithSubcategories name={name} description={description} icon={icon} hidden={hidden} links={links} subCategory={subCategory} />
                                          )
                                    } else {
                                          return (
                                                <SingleCategory name={name} description={description} icon={icon} hidden={hidden} links={links} />
                                          )
                                    }
                              } else {
                                    return ""
                              }

                        })
                  }
            </>
      )
}

