import React from 'react'
import styles from '@/assets/styles/Auth.module.scss'
import logo from '@/assets/svg/bigLogo.svg'
import { useNavigate } from 'react-router-dom'

import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'

const AuthPage = () => {
   const navigate = useNavigate()

   const onFinish = (values) => {
      // Здесь потом будем определять, кто пытается зайти
      switch (values.username) {
         case 'operator':
            navigate('/1_6/home')
            break
         case 'registrator':
            navigate('/1_7/home')
            break

         default:
            break
      }
   }

   return (
      <div className={styles.main}>
         <div className={styles.authModal}>
            <img src={logo} alt='logo' />

            <div className={styles.formBlock}>
               <Form className={styles.form} name='basic' onFinish={onFinish} autoComplete='off'>
                  <Form.Item
                     name='username'
                     rules={[
                        {
                           required: true,
                           message: 'Пожалуйста, введите имя пользователя !',
                        },
                     ]}
                  >
                     <Input placeholder='Имя пользователя  ' className={styles.input} />
                  </Form.Item>

                  <Form.Item
                     name='password'
                     rules={[
                        {
                           required: true,
                           message: 'Пожалуйста, введите пароль !',
                        },
                     ]}
                  >
                     <Input.Password
                        placeholder='Пароль'
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
                     <Link to='#' className={styles.link}>
                        Забыли пароль?
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
                        Войти
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </div>
      </div>
   )
}

export default AuthPage
