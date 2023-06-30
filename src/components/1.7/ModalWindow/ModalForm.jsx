import React from "react";
import styles from "@/assets/styles/1.7/ModalForm.module.scss";
import { useState } from "react";

import { Select, DatePicker, TimePicker } from "antd";
import { useModel_1_7 } from "@/services/1_7store";
import { useTranslation, withTranslation } from "react-i18next";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

// Дата и время
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export const ModalForm = ({ active, setActive }) => {
  const {printTalons} = useModel_1_7()
  const [type, setType] = useState("time");
  const { Option } = Select;
  const PickerWithType = ({ type, onChange }) => {
    if (type === "time") return <TimePicker onChange={onChange} />;
    if (type === "date") return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
  };

  const { t } = useTranslation();
  
  // Верстка модального окна
  return (
    <div
      className={`${styles.modal} ${active ? styles.active : ""}`}
      onClick={() => setActive(false)}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}>
        <label className={styles.modal__label}>Новый талон</label>

        <Select
          className={`${styles.modal__selects} ${styles.customSelect}`}
          defaultValue="Услуга"
          onChange={handleChange}
          options={[
            {
              value: "Услуга 1",
              label: "Услуга 1",
            },
            {
              value: "Услуга 2",
              label: "Услуга 2",
            },
            {
              value: "Услуга 3",
              label: "Услуга 3",
            },
            {
              value: "Услуга 4",
              label: "Услуга 4",
            },
            {
              value: "Услуга 5",
              label: "Услуга 5",
            },
            {
              value: "Услуга 6",
              label: "Услуга 6",
            },
          ]}
          size="large"
        />
        <Select
          className={`${styles.modal__selects} ${styles.customSelect}`}
          defaultValue="Тип клиента"
          onChange={handleChange}
          options={[
            {
              value: "Юридическое лицо",
              label: "Юридическое лицо",
            },
            {
              value: "Физическое лицо",
              label: "Физическое лицо",
            },
          ]}
          size="large"
        />
        <Select
          className={`${styles.modal__selects} ${styles.customSelect}`}
          defaultValue="Окно"
          onChange={handleChange}
          options={[
            {
              value: "Окно 1",
              label: "Окно 1",
            },
            {
              value: "Окно 2",
              label: "Окно 2",
            },
            {
              value: "Окно 3",
              label: "Окно 3",
            },
            {
              value: "Окно 4",
              label: "Окно 4",
            },
            {
              value: "Окно 5",
              label: "Окно 5",
            },
          ]}
          size="large"
        />

        <DatePicker
          placeholder="Выберите дату"
          className={styles.modal__pickers}
          onChange={onChange}
          size="large"
        />

        <TimePicker
          placeholder="Выберите время"
          className={styles.modal__timePicker}
          type={type}
          onChange={(value) => console.log(value)}
          size="large"
        />

        <button className={styles.modal__button}>{t('newtalon.button2')}</button>
      </div>
    </div>
  );
};
