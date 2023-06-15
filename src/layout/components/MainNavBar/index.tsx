import { useAuthenState } from "atom/authen";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { StorageKey } from "src/api/storage";
import { STRINGS } from "src/constant";
import styles from "../MainNavBar/index.module.scss";
import Router from "next/router";

const NavBar = () => {
  const route = useRouter();

  const menu = [
    {
      title: STRINGS["page.home.title"],
      route: "/",
    },
    {
      title: STRINGS["page.title.list_user"],
      route: "/list_user_page",
    },
    {
      title: STRINGS["page.title.list_cupon"],
      route: "/list_cupon_page",
    },
    {
      title: STRINGS["page.title.list_point"],
      route: "/list_point",
    },
    {
      title: STRINGS["page.title.list_store"],
      route: "/list_store",
      listRoute: ["/list_store", "/create_store", "/edit_store"],
    },
    {
      title: STRINGS["list_coupon_for_month"],
      route: "/list_coupon_for_month",
      listRoute: ["/list_coupon_for_month", "/create_coupon"],
    },
    {
      title: "Banner sản phẩm nổi bật",
      route: "/list_banner_featured_products",
      listRoute: [
        "/list_banner_featured_products",
        "/create_banner_featured_products",
        "/detail_banner_featured_products",
        "/edit_banner_featured_products",
        "/create_new_banner",
      ],
    },
    {
      title: "Danh mục sản phẩm",
      route: "/product_catalog",
      listRoute: [
        "/product_catalog",
        "/product_catalog/edit_product_catalog",
        "/product_catalog/new_product_catalog",
        "/product_catalog/product_catalog_details",
      ],
    },
  ];
  const handleMenu = (routeName: string) => {
    route.push(routeName);
  };
  const [authenState, setAuthen] = useAuthenState();

  const onLogOut = () => {
    Router.push("/login");
    window?.localStorage.removeItem(StorageKey.Authen);
    deleteCookie("shopDunkToken");
    setAuthen({
      ...authenState,
      token: undefined,
    });
  };

  const styleItem = (item: any) => {
    if (route.route == item.route) {
      return styles.menu_item_active;
    }
    if (item?.listRoute) {
      const isActive = item?.listRoute.includes(route.route);
      if (isActive) {
        return styles.menu_item_active;
      }
    }
    return styles.menu_item;
  };
  return (
    <div className={styles.navbar_ctrl}>
      <ul className={styles.list_menu}>
        {menu.map((item) => (
          <li
            key={item.route}
            onClick={() => handleMenu(item.route)}
            className={styleItem(item)}
          >
            <span>{item.title}</span>
          </li>
        ))}
        <div className={styles.logout} onClick={onLogOut}>
          {STRINGS["log.out"]}
        </div>
      </ul>
    </div>
  );
};

export default NavBar;