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
                                                <div className="mt-2 pl-2" key={"navigationCategoryMainPage:" + encodeURI(name)}>
                                                      <CategoryWithSubcategories name={name} description={description} icon={icon} hidden={hidden} links={links} subCategory={subCategory} />
                                                </div>
                                          )
                                    } else {
                                          return (
                                                <div className="mt-2 pl-2" key={"navigationCategoryMainPage:" + encodeURI(name)}>
                                                      <SingleCategory name={name} description={description} icon={icon} hidden={hidden} links={links} />
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

