import './NotFound404.scss';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const NotFound404 = () => {
   const [timer, setTimer] = useState(10);

   const navigate = useNavigate();

   useEffect(() => {
      const interval = setInterval(() => {
         setTimer((prev) => prev - 1);
         if (timer === 0) {
            navigate('/');
         }
      }, 1000);

      return () => {
         clearInterval(interval);
      };
   }, [timer]);

   return (
      <div className='not-found-page'>
         <div className='container'>
            <div className='circle' />
            <h1>404</h1>
            <p>Page not found</p>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>{timer}</p>
         </div>
      </div>
   );
};

export default NotFound404;
