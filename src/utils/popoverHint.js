const message = 'Информация о текущем поле';

export const alertComponents = {
   idHint: {
      type: 'warning',
      message,
      description: 'Данное поле нельзя изменить.',
      showIcon: true,
   },
   stingAny: {
      type: 'info',
      message,
      description: 'Строка, любое значение.',
      showIcon: true,
   },
   positionKeyWords: {
      type: 'info',
      message,
      description: 'Ключевое значение: operator, registrator, admin',
      showIcon: true,
   },
   dateAny: {
      type: 'info',
      message,
      description: 'Время, любое значение ',
      showIcon: true,
   },
   dataKeyText: {
      type: 'info',
      message,
      description: 'Дата и время: ММ.ДД ЧЧ:ММ',
      showIcon: true,
   },
   statusKeyWord: {
      type: 'info',
      message,
      description: 'Ключевое значение: active, no active',
      showIcon: true,
   },
   selectKeyWord: {
      type: 'info',
      message,
      description: 'Выбор опций: любое из доступных',
      showIcon: true,
   },
   booleanKey: {
      type: 'info',
      message,
      description: 'Логическое значение: true, false',
      showIcon: true,
   },
   numberAny: {
      type: 'info',
      message,
      description: 'Число, любое значение',
      showIcon: true,
   },
};
