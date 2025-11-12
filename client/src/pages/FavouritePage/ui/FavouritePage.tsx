import { useEffect, useLayoutEffect, type JSX } from "react";
import styles from "./FavouritePage.module.css";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { getAllByUserIdThunk } from "@/entities/favourites/redux/favouritesThunk";
import FavouriteCard from "@/widgets/Favourite/ui/FavouriteCard";

export function FavouritePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { items: favouritesArr } = useAppSelector((state) => state.favourites);

  const user = useAppSelector((state) => state.user.user);
  const userName = user?.fullName;

  useEffect(() => {
    dispatch(getAllByUserIdThunk());
  }, [dispatch]);

  useLayoutEffect(() => {
    document.title = "Страница избранного";
  }, []);

  return (
    <>
      {" "}
      <div className={styles.container}>
        <h3 className={styles.container}>
          Страница вашего избранного, {userName}
        </h3>
        <div className={styles.itemsContainer}>
          {favouritesArr.length > 0 ? (
            favouritesArr.map((item) => <FavouriteCard key={item.id} item={item} />)
          ) : (
            <p className={styles.noItems}>В избранном пока ничего нет</p>
          )}
        </div>
      </div>
    </>
  );
}
