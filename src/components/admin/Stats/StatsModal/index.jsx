import { Button, Upload } from 'antd';
import { ShowMessage, isDarkModeTrigger } from '@/utils/utils';

import ModalWrapper from '../../ModalWrapper';
import { UploadOutlined } from '@ant-design/icons';
import styles from '../Stats.module.scss';
import { useCreateReportMutation } from '@/api/admin/report_api';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const StatsModal = ({ isModal, setIsModal }) => {
   const [pdfFile, setPdfFile] = useState(null);
   const [excelFile, setExcelFile] = useState(null);

   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const handleEdit = (fileType, file) => {
      if (fileType === 'pdf') {
         setPdfFile(file);
      } else if (fileType === 'excel') {
         setExcelFile(file);
      }
   };

   const [postStats] = useCreateReportMutation();

   const handleSubmit = async () => {
      if (!pdfFile || !excelFile) {
         ShowMessage('warning', 'Выберите файл');
         return;
      }

      const formData = new FormData();
      formData.append('pdf_file', pdfFile);
      formData.append('exel_file', excelFile);

      await postStats(formData);

      console.log(pdfFile, excelFile);
   };

   const pdfFileList = pdfFile
      ? [
           {
              ...pdfFile,
              thumbUrl: URL.createObjectURL(pdfFile),
              name: pdfFile?.name,
           },
        ]
      : [];

   const excelFileList = excelFile
      ? [
           {
              ...excelFile,
              thumbUrl: URL.createObjectURL(excelFile),
              name: excelFile?.name,
           },
        ]
      : [];

   return (
      <ModalWrapper isOpen={isModal} setIsOpen={setIsModal}>
         <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.fileBlock}>
               <p>PDF</p>
               <Upload
                  fileList={pdfFileList}
                  onRemove={() => handleEdit('pdf', null)}
                  onChange={(info) => handleEdit('pdf', info.fileList[0]?.originFileObj)}
                  customRequest={() => {}}
                  maxCount={1}
                  listType='list'
                  accept='.pdf'
               >
                  <Button icon={<UploadOutlined />} style={isDarkModeTrigger(2, true, isDarkMode)}>
                     Upload
                  </Button>
               </Upload>
            </div>

            <div className={styles.fileBlock}>
               <p>Excel</p>
               <Upload
                  fileList={excelFileList}
                  onRemove={() => handleEdit('excel', null)}
                  onChange={(info) => handleEdit('excel', info.fileList[0]?.originFileObj)}
                  customRequest={() => {}}
                  maxCount={1}
                  listType='list'
                  accept='.xlsx, .xls'
               >
                  <Button icon={<UploadOutlined />} style={isDarkModeTrigger(2, true, isDarkMode)}>
                     Upload
                  </Button>
               </Upload>
            </div>

            <div className={styles.footer}>
               <button onClick={() => setIsModal(false)}>Отмена</button>
               <button onClick={() => handleSubmit()}>Отправить</button>
            </div>
         </div>
      </ModalWrapper>
   );
};

export default StatsModal;
