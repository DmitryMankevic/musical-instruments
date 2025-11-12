import { useEffect, useState, type JSX } from "react";
import Carousel from "@/widgets/Carousel/ui/Carousel";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import CategoryCard from "@/widgets/Category/CategoryCard/ui/CategoryCard";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/hook";
import { getAllCategoriesThunk } from "@/entities/category/redux/categoryThunk";
import CategoryCreateModalForm from "@/widgets/Category/CategoryCreateModalForm/ui/CategoryCreateModalForm";

export function MainPage(): JSX.Element {
  const categoriesArr = useAppSelector(
    (state) => state.categories.categoriesArr
  );
  const isAdmin = useAppSelector((state) => state.user.isAdmin);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Категории";
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  return (
    <>
      <Container className="py-4">
        <h3 className="text-center mb-4">Добро пожаловать в наш Магазин!</h3>
        <Carousel />
        <br />
        <h2 className="text-center mb-4">Категории товаров</h2>

        <Row xs={1} md={2} lg={3} className="g-4">
          {categoriesArr.map((elem) => (
            <Col key={elem.id}>
              <CategoryCard
                id={elem.id}
                name={elem.name}
                photo={elem.photo}
                isAdmin={isAdmin}
              />
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
              <br />
            </Col>
          )}
        </Row>
        <CategoryCreateModalForm
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </Container>
      <>
        <Card id="instrument-rental-card" style={{ width: "100%" }}>
          <Card.Img variant="top" src="rennt.png" />
          <Card.Body>
            <Card.Title>
              Долгожданный прокат музыкальных инструментов
            </Card.Title>
            <Card.Text>
              Музыка теперь доступна каждому! Мы рады сообщить прекрасную
              новость, которую так долго ждали наши клиенты и все любители
              музыки: у нашего магазина официально запускается служба проката
              музыкальных инструментов! Это стало возможно благодаря вашим
              многочисленным запросам, поддержке и вере в то, что музыка должна
              быть доступной — независимо от возраста, опыта или бюджета. И вот
              грядёт он — момент, когда мечта превращается в реальность.
            </Card.Text>
            <Button variant="outline-dark" className="w-100" href="/">
              Оставить заявку
            </Button>
              {/* КАРТА */}
            <section
              className="map-section"
              style={{ margin: "2rem 0", textAlign: "center", alignItems: 'center' }}
            >
              <h5>Прокат музыкальных инструментов будет осуществляться</h5>
              <p>по адресу: г. Калининград, проспект Победы, дом 17</p>
               <br />
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: 'flex',
                  justifyContent: 'center', 
                  width: "100%",
                  paddingTop: "56.25%" /* Соотношение 16:9 */,
                }}
              >
                <iframe
  src="https://www.google.com/maps?q=Калининград,+проспект+Победы,+17&z=15&output=embed"
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0,
    boxShadow: "0 14px 12px rgba(0, 0, 0, 0.1)"
  }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Адрес магазина — Калининград, пр-т Победы 17"
>

</iframe>
              </div>
            </section>
          </Card.Body>
        </Card>
      </>
    </>
  );
}
