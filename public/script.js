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
      "Реквизиты для оплаты доставки пришлём в WhatsApp.",

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


    details:
      "Подробнее",

    added:
      "Добавлено в корзину",

    emptyCart:
      "Корзина пуста",

    emptyCartText:
      "Добавьте блюда из меню.",


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
      "Жеткирүү үчүн төлөм маалыматын WhatsApp аркылуу жөнөтөбүз.",

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


    details:
      "Толук",

    added:
      "Себетке кошулду",

    emptyCart:
      "Себет бош",

    emptyCartText:
      "Менюдан тамак кошуңуз.",


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
      "We send delivery payment details via WhatsApp.",

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


    details:
      "Details",

    added:
      "Added to cart",

    emptyCart:
      "Your cart is empty",

    emptyCartText:
      "Add dishes from the menu.",


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

// Shared server data replaces the original static seed on Netlify.
if (Array.isArray(window.ALTYN_LIVE_MENU)) dishes.splice(0, dishes.length, ...window.ALTYN_LIVE_MENU);

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

  renderMobileExperience();


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

  <article class="card ${isDishAvailable(dish.id) ? "" : "sold-out-card"}">


    <div
      class="card-image"
      data-open="${dish.id}">


      <img

        src="${escapeHtml(optimizedImage(dish.image, 480))}"
        srcset="${escapeHtml(optimizedImage(dish.image, 240))} 240w, ${escapeHtml(optimizedImage(dish.image, 480))} 480w, ${escapeHtml(optimizedImage(dish.image, 720))} 720w"
        sizes="(max-width: 520px) 42vw, 210px"
        decoding="async"

        alt="${escapeHtml(dish.name[state.lang])}"

        loading="lazy" width="480" height="360">


      <div class="card-badges">
        <span class="mini-badge availability ${isDishAvailable(dish.id) ? "in-stock" : "out-of-stock"}">${t(isDishAvailable(dish.id) ? "available" : "soldOut")}</span>

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

        ${escapeHtml(dish.name[state.lang])}

      </h3>


      <p class="card-desc">

        ${escapeHtml(dish.desc[state.lang])}

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

            data-add="${dish.id}" ${isDishAvailable(dish.id) ? "" : "disabled"} aria-label="${t(isDishAvailable(dish.id) ? "addToCart" : "soldOut")}">

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
  $(".hero-card").classList.toggle("hidden", !dish);
  if (!dish) return;


  $("#heroImage").src = optimizedImage(dish.image, 800);
  $("#heroImage").srcset = [400, 800, 1200].map(width => `${optimizedImage(dish.image, width)} ${width}w`).join(", ");
  $("#heroImage").sizes = "(max-width: 520px) 100vw, 520px";
  $("#heroAdd").disabled = !isDishAvailable(dish.id);
  $("#heroAdd").setAttribute("aria-label", t(isDishAvailable(dish.id) ? "addToCart" : "soldOut"));


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
  if (!dishes.some(dish => dish.id === id)) return;
  if (!isDishAvailable(id)) { showToast(t("soldOut")); return; }

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

  if (change > 0 && !isDishAvailable(id)) { showToast(t("soldOut")); return; }
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

  renderOrderSummary();


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

              src="${escapeHtml(optimizedImage(dish.image, 160))}" loading="lazy" decoding="async" width="80" height="80"

              alt="${escapeHtml(dish.name[state.lang])}">


            <div>


              <h4>

                ${escapeHtml(dish.name[state.lang])}

              </h4>


              <small>

                ${money(dish.price)}

              </small>
              ${!isDishAvailable(dish.id) ? `<small class="out-of-stock">${t("soldOut")}</small>` : ""}


              <div class="qty">


                <button

                  data-minus="${dish.id}">

                  −

                </button>


                <span>

                  ${item.quantity}

                </span>


                <button

                  data-plus="${dish.id}" ${isDishAvailable(dish.id) ? "" : "disabled"} aria-label="${t("addToCart")}">

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


  $("#modalImage").src = optimizedImage(dish.image, 900);


  $("#modalCategory").textContent =

    `${category.icon}
     ${category.title[state.lang]}`;


  $("#modalName").textContent =
    dish.name[state.lang];


  $("#modalDescription").textContent =
    dish.desc[state.lang];


  $("#modalIngredients").textContent =
    dish.ingredients?.[state.lang] || "";


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


  renderDishFacts(dish);

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

    if (dishes[0]) addToCart(dishes[0].id);

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

