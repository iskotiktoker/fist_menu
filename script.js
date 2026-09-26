const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  [...document.querySelectorAll(selector)];


/* ==============================
   ПЕРЕВОДЫ
============================== */

const I18N = {

  ru: {

    eyebrow:
      "ВКУС, КОТОРЫЙ ЗАПОМИНАЕТСЯ",

    lead:
      "Современное меню с любимыми блюдами, салатами, десертами, напитками и выгодными комбо.",

    hit: "ХИТ",

    all: "Все",

    popular: "Популярное",

    favorites: "Избранное",

    categories: "Категории",

    menu: "Меню",

    nothing:
      "Ничего не найдено",

    tryAgain:
      "Попробуйте другой поиск или категорию.",

    fast: "Быстро",

    fastText:
      "Большинство заказов готовим за 15–25 минут.",

    fresh:
      "Свежие продукты",

    freshText:
      "Готовим из свежих ингредиентов каждый день.",

    payment:
      "Удобная оплата",

    paymentText:
      "Оплатите заказ удобным способом у кассы.",

    cart: "Корзина",

    ingredients:
      "Состав",

    weight:
      "Вес",

    calories:
      "Ккал",

    time:
      "Время",

    addToCart:
      "Добавить в корзину",

    total:
      "Итого",

    checkout:
      "Оформить заказ",

    demo:
      "Демо-версия: заказ не отправляется на сервер.",

    details:
      "Подробнее",

    added:
      "Добавлено в корзину",

    emptyCart:
      "Корзина пуста",

    emptyCartText:
      "Добавьте блюда из меню.",

    orderDemo:
      "Это демо-меню. Подключить реальную отправку заказа можно позже.",

    search:
      "Поиск блюд...",

    som:
      "сом",

    dishes: n =>
      `${n} ${pluralRu(
        n,
        [
          "блюдо",
          "блюда",
          "блюд"
        ]
      )}`

  },


  kg: {

    eyebrow:
      "ЭСТЕ КАЛГАН ДААМ",

    lead:
      "Сүйүктүү тамактар, салаттар, десерттер, суусундуктар жана пайдалуу комбо менен заманбап меню.",

    hit:
      "ХИТ",

    all:
      "Баары",

    popular:
      "Популярдуу",

    favorites:
      "Тандалган",

    categories:
      "Категориялар",

    menu:
      "Меню",

    nothing:
      "Эч нерсе табылган жок",

    tryAgain:
      "Башка издөө же категорияны тандаңыз.",

    fast:
      "Тез",

    fastText:
      "Көпчүлүк заказдар 15–25 мүнөттө даяр болот.",

    fresh:
      "Жаңы азыктар",

    freshText:
      "Күн сайын жаңы ингредиенттерден даярдайбыз.",

    payment:
      "Ыңгайлуу төлөм",

    paymentText:
      "Заказды кассадан ыңгайлуу ыкма менен төлөңүз.",

    cart:
      "Себет",

    ingredients:
      "Курамы",

    weight:
      "Салмак",

    calories:
      "Ккал",

    time:
      "Убакыт",

    addToCart:
      "Себетке кошуу",

    total:
      "Жалпы",

    checkout:
      "Заказ берүү",

    demo:
      "Демо версия: заказ серверге жөнөтүлбөйт.",

    details:
      "Толук",

    added:
      "Себетке кошулду",

    emptyCart:
      "Себет бош",

    emptyCartText:
      "Менюдан тамак кошуңуз.",

    orderDemo:
      "Бул демо меню. Чыныгы заказ жөнөтүүнү кийин кошсо болот.",

    search:
      "Тамак издөө...",

    som:
      "сом",

    dishes: n =>
      `${n} тамак`

  },


  en: {

    eyebrow:
      "A TASTE TO REMEMBER",

    lead:
      "A modern menu with favorite dishes, salads, desserts, drinks and value combos.",

    hit:
      "HIT",

    all:
      "All",

    popular:
      "Popular",

    favorites:
      "Favorites",

    categories:
      "Categories",

    menu:
      "Menu",

    nothing:
      "Nothing found",

    tryAgain:
      "Try another search or category.",

    fast:
      "Fast",

    fastText:
      "Most orders are ready in 15–25 minutes.",

    fresh:
      "Fresh ingredients",

    freshText:
      "Prepared daily with fresh ingredients.",

    payment:
      "Easy payment",

    paymentText:
      "Pay for your order conveniently at the cashier.",

    cart:
      "Cart",

    ingredients:
      "Ingredients",

    weight:
      "Weight",

    calories:
      "Kcal",

    time:
      "Time",

    addToCart:
      "Add to cart",

    total:
      "Total",

    checkout:
      "Place order",

    demo:
      "Demo version: the order is not sent to a server.",

    details:
      "Details",

    added:
      "Added to cart",

    emptyCart:
      "Your cart is empty",

    emptyCartText:
      "Add dishes from the menu.",

    orderDemo:
      "This is a demo menu. Real ordering can be connected later.",

    search:
      "Search dishes...",

    som:
      "KGS",

    dishes: n =>
      `${n} dishes`

  }

};


