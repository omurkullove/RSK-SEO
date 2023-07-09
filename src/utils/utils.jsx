import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import { t } from 'i18next';

export const API = 'http://0.0.0.0:8000';

export const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

export const CustomLoading = () => {
   return (
      <div
         style={{
            height: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '20px',
            background: 'transparent',
         }}
      >
         <Spin indicator={antIcon} size='50' />
         <h4>Идет подсчет данных....</h4>
      </div>
   );
};

export const timeLimitSeconds = 900;

export const ShowMessage = (type, text, duration) => {
   message.open({
      type: type,
      content: text,
      duration: duration,
   });
};

export function calculateTimeDifference(startTime, endTime) {
   const start = new Date(startTime);
   const end = new Date(endTime);

   const timeDiff = Math.abs(end - start);
   const minutes = Math.floor(timeDiff / (1000 * 60));

   return minutes;
}

export function returnUnderstandableDate(date) {
   const inputDate = new Date(date);

   const options = {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
   };

   const formattedDate = inputDate.toLocaleDateString('ru-RU', options).replace(/,/g, '');

   return formattedDate;
}

export const formatTime = (time) => {
   const minutes = Math.floor(time / 60);
   const seconds = time % 60;

   const formattedMinutes = String(minutes).padStart(2, '0');
   const formattedSeconds = String(seconds).padStart(2, '0');

   return `${formattedMinutes}:${formattedSeconds}`;
};

export const clientsCounter = (today, yesterday) => {
   const completedToday = +today?.completed;
   const completedYesterday = +yesterday?.completed;
   const res = completedToday - completedYesterday;

   return res.toString();
};

export const canceledClientsCounter = (today, yesterday) => {
   const canceledToday = +today?.canceled;
   const canseledYesterday = +yesterday?.canceled;
   const res = canceledToday - canseledYesterday;

   return res.toString();
};

export const isEmpty = (obj) => {
   if (Object.keys(obj).length == 0) {
      return false;
   }
   return true;
};
export const branchIndeficator = (branch) => {
   switch (branch) {
      case 1:
         return 'Бишкек, Киевская 77';
      case 2:
         return 'Каракол, Кулакунова 89';
      case 3:
         return 'Ош, Курманжан датка 124';
      default:
         return { branch };
   }
};

export const returnEmployee = (email, list) => {
   if (email && list) {
      const currentEmployee = list.find((item) => item.email === email);
      return currentEmployee;
   }
   console.log('Данные были переданы не корректно');
};

export const serviceIndetificator = (service) => {
   switch (service) {
      case 1:
         return t('table.body.service.CreditFinancing');
      case 2:
         return t('table.body.service.CurrencyExchange');
      case 3:
         return t('table.body.service.MoneyTransfers');
      case 4:
         return t('table.body.service.CardIssuance');
      case 5:
         return t('table.body.service.ReceiveTransfer');
      case 6:
         return t('table.body.service.OpenAnAccount');
      case 7:
         return t('table.body.service.SecuritiesOperations');
      case 8:
         return t('table.body.service.IslamicFinancing');
      default:
         return 'Сервис не определен';
   }
};

export const selectModalStyles = {
   width: '100%',
   marginTop: 25,
   fontFamily: "'Inter', sanf-serif",
   fontSize: '18px',
   fontWeight: '500',
   border: '3px solid #5a6c74',
   borderRadius: '7px',
   outline: 'none',
   padding: '2px',
};
