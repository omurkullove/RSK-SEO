import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { ShowMessage } from '@/utils/utils';
import en from '@/assets/svg/en.svg';
import kg from '@/assets/svg/kg.svg';
import logo from '@/assets/svg/bigLogo.svg';
import ru from '@/assets/svg/ru.svg';
import styles from '@/assets/styles/main/Auth.module.scss';
import { useLoginEmployeeMutation } from '@/api/general/auth_api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AuthPage = () => {
   const navigate = useNavigate();
   const { t, i18n } = useTranslation();
   const [lang, setLang] = useState(i18n.language);

   const handleChangeLanguage = (language) => {
      i18n.changeLanguage(language);
      setLang(language);
   };

   const [loginUser, { error, isSuccess }] = useLoginEmployeeMutation();

   const positionNavigator = (token) => {
      localStorage.setItem('token', JSON.stringify(token) || '{}');
      switch (token?.position) {
         case 'super_admin':
            navigate('/admin/home');
            break;
         case 'admin':
            navigate('/admin/home');
            break;
         case 'operator':
            navigate('/operator/home');
            break;
         case 'registrator':
            navigate('/registrar/home');
            break;

         default:
            break;
      }
   };

   const handleLogin = async (values) => {
      await loginUser(values).then((res) => {
         positionNavigator(res.data);
      });
   };

   useEffect(() => {
      localStorage.removeItem('token');
   }, []);

   return (
      <div className={styles.main}>
         <div className={styles.languageBlock}>
            <img
               src={kg}
               alt='kg'
               onClick={() => handleChangeLanguage('kg')}
               style={{ cursor: 'pointer' }}
            />
            <img
               src={ru}
               alt='ru'
               onClick={() => handleChangeLanguage('ru')}
               style={{ cursor: 'pointer' }}
            />
            <img
               src={en}
               alt='en'
               onClick={() => handleChangeLanguage('en')}
               style={{ cursor: 'pointer' }}
            />
         </div>
         <div className={styles.authModal}>
            <img src={logo} alt='logo' />

            <div className={styles.formBlock}>
               <Form
                  key={lang}
                  className={styles.form}
                  name='basic'
                  onFinish={handleLogin}
                  autoComplete='off'
               >
                  <Form.Item
                     name='email'
                     rules={[
                        {
                           required: true,
                           message: t('auth.errors.emailError'),
                        },
                     ]}
                  >
                     <Input
                        autoComplete='email'
                        placeholder={t('auth.placeholder.email')}
                        className={styles.input}
                     />
                  </Form.Item>

                  <Form.Item
                     name='password'
                     rules={[
                        {
                           required: true,
                           message: t('auth.errors.passwordError'),
                        },
                     ]}
                  >
                     <Input.Password
                        autoComplete='current-password'
                        placeholder={t('auth.placeholder.password')}
                        style={{
                           borderRadius: '15px',
                           minHeight: '52px',
                           border: 'none',
                        }}
                     />
                  </Form.Item>

                  <Form.Item
                     style={{
                        marginTop: '-20px',
                     }}
                  >
                     <Link
                        to='#'
                        className={styles.link}
                        onClick={() =>
                           ShowMessage(
                              'warning',
                              'Для восстановления пароля обратитесь к администратору'
                           )
                        }
                     >
                        {t('auth.forgetPassword')}
                     </Link>
                  </Form.Item>

                  <Form.Item>
                     <Button
                        type='primary'
                        htmlType='submit'
                        style={{
                           width: '100%',
                           height: '50px',
                           borderRadius: '15px',
                           backgroundColor: '#456792',
                           fontWeight: '700',
                        }}
                     >
                        {t('auth.button.placeholder')}
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default AuthPage;