/* ==============================
   РУССКОЕ СКЛОНЕНИЕ
============================== */

function pluralRu(
  number,
  forms
) {

  const a =
    number % 10;

  const b =
    number % 100;


  if (
    a === 1 &&
    b !== 11
  ) {

    return forms[0];

  }


  if (
    a >= 2 &&
    a <= 4 &&
    (
      b < 12 ||
      b > 14
    )
  ) {

    return forms[1];

  }


  return forms[2];

}


/* ==============================
   КАТЕГОРИИ
============================== */

const CATEGORIES = [

  {

    id: "main",

    icon: "🍛",

    title: {

      ru:
        "Горячие блюда",

      kg:
        "Ысык тамактар",

      en:
        "Main dishes"

    },

    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=82",

    desc: {

      ru:
        "Сытное горячее блюдо, приготовленное из свежих продуктов.",

      kg:
        "Жаңы азыктардан даярдалган тойгузуучу ысык тамак.",

      en:
        "A hearty hot dish prepared with fresh ingredients."

    },

    ingredients: {

      ru:
        "мясо, рис или гарнир, овощи, специи, зелень",

      kg:
        "эт, күрүч же гарнир, жашылча, татымалдар, көк чөп",

      en:
        "meat, rice or side dish, vegetables, spices, herbs"

    },

    names: [

      [
        "Фирменный плов",
        "Фирмалык палоо",
        "Signature Plov"
      ],

      [
        "Плов с говядиной",
        "Уй эти менен палоо",
        "Beef Plov"
      ],

      [
        "Казан-кебаб",
        "Казан-кебаб",
        "Kazan Kebab"
      ],

      [
        "Куурдак",
        "Куурдак",
        "Kuurdak"
      ],

      [
        "Манты",
        "Манты",
        "Manti"
      ],

      [
        "Лагман",
        "Лагман",
        "Lagman"
      ],

      [
        "Бешбармак",
        "Бешбармак",
        "Beshbarmak"
      ],

      [
        "Курица с рисом",
        "Күрүч менен тоок",
        "Chicken with Rice"
      ]

    ]

  },


  {

    id: "grill",

    icon: "🔥",

    title: {

      ru:
        "Гриль",

      kg:
        "Гриль",

      en:
        "Grill"

    },

    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=82",

    desc: {

      ru:
        "Сочное блюдо с гриля с ароматной корочкой и свежим гарниром.",

      kg:
        "Грилде бышкан ширелүү тамак жана жаңы гарнир.",

      en:
        "Juicy grilled dish with a flavorful crust and fresh side."

    },

    ingredients: {

      ru:
        "мясо или курица, овощи гриль, соус, специи",

      kg:
        "эт же тоок, гриль жашылчалар, соус, татымалдар",

      en:
        "meat or chicken, grilled vegetables, sauce, spices"

    },

    names: [

      [
        "Стейк из говядины",
        "Уй этинен стейк",
        "Beef Steak"
      ],

      [
        "Шашлык из баранины",
        "Кой этинен шашлык",
        "Lamb Shashlik"
      ],

      [
        "Шашлык из курицы",
        "Тоок шашлыгы",
        "Chicken Shashlik"
      ],

      [
        "Крылышки BBQ",
        "BBQ канаттары",
        "BBQ Wings"
      ],

      [
        "Люля-кебаб",
        "Люля-кебаб",
        "Lula Kebab"
      ],

      [
        "Овощи гриль",
        "Гриль жашылчалар",
        "Grilled Vegetables"
      ],

      [
        "Рёбра BBQ",
        "BBQ кабырга",
        "BBQ Ribs"
      ],

      [
        "Гриль микс",
        "Гриль микс",
        "Grill Mix"
      ]

    ]

  },


  {

    id:
      "fastfood",

    icon:
      "🍔",

    title: {

      ru:
        "Бургеры и фастфуд",

      kg:
        "Бургер жана фастфуд",

      en:
        "Burgers & Fast Food"

    },

    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=82",

    desc: {

      ru:
        "Сочный фастфуд с овощами и фирменным соусом.",

      kg:
        "Жаңы жашылча жана фирмалык соус менен ширелүү фастфуд.",

      en:
        "Juicy fast food with fresh vegetables and signature sauce."

    },

    ingredients: {

      ru:
        "булочка, мясо или курица, сыр, овощи, фирменный соус",

      kg:
        "булочка, эт же тоок, сыр, жашылча, фирмалык соус",

      en:
        "bun, meat or chicken, cheese, vegetables, signature sauce"

    },

    names: [

      [
        "Классический бургер",
        "Классикалык бургер",
        "Classic Burger"
      ],

      [
        "Чизбургер",
        "Чизбургер",
        "Cheeseburger"
      ],

      [
        "Двойной бургер",
        "Кош бургер",
        "Double Burger"
      ],

      [
        "Чикен бургер",
        "Тоок бургери",
        "Chicken Burger"
      ],

      [
        "Картофель фри",
        "Фри картошка",
        "French Fries"
      ],

      [
        "Наггетсы",
        "Наггетс",
        "Chicken Nuggets"
      ],

      [
        "Хот-дог",
        "Хот-дог",
        "Hot Dog"
      ],

      [
        "Бургер BBQ",
        "BBQ бургер",
        "BBQ Burger"
      ]

    ]

  },


  {

    id:
      "pizza",

    icon:
      "🍕",

    title: {

      ru:
        "Пицца",

      kg:
        "Пицца",

      en:
        "Pizza"

    },

    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=82",

    desc: {

      ru:
        "Пицца на тонком тесте с сыром и ароматным соусом.",

      kg:
        "Жука камырда сыр жана жыпар жыттуу соус менен пицца.",

      en:
        "Thin-crust pizza with melted cheese and aromatic sauce."

    },

    ingredients: {

      ru:
        "тесто, томатный соус, моцарелла, начинка, специи",

      kg:
        "камыр, томат соусу, моцарелла, кошумча, татымалдар",

      en:
        "dough, tomato sauce, mozzarella, toppings, spices"

    },

    names: [

      [
        "Маргарита",
        "Маргарита",
        "Margherita"
      ],

      [
        "Пепперони",
        "Пепперони",
        "Pepperoni"
      ],

      [
        "4 сыра",
        "4 сыр",
        "Four Cheese"
      ],

      [
        "BBQ курица",
        "BBQ тоок",
        "BBQ Chicken"
      ],

      [
        "Мясная",
        "Эттүү",
        "Meat Lovers"
      ],

      [
        "Грибная",
        "Козу карындуу",
        "Mushroom Pizza"
      ],

      [
        "Овощная",
        "Жашылчалуу",
        "Veggie Pizza"
      ],

      [
        "Фирменная ALTYN",
        "ALTYN фирмалык",
        "ALTYN Signature Pizza"
      ]

    ]

  },


  {

    id:
      "salads",

    icon:
      "🥗",

    title: {

      ru:
        "Салаты",

      kg:
        "Салаттар",

      en:
        "Salads"

    },

    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1000&q=82",

    desc: {

      ru:
        "Свежий салат с хрустящими овощами и лёгкой заправкой.",

      kg:
        "Кытырак жаңы жашылчалар жана жеңил соус менен салат.",

      en:
        "Fresh salad with crisp vegetables and a light dressing."

    },

    ingredients: {

      ru:
        "свежие овощи, зелень, соус или масло, специи",

      kg:
        "жаңы жашылчалар, көк чөп, соус же май, татымалдар",

      en:
        "fresh vegetables, herbs, dressing or oil, spices"

    },

    names: [

      [
        "Цезарь с курицей",
        "Тоок менен Цезарь",
        "Chicken Caesar"
      ],

      [
        "Греческий",
        "Грек салаты",
        "Greek Salad"
      ],

      [
        "Овощной",
        "Жашылча салаты",
        "Garden Salad"
      ],

      [
        "Ачичук",
        "Ачичук",
        "Achichuk"
      ],

      [
        "Тёплый салат",
        "Жылуу салат",
        "Warm Salad"
      ],

      [
        "Салат с авокадо",
        "Авокадо салаты",
        "Avocado Salad"
      ],

      [
        "Куриный салат",
        "Тоок салаты",
        "Chicken Salad"
      ],

      [
        "Фирменный салат",
        "Фирмалык салат",
        "Signature Salad"
      ]

    ]

  },


  {

    id:
      "soups",

    icon:
      "🍲",

    title: {

      ru:
        "Супы",

      kg:
        "Шорполор",

      en:
        "Soups"

    },

    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=82",

    desc: {

      ru:
        "Горячий ароматный суп для уютного и сытного обеда.",

      kg:
        "Жылуу жана тойгузуучу түшкү тамак үчүн шорпо.",

      en:
        "A hot aromatic soup for a comforting and filling meal."

    },

    ingredients: {

      ru:
        "бульон, мясо или овощи, зелень, специи",

      kg:
        "сорпо, эт же жашылча, көк чөп, татымалдар",

      en:
        "broth, meat or vegetables, herbs, spices"

    },

    names: [

      [
        "Шорпо",
        "Шорпо",
        "Shorpo"
      ],

      [
        "Мастава",
        "Мастава",
        "Mastava"
      ],

      [
        "Чечевичный суп",
        "Жасмык шорпосу",
        "Lentil Soup"
      ],

      [
        "Куриный суп",
        "Тоок шорпосу",
        "Chicken Soup"
      ],

      [
        "Том Ям",
        "Том Ям",
        "Tom Yum"
      ],

      [
        "Грибной крем-суп",
        "Козу карын крем-шорпосу",
        "Mushroom Cream Soup"
      ],

      [
        "Суп с фрикадельками",
        "Фрикаделька шорпосу",
        "Meatball Soup"
      ],

      [
        "Овощной суп",
        "Жашылча шорпосу",
        "Vegetable Soup"
      ]

    ]

  },


  {

    id:
      "desserts",

    icon:
      "🍰",

    title: {

      ru:
        "Десерты",

      kg:
        "Десерттер",

      en:
        "Desserts"

    },

    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1000&q=82",

    desc: {

      ru:
        "Нежный десерт для сладкого завершения обеда или ужина.",

      kg:
        "Тамакты таттуу аяктоо үчүн назик десерт.",

      en:
        "A delicate dessert for a sweet finish to your meal."

    },

    ingredients: {

      ru:
        "сливки, шоколад или фрукты, сахар, тесто или крем",

      kg:
        "каймак, шоколад же мөмө, кант, камыр же крем",

      en:
        "cream, chocolate or fruit, sugar, pastry or cream"

    },

    names: [

      [
        "Чизкейк",
        "Чизкейк",
        "Cheesecake"
      ],

      [
        "Тирамису",
        "Тирамису",
        "Tiramisu"
      ],

      [
        "Шоколадный фондан",
        "Шоколад фондан",
        "Chocolate Fondant"
      ],

      [
        "Медовик",
        "Медовик",
        "Honey Cake"
      ],

      [
        "Красный бархат",
        "Кызыл бархат",
        "Red Velvet"
      ],

      [
        "Мороженое",
        "Балмуздак",
        "Ice Cream"
      ],

      [
        "Фруктовая тарелка",
        "Мөмө табагы",
        "Fruit Plate"
      ],

      [
        "Пахлава",
        "Пахлава",
        "Baklava"
      ]

    ]

  },


  {

    id:
      "drinks",

    icon:
      "🥤",

    title: {

      ru:
        "Напитки и комбо",

      kg:
        "Суусундуктар жана комбо",

      en:
        "Drinks & Combos"

    },

    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=82",

    desc: {

      ru:
        "Освежающий напиток или выгодный набор к вашему заказу.",

      kg:
        "Заказга сергитүүчү суусундук же пайдалуу комбо.",

      en:
        "A refreshing drink or value combo for your order."

    },

    ingredients: {

      ru:
        "напиток или выбранный набор блюд",

      kg:
        "суусундук же тандалган тамактар топтому",

      en:
        "drink or selected meal combo"

    },

    names: [

      [
        "Coca-Cola 0.5",
        "Coca-Cola 0.5",
        "Coca-Cola 0.5"
      ],

      [
        "Домашний лимонад",
        "Үй лимонады",
        "Homemade Lemonade"
      ],

      [
        "Айран",
        "Айран",
        "Ayran"
      ],

      [
        "Чай с лимоном",
        "Лимон чай",
        "Lemon Tea"
      ],

      [
        "Кофе Latte",
        "Latte кофе",
        "Caffè Latte"
      ],

      [
        "Комбо Бургер",
        "Бургер комбо",
        "Burger Combo"
      ],

      [
        "Комбо Пицца",
        "Пицца комбо",
        "Pizza Combo"
      ],

      [
        "Комбо Семейное",
        "Үй-бүлөлүк комбо",
        "Family Combo"
      ]

    ]

  }

];


