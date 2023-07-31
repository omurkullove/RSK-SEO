import 'react-quill/dist/quill.snow.css';

import {
   Bar,
   BarChart,
   CartesianGrid,
   Legend,
   Line,
   LineChart,
   Tooltip,
   XAxis,
   YAxis,
} from 'recharts';
import { isDarkModeTrigger, monthTranslate } from '@/utils/utils';

import ReactQuill from 'react-quill';
import StatsModal from '../StatsModal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from '../Stats.module.scss';
import { t } from 'i18next';
import { useGetEmployeeListQuery } from '@/api/admin/employee_api';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const data = [
   {
      month: 'January',
      talon_count: 30,
      talon_canceled: 10,
      talon_completed: 20,
   },
   {
      month: 'February',
      talon_count: 25,
      talon_canceled: 8,
      talon_completed: 17,
   },
   {
      month: 'March',
      talon_count: 28,
      talon_canceled: 12,
      talon_completed: 16,
   },
   {
      month: 'April',
      talon_count: 35,
      talon_canceled: 15,
      talon_completed: 20,
   },
   {
      month: 'May',
      talon_count: 29,
      talon_canceled: 9,
      talon_completed: 20,
   },
   {
      month: 'June',
      talon_count: 27,
      talon_canceled: 7,
      talon_completed: 20,
   },
   {
      month: 'July',
      talon_count: 33,
      talon_canceled: 11,
      talon_completed: 22,
   },
   {
      month: 'August',
      talon_count: 32,
      talon_canceled: 10,
      talon_completed: 22,
   },
   {
      month: 'September',
      talon_count: 31,
      talon_canceled: 11,
      talon_completed: 20,
   },
   {
      month: 'October',
      talon_count: 27,
      talon_canceled: 9,
      talon_completed: 18,
   },
   {
      month: 'November',
      talon_count: 30,
      talon_canceled: 12,
      talon_completed: 18,
   },
   {
      month: 'December',
      talon_count: 31,
      talon_canceled: 10,
      talon_completed: 21,
   },
];
const monthsMap = {
   January: 'January',
   February: 'February',
   March: 'March',
   April: 'April',
   May: 'May',
   June: 'June',
   July: 'July',
   August: 'August',
   September: 'September',
   October: 'October',
   November: 'November',
   December: 'December',
};

const Chart = ({ stats }) => {
   const [htmlContent, setHtmlContent] = useState('');

   const { data: employeeList } = useGetEmployeeListQuery();

   const [loading, setLoading] = useState(false);

   const handleTextChange = (value) => {
      setHtmlContent(value);
   };
   const customTickFormatter = (tick) => {
      return monthTranslate(monthsMap[tick]);
   };

   const customLabelFormatter = (name) => {
      return monthTranslate(monthsMap[name]);
   };

   const dataURLtoFile = (dataURL, filename) => {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
         u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
   };

   const [isModal, setIsModal] = useState(false);

   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const saveAsPDF = async () => {
      const chartBlock = document.getElementById('chartBlock');
      const textBlock = document.getElementById('textBlock');

      // Конвертируем блок с графиком в canvas
      const chartCanvas = await html2canvas(chartBlock);

      const textCanvas = await html2canvas(textBlock);

      // Создаем новый экземпляр jsPDF
      const pdf = new jsPDF();

      // Добавляем изображение графика на первую страницу PDF
      const imgDataChart = chartCanvas.toDataURL('image/png');
      pdf.addImage(imgDataChart, 'PNG', 10, 10, 190, 0);

      // Добавляем чистый текст на первую страницу PDF
      pdf.addPage();
      const imgText = textCanvas.toDataURL('image/png');
      pdf.addImage(imgText, 'PNG', 10, 10, 190, 0);

      // Сохраняем PDF файл
      pdf.save('report_with_chart.pdf');

      setIsTool(true);
   };

   const [isTool, setIsTool] = useState(true);

   const handleSaveAsPDF = () => {
      setIsTool(false);
      setTimeout(() => {
         saveAsPDF();
      }, 1000);
   };

   const modules = {
      toolbar: isTool ? true : false,
   };

   const editedEmployeeData = employeeList?.map((item) => ({
      name: item?.username,
      rating: item?.rating,
   }));

   // Mock data
   const demoEmployeeList = [
      { name: 'John', rating: 5.4 },
      { name: 'Jane', rating: 9 },
      { name: 'Michael', rating: 3 },
      { name: 'Emily', rating: 7.0 },
      { name: 'David', rating: 2 },
      { name: 'Sarah', rating: 8 },
      { name: 'Robert', rating: 6.8 },
      { name: 'Emma', rating: 4 },
      { name: 'William', rating: 10 },
      { name: 'Olivia', rating: 1 },
   ];

   return (
      <>
         <div className={styles.chartBlock}>
            <div className={styles.childBlock} id='chartBlock'>
               <h1 style={isDarkModeTrigger(1, false, isDarkMode)}>{t('chart.talons')}:</h1>
               <LineChart data={stats?.month} width={1200} height={400}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                     dataKey='month'
                     padding={{ left: 30, right: 30 }}
                     tickFormatter={customTickFormatter}
                  />
                  <YAxis />
                  <Tooltip labelFormatter={customLabelFormatter} />
                  <Legend />
                  <Line
                     strokeWidth={2}
                     type='monotone'
                     name={t('chart.talon_count')}
                     dataKey='talon_count'
                     stroke='#1e4a89'
                     activeDot={{ r: 8 }}
                  />
                  <Line
                     strokeWidth={2}
                     type='monotone'
                     name={t('chart.talon_canceled')}
                     dataKey='talon_canceled'
                     stroke='red'
                  />
                  <Line
                     strokeWidth={2}
                     type='monotone'
                     name={t('chart.talon_completed')}
                     dataKey='talon_completed'
                     stroke='green'
                  />
               </LineChart>
               <div className={styles.diagramma}>
                  <h1 style={isDarkModeTrigger(1, false, isDarkMode)}>{t('chart.employee')}:</h1>
                  <BarChart width={1200} height={400} data={editedEmployeeData}>
                     <CartesianGrid strokeDasharray='3 3' />
                     <XAxis dataKey='name' />
                     <YAxis />
                     <Tooltip />
                     <Legend />
                     <Bar
                        dataKey='rating'
                        stackId='a'
                        fill={isDarkMode ? '#455E83' : 'lightblue'}
                     />
                  </BarChart>
               </div>
            </div>
            {isModal && <StatsModal isModal={isModal} setIsModal={setIsModal} />}
            <center>
               <h1 style={isDarkModeTrigger(1, false, isDarkMode)}>{t('chart.report')}:</h1>
            </center>
            <div className={styles.textareaBlock}>
               <ReactQuill
                  style={{
                     ...isDarkModeTrigger(1, false, isDarkMode),
                     height: '100%',
                     minHeight: '500px',
                  }}
                  key={isTool ? 'toolbar-on' : 'toolbar-off'}
                  value={htmlContent}
                  id='textBlock'
                  modules={modules}
                  onChange={handleTextChange}
                  placeholder={`${t('chart.talons')}...`}
               />
            </div>
            <div className={styles.buttonBlock}>
               <button onClick={() => handleSaveAsPDF()}>{t('chart.saveAsPdf')}</button>
               <button onClick={() => setIsModal(true)}>{t('chart.submitToDB')}</button>
            </div>
         </div>
      </>
   );
};

export default Chart;
