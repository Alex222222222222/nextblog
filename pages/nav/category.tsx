import nav from "../../nav.json"
import SingleCategory from "../../components/nav/singleCategory"
import CategoryWithSubcategories from "../../components/nav/categoryWithSubcategories"
import { getSubcategoryByName } from "../../lib/nav"

export default function Category(): JSX.Element {
      return (
            <>
                  {
                        nav.categories.map(({ name, description, fatherCategory, icon, hidden }) => {
                              if (fatherCategory == "") {
                                    const subCategory = getSubcategoryByName(name)
                                    if (subCategory.length > 0) {
                                          return (
                                                <div className="mt-2 pl-2" key={"navigationCategoryMainPage:" + encodeURI(name)}>
                                                      <CategoryWithSubcategories name={name} description={description} icon={icon} hidden={hidden} />
                                                </div>
                                          )
                                    } else {
                                          return (
                                                <div className="mt-2 pl-2" key={"navigationCategoryMainPage:" + encodeURI(name)}>
                                                      <SingleCategory name={name} description={description} icon={icon} hidden={hidden} />
                                                </div>
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