/* DELIVERY AND RESTAURANT LIST */
const orderConfig = window.ALTYN_ORDER_CONFIG || { whatsappNumber: '996600000313', deliveryFees: { city: 150, outside: 200 } };
let orderMode = 'delivery';
const orderWords = {
  orderType: ['Тип заказа', 'Заказдын түрү', 'Order type'],
  delivery: ['Доставка', 'Жеткирүү', 'Delivery'],
  restaurant: ['В ресторане', 'Ресторанда', 'At the restaurant'],
  waiterTitle: ['Покажите список официанту', 'Тизмени официантка көрсөтүңүз', 'Show your list to the waiter'],
  waiterText: ['Официант примет заказ и уточнит пожелания. Список на сайте сам по себе не оформляет заказ.', 'Официант заказды кабыл алып, каалоолоруңузду тактайт. Сайттагы тизме заказ катары жөнөтүлбөйт.', 'Your waiter will take the order and confirm your preferences. This list does not place an order.'],
  deliveryDetails: ['Данные для доставки', 'Жеткирүү маалыматы', 'Delivery details'],
  requiredHint: ['Поля со звёздочкой обязательны.', 'Жылдызча менен белгиленген талаалар милдеттүү.', 'Fields marked with an asterisk are required.'],
  customerName: ['Имя *', 'Атыңыз *', 'Name *'],
  customerPhone: ['Телефон *', 'Телефон *', 'Phone *'],
  address: ['Улица и дом *', 'Көчө жана үй *', 'Street and building *'],
  apartment: ['Квартира / офис', 'Батир / кеңсе', 'Apartment / office'],
  entrance: ['Подъезд', 'Кире бериш', 'Entrance'],
  floor: ['Этаж', 'Кабат', 'Floor'],
  intercom: ['Домофон', 'Домофон', 'Intercom'],
  deliveryTime: ['Когда доставить', 'Качан жеткирүү керек', 'Delivery time'],
  asap: ['Как можно скорее', 'Мүмкүн болушунча тез', 'As soon as possible'],
  scheduled: ['К указанному времени', 'Көрсөтүлгөн убакта', 'At a requested time'],
  requestedTime: ['Дата и время по Бишкеку (UTC+6) *', 'Бишкек убактысы боюнча күн жана саат (UTC+6) *', 'Date and time in Bishkek (UTC+6) *'],
  comment: ['Комментарий к заказу', 'Заказга комментарий', 'Order notes'],
  commentHint: ['Пожелания к блюдам, ориентир для курьера…', 'Тамакка каалоолор, курьер үчүн багыт…', 'Food preferences, directions for the courier…'],
  qrOnly: ['Оплата картой / переводом', 'Карта / которуу менен төлөө', 'Card / bank transfer'],
  paymentAfterOrder: ['После заказа ресторан отправит номер карты или QR-код в WhatsApp. Переведите оплату по этим реквизитам и отправьте чек в том же чате.', 'Заказдан кийин ресторан карта номерин же QR-кодду WhatsApp аркылуу жөнөтөт. Ошол реквизиттерге төлөп, чекти ошол чатка жөнөтүңүз.', 'After receiving your order, the restaurant will send a card number or QR code on WhatsApp. Pay using those details and send your receipt in the same chat.'],
  deliveryZone: ['Зона доставки *', 'Жеткирүү аймагы *', 'Delivery area *'],
  chooseZone: ['Выберите зону доставки', 'Жеткирүү аймагын тандаңыз', 'Choose a delivery area'],
  cityZone: ['По городу — 150 сом', 'Шаар ичинде — 150 сом', 'Within the city — 150 KGS'],
  outsideZone: ['За город — 200 сом', 'Шаардын сыртында — 200 сом', 'Outside the city — 200 KGS'],
  zonePending: ['Выберите зону', 'Аймакты тандаңыз', 'Choose an area'],
  deliveryPending: ['+ стоимость доставки', '+ жеткирүү акысы', '+ delivery fee'],
  foodSubtotal: ['Сумма блюд', 'Тамактардын суммасы', 'Food subtotal'],
  sendWhatsapp: ['Заказать через WhatsApp', 'WhatsApp аркылуу заказ берүү', 'Order via WhatsApp'],
  whatsappHint: ['Откроется WhatsApp с заказом. Нажмите «Отправить», чтобы ресторан получил сообщение.', 'Заказ менен WhatsApp ачылат. Ресторанга жөнөтүү үчүн «Жөнөтүү» баскычын басыңыз.', 'WhatsApp will open with your order. Tap Send so the restaurant receives it.'],
  futureTime: ['Укажите будущее время доставки.', 'Жеткирүүнүн келечектеги убактысын көрсөтүңүз.', 'Choose a future delivery time.'],
  phoneError: ['Укажите телефон: от 7 до 15 цифр.', 'Телефонду жазыңыз: 7ден 15ке чейин цифра.', 'Enter a phone number with 7 to 15 digits.'],
  fieldError: ['Заполните это поле.', 'Бул талааны толтуруңуз.', 'Please fill out this field.']
};
for (const [key, values] of Object.entries(orderWords)) {
  ['ru', 'kg', 'en'].forEach((lang, index) => { I18N[lang][key] = values[index]; });
}

