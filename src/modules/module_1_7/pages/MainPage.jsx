import React from "react";
import { useEffect } from "react";
import { useModel_1_7 } from "../zustand/store";

export const MainPage = () => {
  const { getTalons, printTalons, removeTalon, editTalon } = useModel_1_7();

  useEffect(() => {
    getTalons();
  }, []);

  const handlePrintTalon = (id) => {
    printTalons(id);
  };

  const handleRemoveTalon = (id) => {
    removeTalon(id);
  };

  const handleEditTalon = (talonData) => {
    editTalon(talonData);
  };

  return <div>MainPage</div>;
};
