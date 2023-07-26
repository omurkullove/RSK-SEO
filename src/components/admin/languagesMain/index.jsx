import { CustomLoading, ShowMessage, isDarkModeTrigger } from '@/utils/utils';
import {
   useCreateLanguageMutation,
   useGetLanguageQuery,
   useRemoveLanguageMutation,
} from '@/api/admin/language_api';
import { useEffect, useState } from 'react';

import { Select } from 'antd';
import styles from './Language.module.scss';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

const LanguagesMain = () => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [language, setLanguage] = useState();

   const [createLanguage] = useCreateLanguageMutation();
   const [deleteLanguage] = useRemoveLanguageMutation();

   const { data: languageList, isLoading: isLanguageListLoading } = useGetLanguageQuery();

   const [searchLang, setSearchLang] = useState([]);

   const [currentlang, setCurrentLang] = useState('all');

   const filterOptions = [
      {
         id: 1,
         label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{t('ru')}</p>,
         value: 'ru',
      },
      {
         id: 2,
         label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{t('en')}</p>,

         value: 'en',
      },
      {
         id: 3,
         label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{t('kg')}</p>,
         value: 'ky',
      },
      {
         id: 4,
         label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{t('all')}</p>,
         value: 'all',
      },
   ];
   const createOptions = [
      {
         id: 1,
         label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{t('ru')}</p>,
         value: 'ru',
      },
      {
         id: 2,
         label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{t('en')}</p>,

         value: 'en',
      },
      {
         id: 3,
         label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{t('kg')}</p>,
         value: 'ky',
      },
   ];

   const handleEdit = (name, value) => {
      setLanguage((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!language.text) {
         ShowMessage('warning', 'Заполните поля');
         return;
      }
      await createLanguage(language);
   };

   const handleSearch = (value) => {
      const lowerCaseValue = value.toLowerCase();

      if (value === '') {
         if (currentlang === 'all') {
            setSearchLang(languageList);
         } else {
            const filteredValue = languageList?.filter((item) => item.lang === currentlang);
            setSearchLang(filteredValue);
         }
      } else {
         if (currentlang === 'all') {
            const filteredValue = languageList?.filter((item) => {
               const lowerCaseText = item.text.toLowerCase();
               return lowerCaseText.includes(lowerCaseValue);
            });
            setSearchLang(filteredValue);
         } else {
            const filteredValue = languageList?.filter((item) => {
               const lowerCaseText = item.text.toLowerCase();
               return lowerCaseText.includes(lowerCaseValue) && item.lang === currentlang;
            });
            setSearchLang(filteredValue);
         }
      }
   };

   const handleFilter = (value) => {
      setCurrentLang(value);
      if (value === 'all') {
         setSearchLang(languageList);
      } else {
         setSearchLang(languageList?.filter((item) => item.lang === value));
      }
   };

   const handleDelete = async (id) => {
      await deleteLanguage(id);
   };

   useEffect(() => {
      setSearchLang(languageList);
   }, [languageList]);

   return isLanguageListLoading ? (
      <CustomLoading />
   ) : (
      <div className={styles.languageBlock}>
         <form
            action='submit'
            style={{ backgroundColor: isDarkMode ? '#374B67' : '' }}
            onSubmit={handleSubmit}
         >
            <div className={styles.inputBlock}>
               <p style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {t('admin.languageMain.language')}:
               </p>
               <Select
                  dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                  options={createOptions}
                  style={{ width: '50%' }}
                  onChange={(value) => handleEdit('lang', value)}
                  placeholder={t('admin.languageMain.language')}
               />
            </div>
            <div className={styles.inputBlock}>
               <p style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {t('admin.languageMain.translate')}:
               </p>
               <input
                  style={isDarkModeTrigger(1, false, isDarkMode)}
                  required
                  placeholder={t('admin.languageMain.translate')}
                  onChange={(e) => handleEdit('text', e.target.value)}
               />
            </div>

            <div className={styles.buttonBlock}>
               <button type='submit'>{t('buttons.create')}</button>
            </div>
         </form>

         <center className={styles.center}>
            <input
               style={isDarkModeTrigger(1, false, isDarkMode)}
               placeholder={t('admin.languageMain.search')}
               onChange={(e) => handleSearch(e.target.value)}
            />
            <Select
               dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
               options={filterOptions}
               defaultValue={filterOptions[3]}
               style={{ width: '140px' }}
               onChange={(value) => handleFilter(value)}
            />
         </center>
         {languageList?.length ? (
            <div className={styles.languageList}>
               {searchLang?.length ? (
                  searchLang?.map((item) => (
                     <div
                        key={item?.id}
                        className={styles.languageChildBlock}
                        style={isDarkModeTrigger(2, true, isDarkMode)}
                     >
                        <div>
                           <h5 style={isDarkModeTrigger(2, false, isDarkMode)}>ID:</h5>
                           <p style={isDarkModeTrigger(1, false, isDarkMode)}>{item?.id}</p>
                        </div>
                        <div>
                           <h5 style={isDarkModeTrigger(2, false, isDarkMode)}>
                              {t('admin.languageMain.language')}:
                           </h5>
                           <p style={isDarkModeTrigger(1, false, isDarkMode)}>{item?.lang}</p>
                        </div>

                        <div>
                           <h5 style={isDarkModeTrigger(2, false, isDarkMode)}>
                              {t('admin.languageMain.translate')}:
                           </h5>
                           <p style={isDarkModeTrigger(1, false, isDarkMode)}>{item?.text}</p>
                        </div>
                        <div className={styles.footer}>
                           <button
                              onClick={() => handleDelete(item?.id)}
                              style={isDarkModeTrigger(3, false, isDarkMode)}
                           >
                              {t('buttons.delete')}
                           </button>
                        </div>
                     </div>
                  ))
               ) : (
                  <div className='searchUndefinedBlock'>
                     <h1>{t('searchUndefinedBlockfined')}</h1>
                  </div>
               )}
            </div>
         ) : (
            <h1>{t('noData')}</h1>
         )}
      </div>
   );
};

export default LanguagesMain;
