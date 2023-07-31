import 'react-day-picker/dist/style.css';

import { CustomLoading, isDarkModeTrigger } from '@/utils/utils';
import {
   useDeleteDaysMutation,
   useGetDaysQuery,
   usePostDaysMutation,
} from '@/api/admin/calendar_api';
import { useEffect, useState } from 'react';

import { DayPicker } from 'react-day-picker';
import en from 'date-fns/locale/en-US';
import i18n from '@/i18next';
import moment from 'moment';
import ru from 'date-fns/locale/ru';
import styles from './Calendar.module.scss';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

const CalendarMain = () => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const { data: daysList, isLoading: isDaysListLoading } = useGetDaysQuery();
   const [postDays] = usePostDaysMutation();
   const [deleteDays] = useDeleteDaysMutation();

   const [selected, setSelected] = useState(
      daysList?.map((dateString) => moment(dateString?.day, 'YYYY-MM-DD').toDate())
   );

   const [deleteMode, setDeleteMode] = useState(false);
   const [addMode, setAddMode] = useState(false);

   const handleDelete = async () => {
      const formattedDays = selected.length
         ? selected.map((item) => moment(item).format('YYYY-MM-DD'))
         : null;

      const body = {
         days: formattedDays,
      };

      await deleteDays(body);
   };
   const hanldeSave = async () => {
      const formattedDays = selected.length
         ? selected.map((item) => moment(item).format('YYYY-MM-DD'))
         : null;

      if (formattedDays) {
         const existingDays =
            daysList?.map((dateString) => moment(dateString?.day).format('YYYY-MM-DD')) || [];

         const uniqueDays = formattedDays.filter((day) => !existingDays.includes(day));

         const body = {
            day: uniqueDays,
         };

         await postDays(body);
      }
   };

   useEffect(() => {
      setSelected(daysList?.map((dateString) => moment(dateString?.day, 'YYYY-MM-DD').toDate()));
      if (deleteMode) {
         setSelected([]);
      }
   }, [daysList, deleteMode]);

   const dayPickerProps =
      deleteMode && !addMode
         ? {
              disabledDays: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
              modifiers: {
                 disabled: (day) =>
                    !daysList?.some((selectedDay) => moment(selectedDay.day).isSame(day, 'day')),
              },
           }
         : !deleteMode && addMode
         ? {
              disabledDays: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
              modifiers: {
                 disabled: (day) =>
                    daysList?.some((selectedDay) => moment(selectedDay.day).isSame(day, 'day')),
              },
           }
         : {};

   return (
      <div
         className={styles.calendarBlock}
         style={{ backgroundColor: isDarkMode ? '#001F31' : '' }}
      >
         <div className={styles.head}>
            <p style={{ color: isDarkMode ? 'white' : '' }}>{t('admin.calendar.calendar')}</p>
         </div>
         <div className={styles.body}>
            {isDaysListLoading ? (
               <CustomLoading />
            ) : (
               <DayPicker
                  locale={i18n.language === 'en' ? en : ru}
                  mode='multiple'
                  selected={selected}
                  onSelect={setSelected}
                  disabled
                  className={styles.customDayPicker}
                  numberOfMonths={3}
                  style={isDarkModeTrigger(1, false, isDarkMode)}
                  {...dayPickerProps}
               />
            )}
         </div>
         <div className={styles.footer}>
            <button disabled={deleteMode} onClick={() => setAddMode(!addMode)}>
               {t('admin.calendar.addMode')}
            </button>
            {addMode && <button onClick={hanldeSave}>{t('buttons.save')}</button>}

            <button disabled={addMode} onClick={() => setDeleteMode(!deleteMode)}>
               {t('admin.calendar.deleteMode')}
            </button>
            {deleteMode && <button onClick={handleDelete}>{t('buttons.delete')}</button>}
         </div>
      </div>
   );
};

export default CalendarMain;
