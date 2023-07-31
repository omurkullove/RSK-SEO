import { MainServiceOptions, serviceIndetificator } from '@/utils/utils';

import { Select } from 'antd';
import moment from 'moment';
import styles from '@/assets/styles/registrar/ModalForm.module.scss';
import { usePrintTalonsMutation } from '@/api/registrar/registrar_api';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ModalForm = ({ active, setActive, branch, serviceList, refetch }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [printTalon] = usePrintTalonsMutation();

   const { t } = useTranslation();

   const [talon, setTalon] = useState();

   const handleEdit = (name, value) => {
      if (!value) {
         setTalon((prev) => ({
            ...prev,
            [name]: null,
         }));
      } else {
         setTalon((prev) => ({
            ...prev,
            [name]: value,
         }));
      }
   };
   const generatePrintContent = (service, clientType, date, branch) => {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Чек</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
    
              .check-container {
                max-width: 400px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
              }
    
              .check-container h1 {
                margin-bottom: 10px;
              }
    
              .check-container p {
                margin-bottom: 5px;
              }
            </style>
          </head>
          <body>
            <div class="check-container">
              <h1>Ваши выбранные данные:</h1>
              <p>Услуга: ${service}</p>
              <p>Тип клиента: ${clientType}</p>
              <p>Филиал:${branch}</p>
              <p>Назначенная дата: ${moment(date).format('DD:MM:YY HH:mm')}</p>
            </div>
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
   };

   const handlePrintClick = async () => {
      const printWindow = window.open('', '_blank');
      const printContent = generatePrintContent(
         serviceIndetificator(serviceList, talon?.service),
         talon?.client_type,
         talon?.appointment_date,
         branch
      );

      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();

      await printTalon(talon);
      await refetch();

      setActive(false);
   };

   const serviceOptions = MainServiceOptions(serviceList, isDarkMode);

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
               onChange={(value) => handleEdit('service', value)}
               options={serviceOptions}
               size='large'
            />
            <Select
               dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
               className={`${styles.modal__selects} ${styles.customSelect}`}
               placeholder={t('modal.clientType')}
               onChange={(value) => handleEdit('client_type', value)}
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
            <input
               className={styles.dateInput}
               type='datetime-local'
               onChange={(e) => handleEdit('appointment_date', e.target.value)}
            />

            <button onClick={handlePrintClick} className={styles.modal__button}>
               {t('newTalon.button2')}
            </button>
         </div>
      </div>
   );
};
