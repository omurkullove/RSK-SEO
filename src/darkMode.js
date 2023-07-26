export const CardDarkModeAdapter = (isDarkMode, id) => {
   if (isDarkMode && id) {
      return 'red';
   } else if (isDarkMode && !id) {
      return 'darkBlue';
   } else if (!isDarkMode && id) {
      return 'orange';
   } else if (!isDarkMode && !id) {
      return 'white';
   }
};