/* ==============================
   ЦЕНЫ
============================== */

const priceBase = [

  390,
  420,
  470,
  450,
  340,
  380,
  490,
  360,

  620,
  390,
  360,
  320,
  350,
  290,
  690,
  750,

  280,
  310,
  420,
  300,
  150,
  190,
  180,
  340,

  390,
  430,
  470,
  450,
  520,
  440,
  410,
  580,

  300,
  280,
  240,
  230,
  320,
  350,
  330,
  370,

  250,
  270,
  260,
  280,
  390,
  310,
  290,
  240,

  280,
  260,
  300,
  340,
  260,
  220,
  300,
  290,

  140,
  190,
  120,
  160,
  200,
  420,
  650,
  990

];


/* ==============================
   СОЗДАЁМ 64 БЛЮДА
============================== */

const dishes = [];

let counter = 0;


CATEGORIES.forEach(
  (category, categoryIndex) => {

    category.names.forEach(
      (name, nameIndex) => {

        const id =
          counter + 1;


        dishes.push({

          id:

            id,


          category:

            category.id,


          image:

            category.image,


          name: {

            ru: name[0],

            kg: name[1],

            en: name[2]

          },


          desc:

            category.desc,


          ingredients:

            category.ingredients,


          price:

            priceBase[counter],


          weight:

            category.id === "drinks"

              ? `${250 + (nameIndex % 4) * 100} мл`

              : `${220 + (nameIndex % 5) * 50} г`,


          calories:

            category.id === "drinks"

              ? `${80 + nameIndex * 25}`

              : `${260 + (
                    (
                      categoryIndex * 8 +
                      nameIndex
                    ) % 7
                  ) * 65}`,


          time:

            category.id === "drinks"

              ? "5 мин"

              : `${12 + (nameIndex % 4) * 4} мин`,


          popular:

            nameIndex < 3 ||
            id === 1,


          isNew:

            nameIndex === 7

        });


        counter++;

      }

    );

  }

);


