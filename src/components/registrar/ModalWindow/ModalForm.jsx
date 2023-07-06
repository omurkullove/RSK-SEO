import React from 'react';
import styles from '@/assets/styles/registrar/ModalForm.module.scss';
import { useState } from 'react';

import { Select, DatePicker, TimePicker } from 'antd';
import { useRegistrar } from '@/services/registrarStore';
import { useTranslation } from 'react-i18next';
import { useMain } from '@/services/MainStore';

const handleChange = (value) => {
   console.log(`selected ${value}`);
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
   const isDarkMode = useMain((state) => state.isDarkMode);

   const { t } = useTranslation();

   const [selectedValues, setSelectedValues] = useState({
      service: 'Услуги',
      clientType: 'Тип клиента',
      selectedWindow: 'Окно',
      date: null,
      time: null,
   });

   // Формируем HTML-разметку с выбранными данными
   const handlePrintClick = () => {
      const { service, clientType, selectedWindow, date, time } = selectedValues;

      // Создаем новое окно
      const printWindow = window.open('', '_blank');

      // Формируем HTML-разметку с выбранными данными
      const printContent = `
       <html>
         <head>
           <title>Чек</title>
           <style>
             /* Стили для чека */
             /* ... */
           </style>
         </head>
         <body>
           <h1>Ваши выбранные данные:</h1>
           <p>Услуга: ${service}</p>
           <p>Тип клиента: ${clientType}</p>
           <p>Окно: ${selectedWindow}</p>
           <p>Дата: ${date}</p>
           <p>Время: ${time}</p>
   
           <script>
             // Печатаем документ после его полной загрузки
             window.onload = function() {
               window.print();
               window.onafterprint = function() {
                 window.close(); // Закрываем окно после печати
               };
             };
           </script>
         </body>
       </html>
     `;

      // Устанавливаем содержимое окна
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
   };

   // Верстка модального окна
   return (
      <div
         className={`${styles.modal} ${active ? styles.active : ''}`}
         onClick={() => setActive(false)}
      >
         <div
            className={styles.modal__content}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <label className={styles.modal__label}>{t('newTalon.button1')}</label>

            <Select
               dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
               className={`${styles.modal__selects} ${styles.customSelect}`}
               placeholder={t('modal.service')}
               onChange={(value) => setSelectedValues({ ...selectedValues, service: value })}
               options={[
                  {
                     value: 'Кредитование',
                     label: t('table.body.service.CreditFinancing'),
                  },
                  {
                     value: 'Обмен валют',
                     label: t('table.body.service.CurrencyExchange'),
                  },
                  {
                     value: 'Денежные переводы',
                     label: t('table.body.service.MoneyTransfers'),
                  },
                  {
                     value: 'Выпуск карты',
                     label: t('table.body.service.CardIssuance'),
                  },
                  {
                     value: 'Получить перевод',
                     label: t('table.body.service.ReceiveTransfer'),
                  },
                  {
                     value: 'Открыть счет',
                     label: t('table.body.service.OpenAnAccount'),
                  },
                  {
                     value: 'Операции с ценными бумагами',
                     label: t('table.body.service.SecuritiesOperations'),
                  },
                  {
                     value: 'Исламское финансирование',
                     label: t('table.body.service.IslamicFinancing'),
                  },
               ]}
               size='large'
            />
            <Select
               dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
               className={`${styles.modal__selects} ${styles.customSelect}`}
               placeholder={t('modal.clientType')}
               onChange={(value) => setSelectedValues({ ...selectedValues, clientType: value })}
               options={[
                  {
                     value: 'Юридическое лицо',
                     label: t('table.body.type.legalЕntity'),
                  },
                  {
                     value: 'Физическое лицо',
                     label: t('table.body.type.naturalPerson'),
                  },
               ]}
               size='large'
            />
            <Select
               className={`${styles.modal__selects} ${styles.customSelect}`}
               placeholder={t('navbar.window')}
               onChange={(value) => setSelectedValues({ ...selectedValues, selectedWindow: value })}
               options={[1, 2, 3, 4, 5].map((item) => ({
                  value: item,
                  label: `${t('navbar.window')} ${item}`,
               }))}
               size='large'
            />

            <DatePicker
               style={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
               placeholder={t('modal.date')}
               className={styles.modal__pickers}
               onChange={(date, dateString) =>
                  setSelectedValues({ ...selectedValues, date: dateString })
               }
               size='large'
            />

            <TimePicker
               style={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
               placeholder={t('modal.time')}
               className={styles.modal__timePicker}
               type={type}
               onChange={(time) => setSelectedValues({ ...selectedValues, time })}
               size='large'
            />

            <button onClick={handlePrintClick} className={styles.modal__button}>
               {t('newTalon.button2')}
            </button>
         </div>
      </div>
   );
};
