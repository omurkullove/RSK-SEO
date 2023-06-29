import React from "react";
import logo from "@/assets/png/logo.png";
import styles from "@/assets/styles/1.7/Header.module.scss";
import search from "@/assets/png/search.png";
import { Avatar } from "antd";

export const UserHeader = () => {
  return (
    <div className={styles.user__header}>
      <div className="logo">
        <img className={styles.main__logo} src={logo} alt="logo" />
      </div>

      <div className="main__search">
        <img className={styles.search__logo} src={search} alt="logo" />
        <input
          className={styles.search__input}
          placeholder="Поиск по реквизитам"
          type="text"
        />
      </div>

      <div className={styles.user__avatar}>
        <Avatar size={45} icon />
        <p>Алина Тен</p>
      </div>
    </div>
  );
};