/* ==============================
   СОСТОЯНИЕ САЙТА
============================== */

const state = {

  lang:

    localStorage.getItem(
      "altynLang"
    ) || "ru",


  category:

    "all",


  filter:

    "all",


  search:

    "",


  favorites:

    new Set(

      JSON.parse(

        localStorage.getItem(
          "altynFav"
        ) || "[]"

      )

    ),


  cart:

    JSON.parse(

      localStorage.getItem(
        "altynCart"
      ) || "{}"

    ),


  modalId:

    null

};


/* ==============================
   ФУНКЦИИ
============================== */

function t(key) {

  return I18N[state.lang][key];

}


function categoryById(id) {

  return CATEGORIES.find(
    category =>
      category.id === id
  );

}


function money(value) {

  return `${value} ${t("som")}`;

}


/* ==============================
   СОХРАНЕНИЕ
============================== */

function save() {

  localStorage.setItem(

    "altynLang",

    state.lang

  );


  localStorage.setItem(

    "altynFav",

    JSON.stringify(
      [...state.favorites]
    )

  );


  localStorage.setItem(

    "altynCart",

    JSON.stringify(
      state.cart
    )

  );

}


/* ==============================
   ЯЗЫК
============================== */

function applyLanguage() {

  document.documentElement.lang =
    state.lang;


  $$("[data-i18n]").forEach(

    element => {

      const key =
        element.dataset.i18n;


      if (
        I18N[state.lang][key]
      ) {

        element.textContent =
          t(key);

      }

    }

  );


  $("#searchInput").placeholder =
    t("search");


  $$(".langs button").forEach(

    button => {

      button.classList.toggle(

        "active",

        button.dataset.lang ===
          state.lang

      );

    }

  );


  renderCategories();

  renderMenu();

  renderCart();

  renderHero();


  if (
    state.modalId
  ) {

    openDish(
      state.modalId,
      true
    );

  }

}


