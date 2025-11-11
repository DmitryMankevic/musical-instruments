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
          <Card.Img variant="top" src="girl.jpg" />
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
              <p>по адресу:</p>
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
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4607.22413746199!2d20.475878865911017!3d54.73403816005187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1762878947484!5m2!1sru!2sru"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                    boxShadow: '0 14px 12px rgba(0,0,0,0.1)', // опционально — тень для глубины
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Адрес магазина на карте"
                ></iframe>
              </div>
            </section>
          </Card.Body>
        </Card>
      </>
    </>
  );
}