function orderSubtotal() {
  return cartData().reduce((sum, item) => sum + item.quantity * item.dish.price, 0);
}
function selectedDeliveryFee() {
  const zone = $('#deliveryZone').value;
  return Object.prototype.hasOwnProperty.call(orderConfig.deliveryFees, zone)
    ? orderConfig.deliveryFees[zone] : null;
}
function renderOrderSummary() {
  const isDelivery = orderMode === 'delivery';
  const hasItems = cartData().length > 0;
  const fee = selectedDeliveryFee();
  const known = fee !== null;
  const subtotal = orderSubtotal();
  $('#deliveryForm').classList.toggle('hidden', !isDelivery || !hasItems);
  $('#restaurantInfo').classList.toggle('hidden', isDelivery || !hasItems);
  $('#checkoutBtn').classList.toggle('hidden', !isDelivery);
  $('#checkoutBtn').disabled = !hasItems || hasUnavailableItems() || !deliveryScheduleAllowsOrder();
  $('#cartAvailabilityWarning').classList.toggle('hidden', !hasUnavailableItems());
  const scheduleBlocked = !deliveryScheduleAllowsOrder();
  $('#deliveryScheduleWarning').classList.toggle('hidden', !isDelivery || !scheduleBlocked);
  $('#deliveryScheduleWarning').textContent = t($('#deliveryTime').value === 'scheduled' ? 'scheduledClosed' : 'deliveryClosed');
  $('#checkoutBtn').textContent = t('sendWhatsapp');
  $('#checkoutNote').classList.toggle('hidden', !isDelivery);
  $('#deliveryFeeRow').classList.toggle('hidden', !isDelivery);
  $('#deliveryFee').textContent = known ? money(fee) : t('zonePending');
  const cityOption = $('#deliveryZone').querySelector('[value=city]');
  const outsideOption = $('#deliveryZone').querySelector('[value=outside]');
  if (cityOption) cityOption.textContent = t('cityZone').replace(/150/, String(orderConfig.deliveryFees.city));
  if (outsideOption) outsideOption.textContent = t('outsideZone').replace(/200/, String(orderConfig.deliveryFees.outside));
  $('#orderTotal').textContent = isDelivery && !known ? `${money(subtotal)} ${t('deliveryPending')}` : money(subtotal + (isDelivery ? fee || 0 : 0));
  $('#paymentInstructions').textContent = t('paymentAfterOrder');
  $$('[data-order-mode]').forEach(button => {
    const active = button.dataset.orderMode === orderMode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  $$('[data-i18n-placeholder]').forEach(input => { input.placeholder = t(input.dataset.i18nPlaceholder); });
  $$('[data-i18n-aria]').forEach(element => { element.setAttribute('aria-label', t(element.dataset.i18nAria)); });
  renderMobileExperience();
  $('#closeCart').setAttribute('aria-label', state.lang === 'ru' ? 'Закрыть корзину' : state.lang === 'kg' ? 'Себетти жабуу' : 'Close cart');
}

function whatsappOrderMessage(form) {
  const fields = new FormData(form);
  const val = name => String(fields.get(name) || '').trim();
  // Restaurant receives a consistent Russian order regardless of the menu language.
  const lines = ['ALTYN — заказ на доставку', '', 'Блюда:'];
  cartData().forEach(item => lines.push(`• ${item.dish.name.ru} × ${item.quantity} — ${item.dish.price * item.quantity} сом`));
  lines.push('', `Сумма блюд: ${orderSubtotal()} сом`);
  const fee = selectedDeliveryFee();
  const zoneLabel = $('#deliveryZone').value === 'city' ? 'по городу' : 'за город';
  lines.push(`Доставка (${zoneLabel}): ${fee} сом`, `Итого: ${orderSubtotal() + fee} сом`);
  lines.push('', `Имя: ${val('customerName')}`, `Телефон: ${val('customerPhone')}`, `Адрес: ${val('address')}`);
  for (const [key, label] of [['apartment', 'Квартира / офис'], ['entrance', 'Подъезд'], ['floor', 'Этаж'], ['intercom', 'Домофон']]) {
    if (val(key)) lines.push(`${label}: ${val(key)}`);
  }
  lines.push(`Время доставки: ${val('deliveryTime') === 'scheduled' ? val('requestedTime').replace('T', ' ') + ' (Бишкек, UTC+6)' : 'как можно скорее'}`);
  if (val('comment')) lines.push(`Комментарий: ${val('comment')}`);
  lines.push('', 'Оплата: картой / переводом. Прошу отправить номер карты или QR-код для оплаты.', 'Пожалуйста, подтвердите заказ и время доставки.');
  return lines.join('\n');
}

function setupOrdering() {
  $$('[data-order-mode]').forEach(button => {
    button.onclick = () => selectOrderMode(button.dataset.orderMode);
  });
  const form = $('#deliveryForm');
  form.addEventListener('input', event => event.target.setCustomValidity(''));
  $('#deliveryTime').onchange = () => {
    const scheduled = $('#deliveryTime').value === 'scheduled';
    $('#scheduledField').classList.toggle('hidden', !scheduled);
    form.elements.requestedTime.required = scheduled;
    form.elements.requestedTime.disabled = !scheduled;
    form.elements.requestedTime.setCustomValidity('');
    renderOrderSummary();
  };
  form.elements.requestedTime.addEventListener('input', renderOrderSummary);
  $('#deliveryTime').onchange();
  $('#deliveryZone').onchange = renderOrderSummary;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (orderMode !== 'delivery' || !cartData().length || selectedDeliveryFee() === null || hasUnavailableItems() || !deliveryScheduleAllowsOrder()) { renderOrderSummary(); return; }
    for (const name of ['customerName', 'address']) {
      if (!form.elements[name].value.trim()) form.elements[name].setCustomValidity(t('fieldError'));
    }
    const digits = form.elements.customerPhone.value.replace(/\D/g, '');
    form.elements.customerPhone.setCustomValidity(digits.length < 7 || digits.length > 15 || !/^[+0-9()\s.\-]+$/.test(form.elements.customerPhone.value) ? t('phoneError') : '');
    if ($('#deliveryTime').value === 'scheduled') {
      const requested = requestedDeliveryDate().getTime();
      form.elements.requestedTime.setCustomValidity(!Number.isFinite(requested) || requested <= Date.now() ? t('futureTime') : '');
    }
    if (!form.reportValidity()) return;
    const number = String(orderConfig.whatsappNumber || '').replace(/\D/g, '');
    if (!number) return;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(whatsappOrderMessage(form))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    // Keep the cart: opening WhatsApp does not confirm an order was sent.
  });
  renderOrderSummary();
}