/* ==============================
   КАТЕГОРИИ
============================== */

function renderCategories() {

  const allTitle =
    t("all");


  const items = [

    {

      id: "all",

      icon: "✦",

      title:
        allTitle

    },


    ...CATEGORIES.map(

      category => ({

        id:
          category.id,

        icon:
          category.icon,

        title:
          category.title[
            state.lang
          ]

      })

    )

  ];


  $("#categoryList").innerHTML =

    items.map(

      item => `

        <button

          class="
            side-btn
            ${
              state.category === item.id
                ? "active"
                : ""
            }
          "

          data-cat="${item.id}">

          <span>
            ${item.icon}
            ${item.title}
          </span>

          <span>›</span>

        </button>

      `

    ).join("");


  $("#mobileCategories").innerHTML =

    items.map(

      item => `

        <button

          class="
            category-btn
            ${
              state.category === item.id
                ? "active"
                : ""
            }
          "

          data-cat="${item.id}">

          ${item.icon}
          ${item.title}

        </button>

      `

    ).join("");


  $$("[data-cat]").forEach(

    button => {

      button.onclick =
        () => {

          state.category =
            button.dataset.cat;


          renderCategories();

          renderMenu();


          window.scrollTo({

            top:
              $(".menu").offsetTop
              - 80,

            behavior:
              "smooth"

          });

        };

    }

  );

}


