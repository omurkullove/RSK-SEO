import { message } from 'antd';

export const API = 'http://rskseo.pythonanywhere.com';

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