/* MOBILE EXPERIENCE AND RESTAURANT INFORMATION */
const restaurantConfig = window.ALTYN_RESTAURANT_CONFIG || { dishes: {} };
const mobileWords = {
  chooseModeTitle: ['Как будете заказывать?', 'Кантип заказ бересиз?', 'How would you like to order?'],
  chooseModeText: ['Выберите удобный вариант. Его можно изменить в любой момент.', 'Ыңгайлуу вариантты тандаңыз. Аны каалаган убакта өзгөртө аласыз.', 'Choose an option. You can change it at any time.'],
  deliveryModeText: ['Привезём по вашему адресу. Заказ через WhatsApp.', 'Дарегиңизге жеткиребиз. Заказ WhatsApp аркылуу.', 'Delivered to your address. Order via WhatsApp.'],
  restaurantModeText: ['Выберите блюда и покажите список официанту.', 'Тамактарды тандап, тизмени официантка көрсөтүңүз.', 'Choose dishes and show your list to the waiter.'],
  changeMode: ['Изменить', 'Өзгөртүү', 'Change'],
  myList: ['Мой список', 'Менин тизмем', 'My list'],
  addressDetails: ['Уточнить адрес: квартира, подъезд, этаж', 'Даректи тактоо: батир, кире бериш, кабат', 'Address details: apartment, entrance, floor'],
  available: ['В наличии', 'Бар', 'Available'],
  soldOut: ['Закончилось', 'Түгөндү', 'Sold out'],
  unavailableCart: ['В корзине есть недоступное блюдо. Удалите его, чтобы продолжить.', 'Себетте жок тамак бар. Улантуу үчүн аны өчүрүңүз.', 'An item in your cart is unavailable. Remove it to continue.'],
  restaurantContacts: ['Адрес и контакты', 'Дарек жана байланыш', 'Location and contact'],
  openingHours: ['Часы работы ресторана', 'Ресторандын иш убактысы', 'Restaurant opening hours'],
  deliveryHoursTitle: ['Приём заказов на доставку', 'Жеткирүүгө заказ кабыл алуу', 'Delivery ordering hours'],
  hoursUnknown: ['Время работы уточните по телефону или в WhatsApp.', 'Иш убактысын телефон же WhatsApp аркылуу тактаңыз.', 'Please confirm opening hours by phone or WhatsApp.'],
  addressUnknown: ['Адрес уточните у персонала или в WhatsApp.', 'Даректи кызматкерлерден же WhatsApp аркылуу тактаңыз.', 'Ask the staff or contact us on WhatsApp for the address.'],
  callRestaurant: ['Позвонить', 'Чалуу', 'Call'],
  openMap: ['Открыть в 2ГИС', '2ГИСтен ачуу', 'Open in 2GIS'],
  contactWhatsapp: ['Написать в WhatsApp', 'WhatsApp аркылуу жазуу', 'Contact on WhatsApp'],
  restaurantOpen: ['Ресторан открыт', 'Ресторан ачык', 'Restaurant is open'],
  restaurantClosed: ['Ресторан закрыт', 'Ресторан жабык', 'Restaurant is closed'],
  deliveryOpen: ['Доставка: заказы принимаются', 'Жеткирүүгө заказ кабыл алынууда', 'Delivery orders are open'],
  deliveryClosed: ['Доставка сейчас закрыта. Выберите время в часы приёма заказов.', 'Жеткирүү азыр жабык. Заказ кабыл алуу убактысын тандаңыз.', 'Delivery is closed now. Choose a time within ordering hours.'],
  deliveryHoursUnknown: ['Время приёма доставки уточните в WhatsApp.', 'Жеткирүүгө заказ кабыл алуу убактысын WhatsApp аркылуу тактаңыз.', 'Confirm delivery ordering hours on WhatsApp.'],
  scheduledClosed: ['На выбранное время доставка закрыта. Выберите время из расписания.', 'Тандалган убакта жеткирүү жабык. Графиктен башка убакыт тандаңыз.', 'Delivery is closed at the selected time. Choose a time within the schedule.'],
  dayOff: ['Выходной', 'Эс алуу күнү', 'Closed'],
  spiceLabel: ['Острота', 'Ачуулугу', 'Spiciness'],
  spiceUnknown: ['Уточните у официанта', 'Официанттан тактаңыз', 'Ask your waiter'],
  ingredientsUnknown: ['Точный состав уточните у официанта или в WhatsApp.', 'Так курамын официанттан же WhatsApp аркылуу тактаңыз.', 'Ask your waiter or contact us on WhatsApp for exact ingredients.'],
  allergensLabel: ['Аллергены', 'Аллергендер', 'Allergens'],
  allergensUnknown: ['Данные не указаны. Сообщите персоналу о пищевой аллергии до заказа.', 'Маалымат көрсөтүлгөн эмес. Заказдан мурун кызматкерлерге тамак-аш аллергияңыз жөнүндө айтыңыз.', 'Information is not provided. Tell the staff about any food allergies before ordering.'],
  nonSpicy: ['Не острое', 'Ачуу эмес', 'Not spicy'],
  mildSpicy: ['Немного острое', 'Бир аз ачуу', 'Mild'],
  hotSpicy: ['Острое', 'Ачуу', 'Hot'],
  verySpicy: ['Очень острое', 'Өтө ачуу', 'Very hot']
};
for (const [key, values] of Object.entries(mobileWords)) {
  ['ru', 'kg', 'en'].forEach((lang, index) => { I18N[lang][key] = values[index]; });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function dishInfo(id) { return restaurantConfig.dishes?.[id] || {}; }
function isDishAvailable(id) { return dishInfo(id).available !== false; }
function hasUnavailableItems() { return cartData().some(item => !isDishAvailable(item.dish.id)); }
function localizedInfo(value, fallback) {
  return typeof value === 'string' && value.trim() ? value : value?.[state.lang] || fallback;
}
function optimizedImage(source, width) {
  try {
    const url = new URL(source);
    if (url.hostname === 'images.unsplash.com') {
      url.searchParams.set('w', String(width));
      url.searchParams.set('q', '70');
      url.searchParams.set('auto', 'format');
      return url.href;
    }
  } catch {}
  return source;
}
function renderDishFacts(dish) {
  const info = dishInfo(dish.id);
  $('#modalIngredients').textContent = localizedInfo(info.ingredients, t('ingredientsUnknown'));
  $('#modalAllergens').textContent = localizedInfo(info.allergens, t('allergensUnknown'));
  const spiceKeys = ['nonSpicy', 'mildSpicy', 'hotSpicy', 'verySpicy'];
  $('#modalSpiciness').textContent = Number.isInteger(info.spiciness) && spiceKeys[info.spiciness]
    ? t(spiceKeys[info.spiciness]) : t('spiceUnknown');
  $('#modalAvailability').textContent = t(isDishAvailable(dish.id) ? 'available' : 'soldOut');
  $('#modalAdd').disabled = !isDishAvailable(dish.id);
  $('#modalAdd').textContent = t(isDishAvailable(dish.id) ? 'addToCart' : 'soldOut');
}

function readSavedMode() {
  try { return sessionStorage.getItem('altynOrderMode'); } catch { return null; }
}
function selectOrderMode(mode) {
  if (!['delivery', 'restaurant'].includes(mode)) return;
  orderMode = mode;
  try { sessionStorage.setItem('altynOrderMode', mode); } catch {}
  const chooser = $('#modeChooser');
  if (chooser.open) chooser.close();
  renderOrderSummary();
}
function restaurantDateParts(date) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: restaurantConfig.timezone || 'Asia/Bishkek',
    weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(date).map(part => [part.type, part.value]));
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
  return { day, minute: Number(parts.hour) * 60 + Number(parts.minute) };
}
function minutesFromTime(value) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return null;
  const [hour, minute] = value.split(':').map(Number);
  return hour * 60 + minute;
}
function scheduleIntervals(schedule, day) {
  const ranges = schedule?.[day];
  if (!Array.isArray(ranges)) return null;
  if (ranges.some(pair => !Array.isArray(pair) || pair.length !== 2 || pair.some(time => minutesFromTime(time) === null))) return null;
  return ranges.map(([start, end]) => [minutesFromTime(start), minutesFromTime(end)]);
}
function scheduleIsOpen(schedule, date = new Date()) {
  if (!schedule || !Number.isFinite(date.getTime())) return null;
  const { day, minute } = restaurantDateParts(date);
  const today = scheduleIntervals(schedule, day);
  const yesterday = scheduleIntervals(schedule, (day + 6) % 7);
  const currentOpen = today?.some(([start, end]) => end > start ? minute >= start && minute < end : end < start && minute >= start);
  const overnightOpen = yesterday?.some(([start, end]) => end < start && minute < end);
  if (currentOpen || overnightOpen) return true;
  return today === null || yesterday === null ? null : false;
}
function effectiveDeliverySchedule() { return restaurantConfig.deliveryHours; }
function requestedDeliveryDate() {
  const form = $('#deliveryForm');
  if (form.elements.deliveryTime.value !== 'scheduled') return new Date();
  // The requested wall-clock time is explicitly Bishkek time, independent of the customer's device.
  return new Date(form.elements.requestedTime.value + '+06:00');
}
function deliveryScheduleAllowsOrder() {
  return scheduleIsOpen(effectiveDeliverySchedule(), requestedDeliveryDate()) !== false;
}
function renderSchedule(id, schedule) {
  const list = $(id);
  list.replaceChildren();
  if (!schedule) {
    const text = document.createElement('p'); text.textContent = t('hoursUnknown'); list.append(text); return;
  }
  const dayNames = {
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    kg: ['Жк', 'Дш', 'Шш', 'Шр', 'Бш', 'Жм', 'Иш'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  };
  [1,2,3,4,5,6,0].forEach(day => {
    const row = document.createElement('div');
    const name = document.createElement('dt'); name.textContent = dayNames[state.lang][day];
    const times = document.createElement('dd');
    const intervals = scheduleIntervals(schedule, day);
    times.textContent = intervals === null ? t('hoursUnknown') : intervals.length ? schedule[day].map(pair => pair.join('–')).join(', ') : t('dayOff');
    row.append(name, times); list.append(row);
  });
}
function renderMobileExperience() {
  $('#currentMode').textContent = t(orderMode === 'delivery' ? 'delivery' : 'restaurant');
  const count = cartData().reduce((sum, item) => sum + item.quantity, 0);
  $('#floatingCount').textContent = count;
  $('#floatingCartLabel').textContent = t(orderMode === 'delivery' ? 'cart' : 'myList');
  const fee = selectedDeliveryFee();
  $('#floatingTotal').textContent = money(orderSubtotal() + (orderMode === 'delivery' && fee !== null ? fee : 0));
  const restaurantOpen = scheduleIsOpen(restaurantConfig.hours);
  $('#restaurantStatus').textContent = t(restaurantOpen === null ? 'hoursUnknown' : restaurantOpen ? 'restaurantOpen' : 'restaurantClosed');
  const deliveryOpen = scheduleIsOpen(effectiveDeliverySchedule());
  $('#deliveryStatus').textContent = t(deliveryOpen === null ? 'deliveryHoursUnknown' : deliveryOpen ? 'deliveryOpen' : 'deliveryClosed');
  $('#deliveryStatus').classList.toggle('closed-status', deliveryOpen === false);
  $('#restaurantAddress').textContent = localizedInfo(restaurantConfig.address, t('addressUnknown'));
  let mapUrl = '';
  try { const url = new URL(restaurantConfig.mapUrl); if (url.protocol === 'https:') mapUrl = url.href; } catch {}
  $('#restaurantMap').classList.toggle('hidden', !mapUrl);
  if (mapUrl) $('#restaurantMap').href = mapUrl;
  $('#restaurantPhone').href = 'tel:' + String(restaurantConfig.phone || orderConfig.whatsappNumber).replace(/[^+\d]/g, '');
  $('#contactWhatsapp').href = 'https://wa.me/' + String(orderConfig.whatsappNumber).replace(/\D/g, '');
  renderSchedule('#restaurantHours', restaurantConfig.hours);
  renderSchedule('#deliveryHours', effectiveDeliverySchedule());
}
function setupMobileExperience() {
  const saved = readSavedMode();
  if (['delivery', 'restaurant'].includes(saved)) selectOrderMode(saved);
  else $('#modeChooser').showModal();
  $('#changeOrderMode').onclick = () => $('#modeChooser').showModal();
  $$('[data-choose-mode]').forEach(button => { button.onclick = () => selectOrderMode(button.dataset.chooseMode); });
  // Refresh at minute boundaries closely enough for closing-time changes on an open page.
  window.setInterval(renderOrderSummary, 30000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) renderOrderSummary();
  });
  renderMobileExperience();
}

