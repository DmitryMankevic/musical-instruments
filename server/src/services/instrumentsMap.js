// server/src/services/instrumentsMap.js

const instrumentsMap = {
  // 🎸 Гитары
  гитара: ["Ibanez GRX70QA"],
  электрогитара: ["Ibanez GRX70QA"],
  "электро-гитара": ["Ibanez GRX70QA"],
  "бас-гитара": ["Ibanez GRX70QA"],
  "акустическая гитара": ["Cort AD810"],
  акустика: ["Cort AD810"],

  // 🥁 Ударные
  ударные: ["Alesis Nitro Mesh Kit"],
  барабаны: ["Alesis Nitro Mesh Kit"],
  барабан: ["Alesis Nitro Mesh Kit"],
  установка: ["Alesis Nitro Mesh Kit"],
  "барабанная установка": ["Alesis Nitro Mesh Kit"],

  // 🎹 Клавишные
  пианино: ["Medeli SP201"],
  фортепиано: ["Medeli SP201"],
  рояль: ["Medeli SP201"],
  клавиши: ["Yamaha PSR-E373"],
  синтезатор: ["Yamaha PSR-E373"],
  клавиатура: ["Yamaha PSR-E373"],

  // 🎻 Струнные
  скрипка: ["Скрипка Stentor Student I 4-4"],
  виолончель: ["Виолончель Yamaha AVC5S"],
  контрабас: ["Контрабас Gewa Allegro 3-4"],
  арфа: ["Арфа Salvi Mia 34"],
  балалайка: ["Балалайка Prima"],
  струнные: ["Скрипка Stentor Student I 4-4"],

  // 🎷 Духовые
  саксофон: ["Саксофон Yamaha YAS-280"],
  кларнет: ["Кларнет Buffet Crampon E11"],
  труба: ["Труба Bach TR300H2"],
  флейта: ["Флейта Yamaha YFL-222"],
  тромбон: ["Тромбон Jupiter JTB700"],
  духовые: ["Саксофон Yamaha YAS-280"],

  // 🎧 Аудиооборудование
  аудиоинтерфейс: ["Behringer UMC404HD"],
  "звуковая карта": ["Behringer UMC404HD"],
  интерфейс: ["Behringer UMC404HD"],
  мониторы: ["PreSonus Eris E3.5"],
  колонки: ["PreSonus Eris E3.5"],
  "студийные мониторы": ["PreSonus Eris E3.5"],

  // 🎚 DJ-оборудование
  "dj контроллер": ["Numark Mixtrack Platinum FX"],
  контроллер: ["Numark Mixtrack Platinum FX"],
  "диджейский пульт": ["Numark Mixtrack Platinum FX"],
};

// 💡 Альтернативы для отсутствующих инструментов
const instrumentAlternatives = {
  "бас-гитара": ["электрогитара", "гитара"],
  фортепиано: ["синтезатор", "клавиши"],
  рояль: ["синтезатор"],
  виолончель: ["скрипка", "контрабас"],
  арфа: ["скрипка"],
  духовые: ["саксофон", "труба"],
  контрабас: ["виолончель"],
  балалайка: ["гитара"],
  клавиатура: ["синтезатор"],
  "dj пульт": ["контроллер"],
};


module.exports = { instrumentsMap, instrumentAlternatives };
