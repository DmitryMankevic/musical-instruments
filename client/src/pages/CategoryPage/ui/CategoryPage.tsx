import { useLayoutEffect, type JSX } from "react";

export  function CategoryPage(): JSX.Element {

useLayoutEffect(() => {
    document.title = "Страница выбранной категории товаров";
  }, []);

  return (
    <div>
        
      CategoryPage
    </div>
  )
}
