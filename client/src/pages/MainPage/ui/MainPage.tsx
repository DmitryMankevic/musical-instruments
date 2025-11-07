import { useEffect, type JSX } from "react";
import Carousel from "@/widgets/Carousel/ui/Carousel";
import { Container, Row, Col } from "react-bootstrap";
import CategoryCard from "@/widgets/CategoryCard/ui/CategoryCard";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/hook";
import { getAllCategoriesThunk } from "@/entities/category/redux/categoryThunk";

export function MainPage(): JSX.Element {
  const categoriesArr = useAppSelector(
    (state) => state.categories.categoriesArr
  );

  const dispatch = useAppDispatch();

  // useLayoutEffect(() => {
  //   document.title = "Главная страница";
  // }, []);

  useEffect(() => {
    document.title = "Категории";
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  // if (loading === true) {
  //   return <Container className="py-5 text-center">Загрузка...</Container>;
  // }

  return (
    <Container className="py-4">
      <h3 className="text-center mb-4">Добро пожаловать в наш Магазин!</h3>
      <Carousel />
      <h2 className="text-center mb-4">Категории</h2>

      <Row xs={1} md={2} lg={3} className="g-4">
        {categoriesArr.map((elem) => (
          <Col key={elem.id}>
            <CategoryCard id={elem.id} name={elem.name} photo={elem.photo} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
