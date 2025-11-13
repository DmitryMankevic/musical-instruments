import { useEffect, useState, type JSX } from "react";
import Carousel from "@/widgets/Carousel/ui/Carousel";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import CategoryCard from "@/widgets/Category/CategoryCard/ui/CategoryCard";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/hook";
import { getAllCategoriesThunk } from "@/entities/category/redux/categoryThunk";
import CategoryCreateModalForm from "@/widgets/Category/CategoryCreateModalForm/ui/CategoryCreateModalForm";
import styles from "./MainPage.module.css";

export function MainPage(): JSX.Element {
  const categoriesArr = useAppSelector(
    (state) => state.categories.categoriesArr
  );
  const isAdmin = useAppSelector((state) => state.user.isAdmin);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    document.title = "Категории";
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  return (
    <>
      <Container className="py-4">
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
        <Card
          id="instrument-rental-card"
          style={{
            width: "100%",
            marginTop: "2rem",
            boxShadow: "0 14px 12px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        >
          <Card.Img
            variant="top"
            src="rennt.png"
            style={{
              height: "470px", 
              objectFit: "cover", 
              objectPosition: "top", 
              marginBottom: '1rem',
            }}
          />
          <Card.Body>
            <Card.Title>
             <h4> Долгожданный прокат музыкальных инструментов</h4>
            </Card.Title>
             <Card.Text
          className={`${styles.formalAnnouncement} ${isExpanded ? styles.expanded : ''}`}
        >
          <p>Уважаемые клиенты и партнёры! С большим удовольствием сообщаем,
          что с начала 2026 года в ассортименте услуг "МузПортал" официально
          запускается служба краткосрочного проката музыкальных
          инструментов. Данное решение принято в ответ на многочисленные
          обращения наших клиентов и в рамках стратегии расширения
          доступности музыкального образования и творчества для широкой
          аудитории. Мы убеждены, что знакомство с музыкой не должно
          зависеть от возраста, уровня подготовки или финансовых
          возможностей.</p>
{isExpanded && (
            <>
          <p>Теперь каждый желающий сможет: протестировать
          инструмент перед покупкой, взять оборудование на время обучения,
          репетиции или выступления, подарить себе или близким возможность
          попробовать новое музыкальное направление без значительных
          первоначальных вложений. В прокат будут выдаваться высококачественные,
          профессионально настроенные и технически проверенные инструменты:
          акустические и электрогитары, укулеле, цифровые пианино, струнные
          (скрипки, альты), духовые (флейты, кларнеты, саксофоны), ударные
          установки и сопутствующие аксессуары. Все инструменты проходят
          предварительную диагностику и обслуживание.</p>

          
              <p>Условия проката разработаны с учётом комфорта и прозрачности:
              гибкие сроки аренды — от 7 дней, фиксированная стоимость без скрытых платежей,
              минимальный страховой депозит, возможность, при необходимости, выкупа инструмента в
              течение срока аренды. Мы выражаем искреннюю благодарность нашей
              аудитории за доверие, активность и поддержку, которые стали
              основой для реализации этого проекта.</p>

              <p>Надеемся, что новая услуга станет важным шагом в развитии музыкальной культуры и поможет
              многим открыть для себя радость игры на настоящем инструменте. С
              полной информацией о правилах, тарифах и доступных позициях вы
              можете ознакомиться в нашем магазине по
              адресу: г. Калининград, проспект Победы, дом 17. С уважением, Команда "МузПортал"</p>
            </>
          )}
        </Card.Text>
         <div className="text-center mt-2">
          <Button
            variant="link"
            onClick={toggleExpanded}
            className="p-0"
            style={{ color: '#343941' }}
          >
            {isExpanded ? 'Скрыть' : 'Показать сообщение полностью'}
          </Button> 
          </div>
             <br />
            <Button
      variant="outline-dark"
      className="w-100"
      onClick={() => setIsModalOpen(true)}
    >Оставить заявку</Button>

    {/* МОДАЛЬНОЕ ОКНО ПРОКАТА*/}
    <Modal show={isModalOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Оставьте заявку на прокат</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img
          src="/ModalRenntPict.png" // ← замени на путь к твоей картинке
          alt="Прокат музыкальных инструментов"
          style={{
            width: '100%',
            maxWidth: '300px',
            height: 'auto',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        />
        <p>
          Заполните короткую форму, и наш менеджер свяжется с вами  для уточнения деталей проката. Напоминаем, что прокат
          инструментов будет осуществляется с начала 2026 года и только в пределах
          города Калининграда и области.
        </p>
          <br />
        <div className="text-start">
          <label className="form-label">Ваше имя</label>
          <input type="text" className="form-control mb-2" />
          <label className="form-label">Телефон или email</label>
          <input type="text" className="form-control mb-3" />
          <Button variant="dark" className="w-100" onClick={handleClose}>
            Отправить заявку
          </Button>
        </div>
      </Modal.Body>
    </Modal>
            {/* КАРТА */}
            <section
              className="map-section"
              style={{
                margin: "2rem 0",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <h4>Прокат музыкальных инструментов будет осуществляться</h4>
              <p>по адресу: г. Калининград, проспект Победы, дом 17</p>
              <br />
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
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
                    boxShadow: "0 14px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Адрес магазина — Калининград, пр-т Победы 17"
                ></iframe>
              </div>
            </section>
            <Card.Title>
              <h4> Представленые бренды </h4>
            </Card.Title>
            <Card.Img variant="top" src="TopBands.jpg" />
          </Card.Body>
        </Card>
      </>
    </>
  );
}