/* ==============================
   ФИЛЬТРАЦИЯ
============================== */

function filteredDishes() {

  let array =
    dishes;


  if (
    state.category !==
    "all"
  ) {

    array =
      array.filter(

        dish =>
          dish.category ===
          state.category

      );

  }


  if (
    state.filter ===
    "popular"
  ) {

    array =
      array.filter(

        dish =>
          dish.popular

      );

  }


  if (
    state.filter ===
    "favorites"
  ) {

    array =
      array.filter(

        dish =>
          state.favorites.has(
            dish.id
          )

      );

  }


  const search =

    state.search
      .trim()
      .toLowerCase();


  if (search) {

    array =
      array.filter(

        dish => {

          const category =
            categoryById(
              dish.category
            );


          const text = `

            ${dish.name.ru}

            ${dish.name.kg}

            ${dish.name.en}

            ${category.title[state.lang]}

          `.toLowerCase();


          return text.includes(
            search
          );

        }

      );

  }


  return array;

}


/* ==============================
   КАРТОЧКА БЛЮДА
============================== */

function cardHTML(dish) {

  const category =
    categoryById(
      dish.category
    );


  const favorite =

    state.favorites.has(
      dish.id
    );


  return `

  <article class="card">


    <div
      class="card-image"
      data-open="${dish.id}">


      <img

        src="${dish.image}"

        alt="${dish.name[state.lang]}"

        loading="lazy">


      <div class="card-badges">

        ${
          dish.popular

            ? `
              <span class="mini-badge">
                ${t("hit")}
              </span>
            `

            : ""
        }


        ${
          dish.isNew

            ? `
              <span class="mini-badge">
                NEW
              </span>
            `

            : ""
        }

      </div>


      <button

        class="
          fav
          ${
            favorite
              ? "active"
              : ""
          }
        "

        data-fav="${dish.id}">

        ${
          favorite
            ? "♥"
            : "♡"
        }

      </button>


    </div>


    <div class="card-body">


      <p class="card-cat">

        ${category.icon}

        ${category.title[state.lang]}

      </p>


      <h3>

        ${dish.name[state.lang]}

      </h3>


      <p class="card-desc">

        ${dish.desc[state.lang]}

      </p>


      <div class="card-bottom">


        <strong>

          ${money(dish.price)}

        </strong>


        <div class="card-actions">


          <button

            class="details"

            data-open="${dish.id}">

            ${t("details")}

          </button>


          <button

            class="add"

            data-add="${dish.id}">

            +

          </button>


        </div>

      </div>


    </div>


  </article>

  `;

}


/* ==============================
   ПОКАЗ МЕНЮ
============================== */

function renderMenu() {

  const array =
    filteredDishes();


  $("#menuGrid").innerHTML =

    array.map(
      cardHTML
    ).join("");


  $("#resultsCount").textContent =

    t("dishes")(
      array.length
    );


  $("#dishCountHero").textContent =

    t("dishes")(
      dishes.length
    );


  $("#emptyState").classList.toggle(

    "hidden",

    array.length > 0

  );


  $("#menuGrid").classList.toggle(

    "hidden",

    array.length === 0

  );


  $$("[data-open]").forEach(

    element => {

      element.onclick =
        event => {

          if (

            event.target.closest(
              "[data-fav]"
            )

          ) {

            return;

          }


          openDish(

            Number(
              element.dataset.open
            )

          );

        };

    }

  );


  $$("[data-add]").forEach(

    button => {

      button.onclick =
        () => {

          addToCart(

            Number(
              button.dataset.add
            )

          );

        };

    }

  );


  $$("[data-fav]").forEach(

    button => {

      button.onclick =
        event => {

          event.stopPropagation();


          toggleFavorite(

            Number(
              button.dataset.fav
            )

          );

        };

    }

  );

}


