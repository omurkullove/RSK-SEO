import { Spin, message } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { t } from 'i18next';

export const API = 'https://rskseo.pythonanywhere.com';

export const baseUrl = 'http://0.0.0.0:8000';

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
         <h4>{t('dataLoading')}</h4>
      </div>
   );
};
export const CustomModalLoading = () => {
   return (
      <div
         style={{
            minHeight: '30vh',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '20px',
            background: 'transparent',
         }}
      >
         <Spin indicator={antIcon} size='50' />
         <h1>Загузка</h1>
      </div>
   );
};

export const timeLimitSeconds = 10;

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

export function returnUnderstandableDate(dateString, reverse) {
   if (!reverse) {
      const date = moment(dateString);
      const formattedDate = date.format('DD.MM HH:mm');
      return formattedDate;
   } else {
      const date = moment(dateString, 'DD.MM HH:mm');
      const isoString = date.toISOString();
      return isoString;
   }
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

export const returnEmployee = (email, list) => {
   if (email && list) {
      const currentEmployee = list.find((item) => item.email === email);
      return currentEmployee;
   }
   console.log('Данные были переданы не корректно');
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
export const getServiceName = (service) => {
   switch (service) {
      case 'Кредитование':
         return t('table.body.service.CreditFinancing');
      case 'Обмен валют':
         return t('table.body.service.CurrencyExchange');
      case 'Денежные переводы':
         return t('table.body.service.MoneyTransfers');
      case 'Выпуск карты':
         return t('table.body.service.CardIssuance');
      case 'Получить перевод':
         return t('table.body.service.ReceiveTransfer');
      case 'Открыть счет':
         return t('table.body.service.OpenAnAccount');
      case 'Операции с ценными бумагами':
         return t('table.body.service.SecuritiesOperations');
      case 'Исламское финансирование':
         return t('table.body.service.IslamicFinancing');
      default:
         return service;
   }
};

export const serviceIndetificator = (service, serviseIdArray) => {
   if (typeof serviseIdArray === 'object') {
      const serviceNames = serviseIdArray.map((id) => {
         const foundService = service.find((item) => item.id === id);
         return foundService ? foundService.name : null;
      });
      return serviceNames;
   } else {
      return service.find((item) => item.id === serviseIdArray)?.name;
   }
};

export const branchIndeficator = (branchList, itemBranch) => {
   if (itemBranch) {
      const branch = branchList?.find((item) => item.id === itemBranch);
      return `${cityTransalte(branch?.city)}, ${branch?.address}`;
   } else {
      return 'Филиал не обнаружен';
   }
};

export const employeeIdetificator = (employeeList, id) => {
   const employee = employeeList?.find((item) => item.id === id);
   return employee?.username;
};

export const cityTransalte = (city) => {
   switch (city) {
      case 'Бишкек':
         return t('branch.bishkek');
      case 'Ош':
         return t('branch.osh');
      case 'Джалал-Абад':
         return t('branch.jalalabad');
      case 'Каракол':
         return t('branch.karakol');
      case 'Токмок':
         return t('branch.tokmok');
      case 'Нарын':
         return t('branch.naryn');
      case 'Талас':
         return t('branch.talas');
      case 'Кара-Балта':
         return t('branch.kara_balta');
      case 'Баткен':
         return t('branch.batken');
      case 'Исфана':
         return t('branch.isfana');
      default:
         return city;
   }
};

export const clientTypeTranslate = (type) => {
   switch (type) {
      case 'Физическое лицо':
         return t('table.body.type.naturalPerson');
      case 'Юридическое лицо':
         return t('table.body.type.legalЕntity');
      default:
         return type;
   }
};

export const isDarkModeTrigger = (colorNum, isBackground, isDarkMode) => {
   if (isDarkMode) {
      if (isBackground) {
         switch (colorNum) {
            case 3:
               return {
                  //Супер темный
                  backgroundColor: '#001F31',
               };

            case 2:
               return {
                  // Темный полупрозрачный
                  backgroundColor: '#374B67',
               };

            case 1:
               return {
                  // темный
                  backgroundColor: '#002A42',
               };
            default:
               break;
         }
      } else {
         switch (colorNum) {
            case 1:
               return {
                  color: 'white',
               };
            case 2:
               return {
                  color: 'lightgray',
               };

            case 3:
               return {
                  color: '#92BFFF',
               };

            default:
               break;
         }
      }
   } else {
      return {};
   }
};

export const monthTranslate = (month) => {
   switch (month) {
      case 'January':
         return t('chart.January');
      case 'February':
         return t('chart.February');
      case 'March':
         return t('chart.March');
      case 'April':
         return t('chart.April');
      case 'May':
         return t('chart.May');
      case 'June':
         return t('chart.June');
      case 'July':
         return t('chart.July');
      case 'August':
         return t('chart.August');
      case 'September':
         return t('chart.September');
      case 'October':
         return t('chart.October');
      case 'November':
         return t('chart.November');
      case 'December':
         return t('chart.December');
      default:
         return month;
   }
};

export const MainServiceOptions = (serviceList, isDarkMode) => {
   if (!serviceList?.length) {
      return null;
   }
   const filteredService = serviceList?.map((item) => ({
      label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{getServiceName(item?.name)}</p>,
      value: item?.id,
   }));

   return filteredService;
};

export const MainBranchOptions = (branchList, isDarkMode) => {
   if (!branchList?.length) {
      return null;
   }
   const filtredBranchs = branchList?.map((item) => ({
      label: (
         <p style={isDarkModeTrigger(3, false, isDarkMode)}>{`${cityTransalte(item?.city)}, ${
            item?.address
         }`}</p>
      ),
      value: item?.id,
   }));

   return filtredBranchs;
};
export const MainLanguageOptions = (languageList, isDarkMode) => {
   if (!languageList?.length) {
      return null;
   }

   const filtredLanguages = languageList?.map((item) => ({
      label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{item?.text}</p>,
      value: item?.id,
   }));

   return filtredLanguages;
};
export const MainDocumentOptions = (documentList, isDarkMode) => {
   if (!documentList?.length) {
      return null;
   }
   const filteredDocuments = documentList?.map((item) => ({
      label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{item?.name}</p>,
      value: item?.id,
   }));

   return filteredDocuments;
};
