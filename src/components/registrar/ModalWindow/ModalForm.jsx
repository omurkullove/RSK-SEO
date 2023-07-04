import React from 'react';
import styles from '@/assets/styles/registrar/ModalForm.module.scss';
import { useState } from 'react';

import { Select, DatePicker, TimePicker } from 'antd';
import { useRegistrar } from '@/services/registrarStore';
import { useTranslation } from 'react-i18next';

const handleChange = (value) => {
   console.log(`selected ${value}`);
};

const handlePrintClick = () => {
   window.print();
 };

// Дата и время
const onChange = (date, dateString) => {
   console.log(date, dateString);
};

export const ModalForm = ({ active, setActive }) => {
   const { printTalons } = useRegistrar();
   const [type, setType] = useState('time');
   const { Option } = Select;
   const PickerWithType = ({ type, onChange }) => {
      if (type === 'time') return <TimePicker onChange={onChange} />;
      if (type === 'date') return <DatePicker onChange={onChange} />;
      return <DatePicker picker={type} onChange={onChange} />;
   };

   const { t } = useTranslation();

   // Верстка модального окна
   return (
      <div
         className={`${styles.modal} ${active ? styles.active : ''}`}
         onClick={() => setActive(false)}
      >
         <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
            <label className={styles.modal__label}>Новый талон</label>

            <Select
               className={`${styles.modal__selects} ${styles.customSelect}`}
               defaultValue='Услуги'
               onChange={handleChange}
               options={[
                  {
                     value: 'Кредитование',
                     label: 'Кредитование',
                  },
                  {
                     value: 'Обмен валют',
                     label: 'Обмен валют',
                  },
                  {
                     value: 'Денежные переводы',
                     label: 'Денежные переводы',
                  },
                  {
                     value: 'Выпуск карты',
                     label: 'Выпуск карты',
                  },
                  {
                     value: 'Получить перевод',
                     label: 'Получить перевод',
                  },
                  {
                     value: 'Открыть счет',
                     label: 'Открыть счет',
                  },
                  {
                     value: 'Операции с ценными бумагами',
                     label: 'Операции с ценными бумагами',
                  },
                  {
                     value: 'Исламское финансирование',
                     label: 'Исламское финансирование',
                  },
               ]}
               size='large'
            />
            <Select
               className={`${styles.modal__selects} ${styles.customSelect}`}
               defaultValue='Тип клиента'
               onChange={handleChange}
               options={[
                  {
                     value: 'Юридическое лицо',
                     label: 'Юридическое лицо',
                  },
                  {
                     value: 'Физическое лицо',
                     label: 'Физическое лицо',
                  },
               ]}
               size='large'
            />
            <Select
               className={`${styles.modal__selects} ${styles.customSelect}`}
               defaultValue='Окно'
               onChange={handleChange}
               options={[
                  {
                     value: 'Окно 1',
                     label: 'Окно 1',
                  },
                  {
                     value: 'Окно 2',
                     label: 'Окно 2',
                  },
                  {
                     value: 'Окно 3',
                     label: 'Окно 3',
                  },
                  {
                     value: 'Окно 4',
                     label: 'Окно 4',
                  },
                  {
                     value: 'Окно 5',
                     label: 'Окно 5',
                  },
               ]}
               size='large'
            />

            <DatePicker
               placeholder='Выберите дату'
               className={styles.modal__pickers}
               onChange={onChange}
               size='large'
            />

            <TimePicker
               placeholder='Выберите время'
               className={styles.modal__timePicker}
               type={type}
               onChange={(value) => console.log(value)}
               size='large'
            />

            <button onClick={handlePrintClick} className={styles.modal__button}>{t('newtalon.button2')}</button>
         </div>
      </div>
   );
};
