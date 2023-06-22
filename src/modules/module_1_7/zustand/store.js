import zustand from "zustand";
import { API } from "../../../mainUtils/variables";
import axios from "axios";

export const useModel_1_7 = create((set, get) => ({
  // Get all talons

  getTalons: async () => {
    try {
      const res = await axios.get(`${API}/talons/`);
      const talonsData = res.data.talons;
      set({
        talons: talonsData,
      });
    } catch (error) {
      console.log(error, " <<<<<Ошибка при получений данных");
    }
  },
  // Print talon with personal id
  printTalons: async () => {
    try {
      await axios.post(`${API}/talons/print`, { id });
      console.log(" <<< Успешно распечатан талон с id:", id);
    } catch (error) {
      console.log(error, "<<<< Ошибка при распечатки талона");
    }
  },

  // Delete talon

  removeTalon: async (id) => {
    try {
      await axios.delete(`${API}/talons/remove/`, { data: { id } }),
        console.log("<<<< Успещно  удален талон с id >>>>", id);
    } catch (error) {
      console.log(error, "Ошибка при удалиении >>>");
    }
  },

  //   Edit and Update talon

  editTalon: async (talonData) => {
    try {
      await axios.patch(`${API}/talons/edit`, talonData);
      console.log("<<<<< Успешно отредактирован талон с id >>>", talonData.id);
    } catch (error) {
      console.log(error, "<<<<< Ошибка при редактировании талона>>");
    }
  },
}));