applyLanguage();
setupOrdering();
setupMobileExperience();


// Poll shared settings while the page is visible. Existing delivery fields are preserved.
let liveRefreshBusy = false;
async function refreshSharedMenu() {
  if (!window.ALTYN_LIVE_SERVER || document.hidden || liveRefreshBusy) return;
  liveRefreshBusy = true;
  try {
    const response = await fetch('/api/public', { cache: 'no-store', signal: AbortSignal.timeout(12000) });
    if (!response.ok) throw Error('menu unavailable');
    const data = await response.json();
    if (data.revision !== window.ALTYN_MENU_REVISION) {
      applyLiveData(data);
      dishes.splice(0, dishes.length, ...window.ALTYN_LIVE_MENU);
      Object.assign(orderConfig, data.order);
      Object.assign(restaurantConfig, window.ALTYN_RESTAURANT_CONFIG);
      if (state.modalId && !dishes.some(dish => dish.id === state.modalId)) closeDish();
      applyLanguage();
      const notice = $('#menuUpdateNotice');
      notice.textContent = state.lang === 'ru' ? 'Меню обновилось. Проверьте блюда и итоговую сумму перед заказом.' : state.lang === 'kg' ? 'Меню жаңырды. Заказдан мурун тамактарды жана жалпы сумманы текшериңиз.' : 'The menu has changed. Check your items and total before ordering.';
      notice.classList.remove('hidden');
    }
  } catch {
    // Keep browsing possible; the operator confirms the WhatsApp order and prices.
    const notice = $('#menuUpdateNotice');
    notice.textContent = state.lang === 'ru' ? 'Не удалось обновить меню. Наличие и цены уточните в WhatsApp.' : state.lang === 'kg' ? 'Меню жаңырган жок. Тамактардын бар экенин жана бааларын WhatsApp аркылуу тактаңыз.' : 'Could not refresh the menu. Confirm availability and prices on WhatsApp.';
    notice.classList.remove('hidden');
  } finally { liveRefreshBusy = false; }
}
if (window.ALTYN_LIVE_SERVER) {
  window.setInterval(refreshSharedMenu, 30000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshSharedMenu(); });
}
