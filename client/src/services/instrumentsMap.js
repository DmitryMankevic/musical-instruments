const instrumentsMap = {
  // 🎸 Гитары
  гитара: [
    "Ibanez GRX70QA",
    "Fender Player Stratocaster",
    "Gibson Les Paul Studio",
    "Yamaha Pacifica 112V",
    "Cort AD810"
  ],
  электрогитара: ["Fender Player Stratocaster", "Ibanez GRX70QA", "Gibson Les Paul Studio"],
  "бас-гитара": ["Fender Player Stratocaster", "Yamaha Pacifica 112V"],
  акустика: ["Cort AD810"],

  // 🥁 Ударные
  ударные: [
    "Alesis Nitro Mesh Kit",
    "Pearl Export EXX725S",
    "Tama Imperialstar",
    "Roland TD-1DMK",
    "Mapex Mars Crossover"
  ],
  барабаны: ["Alesis Nitro Mesh Kit", "Pearl Export EXX725S"],
  "барабанная установка": ["Mapex Mars Crossover"],

  // 🎹 Клавишные
  пианино: ["Roland FP-10", "Casio CDP-S110", "Medeli SP201"],
  фортепиано: ["Roland FP-10", "Medeli SP201"],
  рояль: ["Roland FP-10"],
  синтезатор: [
    "Yamaha PSR-E373",
    "Roland GO-KEYS",
    "Korg EK-50",
    "Yamaha MX61 V2",
    "Casio CT-S500",
    "Arturia MicroFreak",
    "Korg Pa700"
  ],
  клавиши: ["Yamaha PSR-E373", "Casio CT-S500"],
  клавиатура: ["Yamaha PSR-E373"],

  // 🎻 Струнные / Смычковые
  скрипка: [
    "Скрипка Stentor Student I 4-4",
    "Stentor Student II 4/4",
    "Yamaha V5SA",
    "Cremona SV-500",
    "Palatino VN-450"
  ],
  виолончель: ["Виолончель Yamaha AVC5S", "Karl Höfner H8-V"],
  контрабас: ["Контрабас Gewa Allegro 3-4"],
  арфа: ["Арфа Salvi Mia 34"],
  балалайка: ["Балалайка Prima"],
  струнные: [
    "Скрипка Stentor Student I 4-4",
    "Виолончель Yamaha AVC5S",
    "Контрабас Gewa Allegro 3-4",
    "Арфа Salvi Mia 34",
    "Балалайка Prima"
  ],
  смычковые: ["Stentor Student II 4/4", "Karl Höfner H8-V", "Cremona SV-500"],

  // 🎷 Духовые
  саксофон: ["Саксофон Yamaha YAS-280"],
  кларнет: ["Кларнет Buffet Crampon E11"],
  труба: ["Труба Bach TR300H2"],
  флейта: ["Флейта Yamaha YFL-222"],
  тромбон: ["Тромбон Jupiter JTB700"],
  духовые: ["Саксофон Yamaha YAS-280", "Флейта Yamaha YFL-222"],

  // 🎹 Синтезаторы (дублируем для совпадений AI)
  синт: ["Yamaha MX61 V2", "Arturia MicroFreak", "Roland GO-KEYS"],

  // 🎧 Аудиооборудование
  аудиоинтерфейс: ["Behringer UMC404HD", "Focusrite Scarlett 2i2 3rd Gen"],
  "звуковая карта": ["Focusrite Scarlett 2i2 3rd Gen", "Behringer UMC404HD"],
  интерфейс: ["Behringer UMC404HD"],
  мониторы: ["PreSonus Eris E3.5", "KRK Rokit 5 G4", "Yamaha HS5"],
  колонки: ["KRK Rokit 5 G4", "PreSonus Eris E3.5"],
  "студийные мониторы": ["Yamaha HS5", "KRK Rokit 5 G4"],

  // 🎚 DJ-оборудование
  "dj контроллер": [
    "Numark Mixtrack Platinum FX",
    "Pioneer DDJ-FLX4",
    "Denon DJ SC LIVE 2",
    "Native Instruments Traktor Kontrol S4 MK3"
  ],
  контроллер: ["Numark Mixtrack Platinum FX", "Pioneer DDJ-FLX4"],
  "диджейский пульт": ["Behringer DDM4000"],
  "dj пульт": ["Behringer DDM4000"],

  // 🎒 Аксессуары
  аксессуары: [
    "Planet Waves PW-CT-17",
    "Ernie Ball Regular Slinky 10-46",
    "Boss BIC-10A",
    "Hercules GS414B Plus",
    "Dunlop Tortex Standard 1.0"
  ],
  тюнер: ["Planet Waves PW-CT-17"],
  медиатор: ["Dunlop Tortex Standard 1.0"],
  стойка: ["Hercules GS414B Plus"],
  струны: ["Ernie Ball Regular Slinky 10-46"],
  кабель: ["Boss BIC-10A"]
};

// 💡 Группы подмен / логика для категорий
export const instrumentAlternatives = {
  клавишные: ["синтезатор", "пианино", "фортепиано", "рояль", "клавиши", "клавиатура"],
  струнные: ["скрипка", "виолончель", "контрабас", "арфа", "балалайка"], // убрали гитары!
  смычковые: ["скрипка", "виолончель", "контрабас"],
  ударные: ["ударные", "барабаны", "установка", "перкуссия"],
  духовые: ["саксофон", "флейта", "кларнет", "труба", "тромбон"],
  аудио: ["аудиоинтерфейс", "мониторы", "звуковая карта"],
  dj: ["dj контроллер", "диджейский пульт", "контроллер"],
  аксессуары: ["струны", "тюнер", "стойка", "медиатор", "кабель"],

  // Подмены частных случаев
  "бас-гитара": ["гитара", "электрогитара"],
  фортепиано: ["синтезатор", "пианино"],
  рояль: ["синтезатор"],
  виолончель: ["скрипка", "контрабас"],
  арфа: ["скрипка", "виолончель"],
  контрабас: ["виолончель", "гитара"],
  балалайка: ["гитара"],
  клавиатура: ["синтезатор"],
  "dj пульт": ["контроллер", "dj контроллер"]
};

export default instrumentsMap;