/* ==============================
   HERO
============================== */

function renderHero() {

  const dish =
    dishes[0];


  $("#heroImage").src =
    dish.image;


  $("#heroName").textContent =
    dish.name[state.lang];


  $("#heroPrice").textContent =
    money(
      dish.price
    );

}


/* ==============================
   ИЗБРАННОЕ
============================== */

function toggleFavorite(id) {

  if (
    state.favorites.has(id)
  ) {

    state.favorites.delete(id);

  }

  else {

    state.favorites.add(id);

  }


  save();

  renderMenu();


  if (
    state.modalId === id
  ) {

    $("#modalFav").classList.toggle(

      "active",

      state.favorites.has(id)

    );


    $("#modalFav").textContent =

      state.favorites.has(id)

        ? "♥"

        : "♡";

  }

}


/* ==============================
   КОРЗИНА
============================== */

function addToCart(id) {

  state.cart[id] =

    (
      state.cart[id] ||
      0
    ) + 1;


  save();

  renderCart();

  showToast(
    t("added")
  );

}


function changeQuantity(
  id,
  change
) {

  state.cart[id] =

    (
      state.cart[id] ||
      0
    ) + change;


  if (
    state.cart[id] <= 0
  ) {

    delete state.cart[id];

  }


  save();

  renderCart();

}


function removeFromCart(id) {

  delete state.cart[id];

  save();

  renderCart();

}


/* ==============================
   ДАННЫЕ КОРЗИНЫ
============================== */

function cartData() {

  return Object.entries(

    state.cart

  ).map(

    ([id, quantity]) => ({

      dish:

        dishes.find(

          dish =>
            dish.id ===
            Number(id)

        ),


      quantity:

        Number(quantity)

    })

  ).filter(

    item =>
      item.dish

  );

}


/* ==============================
   ПОКАЗ КОРЗИНЫ
============================== */

function renderCart() {

  const items =
    cartData();


  const count =

    items.reduce(

      (sum, item) =>
        sum + item.quantity,

      0

    );


  const total =

    items.reduce(

      (sum, item) =>

        sum +

        (
          item.quantity *
          item.dish.price
        ),

      0

    );


  $("#cartCount").textContent =
    count;


  $("#floatingTotal").textContent =
    money(total);


  $("#cartTotal").textContent =
    money(total);


  $("#floatingCart").classList.toggle(

    "show",

    count > 0

  );


  if (
    !items.length
  ) {

    $("#cartItems").innerHTML = `

      <div class="cart-empty">

        <div>🛒</div>

        <h3>
          ${t("emptyCart")}
        </h3>

        <p>
          ${t("emptyCartText")}
        </p>

      </div>

    `;


    return;

  }


  $("#cartItems").innerHTML =

    items.map(

      item => {

        const dish =
          item.dish;


        return `

          <div class="cart-item">


            <img

              src="${dish.image}"

              alt="${dish.name[state.lang]}">


            <div>


              <h4>

                ${dish.name[state.lang]}

              </h4>


              <small>

                ${money(dish.price)}

              </small>


              <div class="qty">


                <button

                  data-minus="${dish.id}">

                  −

                </button>


                <span>

                  ${item.quantity}

                </span>


                <button

                  data-plus="${dish.id}">

                  +

                </button>


              </div>


            </div>


            <button

              class="remove"

              data-remove="${dish.id}">

              ×

            </button>


          </div>

        `;

      }

    ).join("");


  $$("[data-minus]").forEach(

    button => {

      button.onclick =
        () => {

          changeQuantity(

            Number(
              button.dataset.minus
            ),

            -1

          );

        };

    }

  );


  $$("[data-plus]").forEach(

    button => {

      button.onclick =
        () => {

          changeQuantity(

            Number(
              button.dataset.plus
            ),

            1

          );

        };

    }

  );


  $$("[data-remove]").forEach(

    button => {

      button.onclick =
        () => {

          removeFromCart(

            Number(
              button.dataset.remove
            )

          );

        };

    }

  );

}


/* ==============================
   ОТКРЫТЬ БЛЮДО
============================== */

