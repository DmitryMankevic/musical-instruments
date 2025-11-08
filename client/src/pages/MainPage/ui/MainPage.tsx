import { useEffect, useState, type JSX } from "react";
import Carousel from "@/widgets/Carousel/ui/Carousel";
import { Container, Row, Col, Button } from "react-bootstrap";
import CategoryCard from "@/widgets/Category/CategoryCard/ui/CategoryCard";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/hook";
import { getAllCategoriesThunk } from "@/entities/category/redux/categoryThunk";
import CategoryCreateModalForm from "@/widgets/Category/CategoryCreateModalForm/ui/CategoryCreateModalForm";

export function MainPage(): JSX.Element {
  const categoriesArr = useAppSelector(
    (state) => state.categories.categoriesArr
  );
  const isAdmin = useAppSelector(
    (state) => state.user.isAdmin
  );

  const [showCreateModal, setShowCreateModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Категории";
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);


  return (
    <Container className="py-4">
      <h3 className="text-center mb-4">Добро пожаловать в наш Магазин!</h3>
      <Carousel />
      <h2 className="text-center mb-4">Категории</h2>

      <Row xs={1} md={2} lg={3} className="g-4">
        {categoriesArr.map((elem) => (
          <Col key={elem.id}>
            <CategoryCard id={elem.id} name={elem.name} photo={elem.photo} isAdmin={isAdmin}/>
          </Col>
        ))}
        {isAdmin === true && (
          <Col>
            <Button
              variant="outline-dark"
              className="w-100 h-100 d-flex align-items-center justify-content-center"
              style={{ minHeight: "120px" }}
              onClick={() => setShowCreateModal(true)}
            >
              Создать новую категорию
            </Button>
          </Col>
        )}
      </Row>
      <CategoryCreateModalForm show={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </Container>
  );
}
