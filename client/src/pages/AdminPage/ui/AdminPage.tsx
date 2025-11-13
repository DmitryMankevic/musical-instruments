import { useEffect, useState, type JSX } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { getAllUsersThunk } from "@/entities/admin-users/redux/adminUsersThunk";
import { getAllItemsThunk } from "@/entities/item/redux/itemThunk";
import { getAllCategoriesThunk } from "@/entities/category/redux/categoryThunk";
import type { IItem } from "@/entities/item/model";

import UsersTable from "./components/UsersTable";
import ItemsTable from "./components/ItemsTable";
import CategoriesTable from "./components/CategoriesTable";
import AddItemModal from "./components/AddItemModal";
import EditItemModal from "./components/EditItemModal";
import CollapsibleSection from "./components/CollapsibleSection";

import style from "./AdminPage.module.css";
import type { ICategory } from "@/entities/category/model";
import EditCategoryModal from "./components/EditCategoryModal";
import AddCategoryModal from "./components/AddCategoryModal";

import OrdersTable from "./components/OrdersTable";
import { getOrdersThunk } from "@/entities/order/redux/orderThunk";

export function AdminPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { orders, loading: ordersLoading } = useAppSelector((s) => s.order);

  const { users, loading: usersLoading } = useAppSelector((s) => s.adminUsers);
  const {
    itemArr,
    loading: itemsLoading,
    totalPages,
    currentPage,
  } = useAppSelector((s) => s.item);
  const { categoriesArr, loading: catLoading } = useAppSelector(
    (s) => s.categories
  );

  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<IItem | null>(null);

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<ICategory | null>(null);

  useEffect(() => {
    dispatch(getAllUsersThunk());
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllItemsThunk({ page, limit: 7 }));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
    dispatch(getAllCategoriesThunk());
    dispatch(getOrdersThunk()); // ← ВАЖНО!
  }, [dispatch]);

  return (
    <div className={style.container}>
      <h2>Админ-панель</h2>

      {/*  Пользователи */}
      <CollapsibleSection title="👤 Все пользователи" defaultOpen={false}>
        <UsersTable
          users={users.map((user) => ({
            ...user,
            userInfo: user.userInfo
              ? {
                  ...user.userInfo,
                  phoneNumber: user.userInfo.phoneNumber ?? undefined,
                  country: user.userInfo.country ?? undefined,
                  city: user.userInfo.city ?? undefined,
                  address: user.userInfo.address ?? undefined,
                  birthDay: user.userInfo.birthDay ?? undefined,
                }
              : undefined,
          }))}
          loading={usersLoading}
        />
      </CollapsibleSection>

      {/*  Товары */}
      <CollapsibleSection title="📦 Все товары" defaultOpen={false}>
        <ItemsTable
          items={itemArr.map((item) => ({
            ...item,
            marker: item.marker ?? "",
          }))}
          loading={itemsLoading}
          totalPages={totalPages}
          currentPage={currentPage}
          page={page}
          setPage={setPage}
          openAddModal={() => setIsAddModalOpen(true)}
          openEditModal={(item) => setEditItem(item as IItem | null)}
        />
      </CollapsibleSection>

      {/*  Заказы */}
      <CollapsibleSection title="🧾 Заказы пользователей" defaultOpen={false}>
        <OrdersTable orders={orders} loading={ordersLoading} />
      </CollapsibleSection>

      {/*  Категории */}
      <CollapsibleSection title="🏷 Все категории" defaultOpen={false}>
        <CategoriesTable
          categories={categoriesArr}
          loading={catLoading}
          openAddModal={() => setIsAddCategoryOpen(true)}
          openEditModal={(cat) => setEditCategory(cat)}
        />

        {isAddCategoryOpen && (
          <AddCategoryModal onClose={() => setIsAddCategoryOpen(false)} />
        )}

        {editCategory && (
          <EditCategoryModal
            category={editCategory}
            onClose={() => setEditCategory(null)}
          />
        )}
      </CollapsibleSection>

      {/* === Модалки === */}
      {isAddModalOpen && (
        <AddItemModal
          onClose={() => setIsAddModalOpen(false)}
          categories={categoriesArr}
          page={page}
        />
      )}

      {editItem && (
        <EditItemModal
          item={{
            ...editItem,
            marker: editItem.marker ?? "",
          }}
          onClose={() => setEditItem(null)}
          page={page}
        />
      )}
    </div>
  );
}
