import React from "react";

import { UserHeader } from "@/components/1.7/Navbar/Navbar-1-7";
import styles from "@/assets/styles/1.7/Main.module.scss";
import { ModalForm } from "@/components/1.7/ModalWindow/ModalForm";
import { Popover, Table } from "antd";
import { useState } from "react";
import arrowGreen from "@/assets/svg/arrowGreen.svg";
import arrowRed from "@/assets/svg/arrowRed.svg";
import edit from "@/assets/svg/edit.svg";
import deleteSvg from "@/assets/svg/delete.svg";
import alert from "@/assets/svg/1_6Alert.svg";
import { useTranslation, withTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  const [modalActive, setModalActive] = useState(false);

  const content = (
    <div className={styles.popoverContent}>
      <img src={edit} alt="edit" />
      <img src={deleteSvg} alt="delete" />
    </div>
  );

  const tableContent = (client) => (
    <div className={styles.tableContent}>
      <div onClick={() => handleTransferClient(client)}>Перенести</div>
      <div onClick={() => handleDeleteClient(client)}>Удалить</div>
    </div>
  );

  const columns = [
    {
      title: <p className={styles.columnTitle}>№</p>,
      dataIndex: "number",
      render: (value) => <p className={styles.columnData}>{value}</p>,
    },
    {
      title: <p className={styles.columnTitle}>{t("table.titles.name")}</p>,
      dataIndex: "name",
      render: (value) => <p className={styles.columnDataName}>{value}</p>,
    },
    {
      title: <p className={styles.columnTitle}>{t("table.titles.inQueue")}</p>,
      dataIndex: "inOrder",
      render: (value) => <p className={styles.columnData}>{value}</p>,
    },
    {
      title: <p className={styles.columnTitle}>{t("table.titles.benefit")}</p>,
      dataIndex: "benefit",
      render: (value) => (
        <p className={styles.columnData}>
          {value === "да"
            ? t("table.body.benefit.yes")
            : t("table.body.benefit.no")}
        </p>
      ),
    },
    {
      title: <p className={styles.columnTitle}>{t("table.titles.service")}</p>,
      dataIndex: "service",
      render: (value) => <p className={styles.columnData}>{value}</p>,
    },

    {
      title: <p className={styles.columnTitle}>{t("table.titles.status")}</p>,
      dataIndex: "status",
      render: (value) => {
        switch (value) {
          case "progress":
            return (
              <p
                className={styles.columnDataStatus}
                style={{ color: "#2E79BD" }}>
                {t("table.body.status.inProgress")}
              </p>
            );
            break;
          case "await":
            return (
              <p
                className={styles.columnDataStatus}
                style={{ color: "#848484" }}>
                {t("table.body.status.expected")}
              </p>
            );

            break;
          case "done":
            return (
              <p
                className={styles.columnDataStatus}
                style={{ color: "#2E6C47" }}>
                {t("table.body.status.completed")}
              </p>
            );

            break;

          default:
            break;
        }
      },
    },
    {
      title: (
        <p className={styles.columnTitle}> {t("table.titles.serviceTime")}</p>
      ),
      dataIndex: "time",
      render: (value, client) => {
        if (+value <= 15 && value) {
          return (
            <p className={styles.columnDataTime} style={{ color: "#2E6C47" }}>
              {value} {t('table.body.serviceTime.min')}
            </p>
          );
        } else if (+value > 15) {
          return (
            <div
              style={{
                color: "#B5051E",
              }}
              className={styles.columnDataTime}>
              <span>{value}  {t('table.body.serviceTime.min')}</span>
              <img src={alert} alt="alert" />
              <Popover
                content={tableContent(client)}
                trigger="click"
                placement="leftTop"
                id="tablePopover">
                <img src={edit} alt="dots" style={{ cursor: "pointer" }} />
              </Popover>
            </div>
          );
        } else {
          return <p className={styles.columnDataTime}>-</p>;
        }
      },
    },
  ];
  const data = [
    {
      number: "A0122",
      name: "Ильясов Айбек Рустамович",
      inOrder: "-",
      benefit: "нет",
      service: "Услуга 1",
      status: "done",
      time: "15",
      key: 1,
    },
    {
      number: "A0912",
      name: "Иванов Федор Петрович",
      inOrder: "-",
      benefit: "нет",
      service: "Услуга 4",
      status: "progress",
      key: 2,
      time: "18",
    },
    {
      number: "A0912",
      name: "Иванов Федор Петрович",
      inOrder: "-",
      benefit: "нет",
      service: "Услуга 4",
      status: "await",
      key: 3,
      time: "15",
    },
    {
      number: "A0912",
      name: "Иванов Федор Петрович",
      inOrder: "-",
      benefit: "нет",
      service: "Услуга 4",
      status: "В процессе",
      key: 4,
      time: "18",
    },
    {
      number: "A0912",
      name: "Иванов Федор Петрович",
      inOrder: "-",
      benefit: "нет",
      service: "Услуга 4",
      status: "В процессе",
      key: 5,
      time: "",
    },
    {
      number: "A0912",
      name: "Иванов Федор Петрович",
      inOrder: "-",
      benefit: "нет",
      service: "Услуга 4",
      status: "В процессе",
      key: 6,
      time: "",
    },
    {
      number: "A0912",
      name: "Иванов Федор Петрович",
      inOrder: "-",
      benefit: "нет",
      service: "Услуга 4",
      status: "В процессе",
      key: 7,
      time: "15",
    },
  ];

  return (
    <div>
      <UserHeader />

      <div className={styles.main}>
        <div className={styles.cards}>
          <div className={styles.main__firstCard}>
            <p>{t('card.title1')}</p>
            <div>
              <div className={styles.body}>
                <div className={styles.greenlogo}>
                  <img src={arrowGreen} alt="logo" />
                  <span>3</span>
                </div>
                <p>{t('card.body')}</p>
              </div>
              <p className={styles.number}>16</p>
            </div>
          </div>
          <div className={styles.main__secondCard}>
            <p>{t('card.title2')}</p>
            <div>
              <div className={styles.secondBody}>
                <div className={styles.redlogo}>
                  <img src={arrowRed} alt="logo" />
                  <span>1</span>
                </div>
                <p>{t('card.body')}</p>
              </div>
              <p className={styles.number}>4</p>
            </div>
          </div>
        </div>

        <div className={styles.ModalWindow}>
          <button
            className={styles.newTalon}
            onClick={() => setModalActive(true)}>
           {t('newtalon.button')}
          </button>
          <ModalForm active={modalActive} setActive={setModalActive} />
        </div>
      </div>
      <div className={styles.table}>
        <Table
          style={{ width: "90%", marginLeft: "5%" }}
          columns={columns}
          dataSource={data}
          scroll={{ x: 1000 }}
          title={() => (
            <p
              style={{
                fontFamily: "'Inter', sanf-serif",
                color: "#2B2B2B",
                fontSize: "18px",
                fontWeight: "600",
              }}>
          {t('table.titles.allClients')}
            </p>
          )}
        />
      </div>
    </div>
  );
};

export default HomePage;