function openDish(
  id,
  refresh = false
) {

  const dish =

    dishes.find(

      item =>
        item.id === id

    );


  if (
    !dish
  ) {

    return;

  }


  state.modalId =
    id;


  const category =

    categoryById(
      dish.category
    );


  $("#modalImage").src =
    dish.image;


  $("#modalCategory").textContent =

    `${category.icon}
     ${category.title[state.lang]}`;


  $("#modalName").textContent =
    dish.name[state.lang];


  $("#modalDescription").textContent =
    dish.desc[state.lang];


  $("#modalIngredients").textContent =
    dish.ingredients[state.lang];


  $("#modalWeight").textContent =
    dish.weight;


  $("#modalCalories").textContent =
    dish.calories;


  $("#modalTime").textContent =
    dish.time;


  $("#modalPrice").textContent =
    money(
      dish.price
    );


  $("#modalFav").classList.toggle(

    "active",

    state.favorites.has(id)

  );


  $("#modalFav").textContent =

    state.favorites.has(id)

      ? "♥"

      : "♡";


  $("#modalAdd").onclick =
    () => {

      addToCart(id);

    };


  $("#modalFav").onclick =
    () => {

      toggleFavorite(id);

    };


  if (
    !refresh
  ) {

    $("#dishOverlay").classList.add(
      "open"
    );


    document.body.classList.add(
      "lock"
    );

  }

}


/* ==============================
   ЗАКРЫТЬ БЛЮДО
============================== */

function closeDish() {

  state.modalId =
    null;


  $("#dishOverlay").classList.remove(
    "open"
  );


  if (

    !$("#cartOverlay")
      .classList
      .contains("open")

  ) {

    document.body.classList.remove(
      "lock"
    );

  }

}


/* ==============================
   ОТКРЫТЬ КОРЗИНУ
============================== */

function openCart() {

  renderCart();


  $("#cartOverlay").classList.add(
    "open"
  );


  document.body.classList.add(
    "lock"
  );

}


/* ==============================
   ЗАКРЫТЬ КОРЗИНУ
============================== */

function closeCart() {

  $("#cartOverlay").classList.remove(
    "open"
  );


  if (

    !$("#dishOverlay")
      .classList
      .contains("open")

  ) {

    document.body.classList.remove(
      "lock"
    );

  }

}


/* ==============================
   УВЕДОМЛЕНИЕ
============================== */

let toastTimer;


function showToast(message) {

  clearTimeout(
    toastTimer
  );


  $("#toast").textContent =
    message;


  $("#toast").classList.add(
    "show"
  );


  toastTimer =
    setTimeout(

      () => {

        $("#toast").classList.remove(
          "show"
        );

      },

      1700

    );

}


/* ==============================
   КНОПКИ ЯЗЫКА
============================== */

$$(".langs button").forEach(

  button => {

    button.onclick =
      () => {

        state.lang =
          button.dataset.lang;


        save();

        applyLanguage();

      };

  }

);


/* ==============================
   ФИЛЬТРЫ
============================== */

$$("[data-filter]").forEach(

  button => {

    button.onclick =
      () => {

        state.filter =
          button.dataset.filter;


        $$("[data-filter]").forEach(

          item => {

            item.classList.toggle(

              "active",

              item === button

            );

          }

        );


        renderMenu();

      };

  }

);


/* ==============================
   ПОИСК
============================== */

$("#searchInput").oninput =
  event => {

    state.search =
      event.target.value;


    renderMenu();

  };


$("#clearSearch").onclick =
  () => {

    $("#searchInput").value =
      "";


    state.search =
      "";


    renderMenu();


    $("#searchInput").focus();

  };


/* ==============================
   КНОПКА HERO
============================== */

$("#heroAdd").onclick =
  () => {

    addToCart(1);

  };


/* ==============================
   КОРЗИНА
============================== */

$("#openCart").onclick =
  openCart;


$("#floatingCart").onclick =
  openCart;


$("#closeCart").onclick =
  closeCart;


/* ==============================
   MODAL
============================== */

$("#closeDish").onclick =
  closeDish;


/* ==============================
   ЗАКАЗ
============================== */

$("#checkoutBtn").onclick =
  () => {

    showToast(
      t("orderDemo")
    );

  };


/* ==============================
   КЛИК ПО ФОНУ
============================== */

$("#dishOverlay").onclick =
  event => {

    if (

      event.target ===
      $("#dishOverlay")

    ) {

      closeDish();

    }

  };


$("#cartOverlay").onclick =
  event => {

    if (

      event.target ===
      $("#cartOverlay")

    ) {

      closeCart();

    }

  };


/* ==============================
   ESC
============================== */

document.addEventListener(

  "keydown",

  event => {

    if (
      event.key ===
      "Escape"
    ) {

      closeDish();

      closeCart();

    }

  }

);


/* ==============================
   ЗАПУСК САЙТА
============================== */

applyLanguage();