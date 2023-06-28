import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      sunday: "sunday",
      monday: "monday",
      tuesday: "tuesday",
      wednesday: "wednesday",
      thursday: "thursday",
      friday: "friday",
      saturday: "saturday",
      Select_Country: "Select Country",
      Country: "Country",
      "City, street or postalcode": "City, street or postalcode",
      "Use my location": "Use my location",
      Home: "Home",
      "Store info": "Store info",
      "Get Direction": "Get Direction",
      "Store Timing": "Store Timing",
      "Holiday Hours": "Holiday Hours",
      "View Details": "View Details",
      "Select language": "Select language",
      "view on map": "view on map",
      "View Store Details": "View Store Details",
      "View More": "View More",
      "No Location found": "No Location found",
      "Frequently Asked Questions": "Frequently Asked Questions",
      "...Read more": "...Read more",
      "NEARBY ADDRESSES": "NEARBY ADDRESSES",
      "FIND AN ADDRESS": "FIND AN ADDRESS",
      open: "OPEN",
      CLOSED: "CLOSED",
      closed: "closed",
      "CLOSES AT": "CLOSES AT",
      "OPENS AT": "OPENS AT",
      "Temporarily Closed": "Temporarily Closed",
      "Store Locator": "Store Locator",
      "English Uk": "English Uk",
      French: "French",
      Spanish: "Spanish",
      German: "German",
      Italian: "Italian",
      SERVICES: "SERVICES",
      ORDERS: "ORDERS",
      "NEW AT DIPTYQUE": "NEW AT DIPTYQUE",
      "MOST POPULAR": "MOST POPULAR",
      "Best Seller": "Best Seller",
      "Product Categories": "Product Categories",
      "Sign up for offers and sale info": "Sign up for offers and sale info",
      "SIGN UP": "SIGN UP",
      "The Store will reopen on": "The Store will reopen on",
      "Day of the Week": "Day of the Week",
      Hours: "Hours",
      "All Locations of": "All Locations of",
      "Cities in ": "Cities in ",
      All: "All",
      of: "of",
      "it seems": "it seems",
      "this page": "this page",
      "doesn't exist...": "doesn't exist...",
      "Page not found": "Page not found",
      "Click here to Return to Homepage": " Click here to Return to Homepage",
      "Find the nearest diptyque boutique":
        "Find the nearest diptyque boutique",
      "Distance in miles": "Distance in miles",

      "Holiday Hours Calendar": "Holiday Hours Calendar",
      Date: "Date",
      "Opening Hours": "Opening Hours",
      Day: "Day",
      "Open 24 Hours": "Open 24 Hours",
      "Find Address, City or Postal Code": "Find Address, City or Postal Code",
      "Showing ": "Showing ",
      " Results": " Results",
      " to ": " to ",
      " of ": " of ",
      "Store not found": "Store not found",
      "Current location": "Current location",
      "Please allow your Location": "Please allow your Location",
      "Products & Services available": "Produits & Services disponibles",
      "Right now": "Right now",
      "distribution of hot chocolate": "distribution of hot chocolate",
      Shop: "Shop",
      Retailer: "Retailer",
      "All Deptique store": "All Deptique store",
      Boutique: "Boutique",
      "Maisons Diptyque": "Maisons Diptyque",
      "More information": "More information",
      OPEN: "OPEN",
      "Select all": "Select all",
      "Search by address, city, country...": "Search by address, city, country...",
      "Search by Address, City, Po Code...": "Search by Address, City, Po Code...",
      "To research...": "To research...",
      Language: "Language",
      Apply: "Apply",
      "Reset Filters": "Reset Filters",
      Filters: "Filters",
      "Store Events": "Événements en magasin",
      "Select country": "Select country",
      "SEE THE ITINERARY": "SEE THE ITINERARY",
      "All Diptyque store": "All Diptyque store",
      "MAKE AN APPOINTMENT": "MAKE AN APPOINTMENT",
      "See the route": "See the route",
      "Langues parlées": "Spoken languages",
      "Services available": "Services available",
      "Produits": "Produits",
      "show less": "show less",
      "Store Finder": "Store Finder",
      " Holiday Hours Calendar": " Holiday Hours Calendar",
      "SERVICES AVAILABLE service name": "Services Available",
      "Product Name": "Product",
      "All Addresses": "All Addresses"
    },
  },
  fr: {
    translation: {
      sunday: "dimanche",
      monday: "Lundi",
      tuesday: "mardi",
      wednesday: "mercredi",
      thursday: "jeudi",
      friday: "Vendredi",
      saturday: "samedi",
      Sunday: "Dimanche",
      Monday: "Lundi",
      Tuesday: "Mardi",
      Wednesday: "Mercredi",
      Thursday: "Jeudi",
      Friday: "Vendredi",
      Saturday: "Samedi",
      Select_Country: "Choisissez le pays",
      Country: "Pays",
      "City, street or postalcode": "Ville, rue ou code postal",
      "Use my location": "Utilise ma location",
      Home: "Accueil",
      "Store info": "Informations sur le magasin",
      "Get Direction": "Obtenir l'itinéraire",
      "Store Timing": "Calendrier du magasin",
      "Holiday Hours": "Heures de vacances",
      "View Details": "Voir les détails",
      "Select language": "Choisir la langue",
      "view on map": "voir sur la carte",
      "View Store Details": "Afficher les détails du magasin",
      "View More": "Voir plus",
      "No Location found": "Aucun lieu trouvé",
      "Frequently Asked Questions": "Questions fréquemment posées",
      "...Read more": "...Lire la suite",
      "NEARBY ADDRESSES": "ADRESSES À PROXIMITÉ",
      "FIND AN ADDRESS": "TROUVER UNE ADRESSE",
      open: "OUVERT",
      "CLOSES AT": "FERME À",
      "OPENS AT": "OUVRE À",
      "Closes at": "Ferme à",
      "Opens at": "Ouvre à",
      "Temporarily Closed": "Fermé temporairement",
      "Store Locator": "Localisateur de magasin",
      "English Uk": "Anglais Royaume-Uni",
      French: "Français",
      Spanish: "Espagnol",
      German: "Allemand",
      Italian: "Italien",
      SERVICES: "PRESTATIONS DE SERVICE",
      ORDERS: "ORDRES",
      "NEW AT DIPTYQUE": "NOUVEAU CHEZ DIPTYQUE",
      "MOST POPULAR": "LE PLUS POPULAIRE",
      "Best Seller": "Best-seller",
      "Product Categories": "catégories de produits",
      "Sign up for offers and sale info":
        "Inscrivez-vous pour recevoir des offres et des informations sur les ventes",
      "SIGN UP": "S'INSCRIRE",
      "The Store will reopen on": "Le magasin rouvrira le",
      "Day of the Week": "Jour de la semaine",
      Hours: "Les heures",
      "All Locations of": "Tous les emplacements de",
      "Cities in ": "Villes en ",
      All: "Tout",
      of: "de",
      "it seems": "il semble",
      "this page": "cette page",
      "doesn't exist...": "n'existe pas...",
      "Page not found": "Page non trouvée",
      "Click here to Return to Homepage":
        "Cliquez ici pour revenir à la page d'accueil",
      "Find the nearest diptyque boutique":
        "Trouver la boutique diptyque la plus proche",
      "Distance in miles": "Distance en miles",
      "Holiday Hours Calendar": "Calendrier des heures de vacances",
      Date: "Date",
      "Opening Hours": "Horaires d'ouvertures",
      Day: "Jour",
      "Open 24 Hours": "Ouvert 24 heures",
      "Find Address, City or Postal Code":
        "Rechercher l'adresse, la ville ou le code postal",
      "Showing ": "Montrant ",
      " Results": " Résultats",
      " to ": " pour ",
      " of ": " de ",
      "Store not found": "Magasin introuvable",
      "Current location": "Localisation actuelle",
      "Please allow your Location": "Veuillez autoriser votre emplacement",
      "Products & Services available": "Produits & Services disponibles",
      "Right now": "En ce moment",
      "distribution de chocolat chaud": "distribution of hot chocolate",
      Boutique: "Boutique",
      "Maisons Diptyque ": "Maisons Diptyque",
      Retailer: "Détaillant",
      "All Deptique store": "Tous les magasins Deptique",
      CLOSED: "FERMÉ",
      OPEN: "OUVERT",
      "Select all": "Tout sélectionner",
      "Search by address, city, country...": "Recherche par adresse, ville, pays...",
      "Search by Address, City, Po Code...": "Recherche par Adresse, Ville, Code Po...",
      "To research...": "Rechercher...",
      Language: "Langue",
      Apply: "Appliquer",
      "Reset Filters": "Réinitialiser les filtres",
      Filters: "Filtres",
      "Store Events": "Store Events",
      "All Diptyque store": "Tous les magasins Diptyque",
      "SEE THE ITINERARY": "VOIR L'ITINÉRAIRE",
      "More information": "Plus d’informations",
      "MAKE AN APPOINTMENT": "PRENDRE UN RENDEZ-VOUS",
      "See the route": "Voir l’itinéraire",
      "Langues parlées": "Langues parlées",
      "Services available": "Services available",
      "Produits": "Produits",
      "show less": "Montrer moins",
      "Store Finder": "Trouver une boutique",
      " Holiday Hours Calendar": "Calendrier des heures de vacances",
      "SERVICES AVAILABLE service name": "Services disponibles",
      "Product Name": "Produits",
      "All Addresses": "Toutes les adresses"
    },
  },
  es: {
    translation: {
      sunday: "domingo",
      monday: "lunes",
      tuesday: "martes",
      wednesday: "miércoles",
      thursday: "jueves",
      friday: "viernes",
      saturday: "sábado",
      Select_Country: "Seleccionar país",
      Country: "País",
      "City, street or postalcode": "Ciudad, calle o código postal",
      "Use my location": "usar mi ubicación",
      Home: "Hogar",
      "Store info": "información de la tienda",
      "Get Direction": "Obtener dirección",
      "Store Timing": "Horario de la tienda",
      "Holiday Hours": "Horario de vacaciones",
      "View Details": "Ver detalles",
      "Select language": "Seleccione el idioma",
      "view on map": "ver en el mapa",
      "View Store Details": "Preguntas frecuentes",
      "View More": "Ver más",
      "No Location found": "No se encontró ninguna ubicación",
      "Frequently Asked Questions": "Preguntas frecuentes",
      "...Read more": "...Lire la suite",
      "Nearby Locations": "Ubicaciones cercanas",
      "View All Location": "Ver toda la ubicación",
      open: "abierto",
      closed: "cerrado",
      closes_at: "cierra a las",
      Opens_at: "Abre a las",
      "Temporarily Closed": "Cerrado temporalmente",
      "Store Locator": "Localizador de tiendas",
      "English Uk": "Inglés del Reino Unido",
      French: "Francés",
      Spanish: "Español",
      German: "Alemán",
      Italian: "Italiano",
      SERVICES: "SERVICIOS",
      ORDERS: "PEDIDOS",
      "NEW AT DIPTYQUE": "NUEVO EN DIPTYQUE",
      "MOST POPULAR": "MÁS POPULAR",
      "Best Seller": "Mejor vendido",
      "Product Categories": "Categorías de Producto",
      "Sign up for offers and sale info":
        "Regístrese para recibir ofertas e información de venta",
      "SIGN UP": "INSCRIBIRSE",
      "The Store will reopen at": "La tienda reabrirá a las",
      "Day of the Week": "Día de la semana",
      Hours: "Horas",
      "All Locations of": "Todas las ubicaciones de",
      "Cities in ": "Ciudades en",
      All: "Todos",
      of: "de",
      "it seems": "parece",
      "this page": "esta página",
      "doesn't exist...": "no existe...",
      "Page not found": "Página no encontrada",
      "Click here to Return to Homepage":
        "Haga clic aquí para volver a la página principal",
      "Holiday Hours Calendar": "Calendrier des heures de vacances",
      Date: "Date",
      "Opening Hours": "Horaires d'ouvertures",
      Day: "Jour",
      "NEARBY ADDRESSES": "DIRECCIONES CERCANAS",
      "All Addresses": "Todas las direcciones",
      "More information": "Más información",
    },
  },
  de: {
    translation: {
      sunday: "Sonntag",
      monday: "Montag",
      tuesday: "Dienstag",
      wednesday: "der Mittwoch",
      thursday: "Donnerstag",
      friday: "Freitag",
      saturday: "Samstag",
      Select_Country: "Land auswählen",
      Country: "Land",
      "City, street or postalcode": "Ort, Straße oder Postleitzahl",
      "Use my location": "Verwenden Sie meinen Standort",
      Home: "Heim",
      "Store info": "Informationen speichern",
      "Get Direction": "Richtung erhalten",
      "Store Timing": "Timing speichern",
      "Holiday Hours": "Ferienzeiten",
      "View Details": "Details anzeigen",
      "Select language": "Sprache auswählen",
      "view on map": "auf Karte ansehen",
      "View Store Details": "Ladendetails anzeigen",
      "View More": "Mehr sehen",
      "No Location found": "Kein Standort gefunden",
      "Frequently Asked Questions": "Häufig gestellte Fragen",
      "...Read more": "...Lire la suite",
      "Nearby Locations": "Standorte in der Nähe",
      "View All Location": "Alle Standorte anzeigen",
      open: "offen",
      closed: "geschlossen",
      closes_at: "schließt um",
      Opens_at: "Öffnet um",
      "Temporarily Closed": "Vorübergehend geschlossen",
      "Store Locator": "Händlersuche",
      "English Uk": "Englisch UK",
      French: "Französisch",
      Spanish: "Spanisch",
      German: "Deutsch",
      Italian: "Italienisch",
      SERVICES: "DIENSTLEISTUNGEN",
      ORDERS: "AUFTRÄGE",
      "NEW AT DIPTYQUE": "NEU BEI DIPTYQUE",
      "MOST POPULAR": "AM BELIEBTESTEN",
      "Best Seller": "Bestseller",
      "Product Categories": "Produktkategorien",
      "Sign up for offers and sale info":
        "Melden Sie sich für Angebote und Verkaufsinformationen an",
      "SIGN UP": "ANMELDUNG",
      "The Store will reopen at": "Der Store öffnet wieder um",
      "Day of the Week": "Wochentag",
      Hours: "Std",
      "All Locations of": "Alle Standorte von",
      "Cities in ": "Städte ein",
      All: "Alles",
      of: "von",
      "it seems": "es scheint",
      "this page": "diese Seite",
      "doesn't exist...": "existiert nicht...",
      "Page not found": "Seite nicht gefunden",
      "Click here to Return to Homepage":
        "Klicken Sie hier, um zur Startseite zurückzukehren",
      "NEARBY ADDRESSES": "ADRESSEN IN DER NÄHE",
      "All Addresses": "Alle Adressen",
      "More information": "Mehr Informationen",
    },
  },
  it: {

    translation: {
      sunday: "domenica",
      monday: "lunedì",
      tuesday: "mardi",
      wednesday: "martedì",
      thursday: "giovedì",
      friday: "venerdì",
      saturday: "Sabato",
      Select_Country: "Seleziona il paese",
      Country: "Paese",
      "City, street or postalcode": "Città, via o codice postale",
      "Use my location": "Usa la mia posizione",
      Home: "Casa",
      "Store info": "Informazioni sul negozio",
      "Get Direction": "Prendere direzione",
      "Store Timing": "Tempistica del negozio",
      "Holiday Hours": "Orario festivo",
      "View Details": "Visualizza dettagli",
      "Select language": "Seleziona la lingua",
      "view on map": "visualizza sulla mappa",
      "View Store Details": "Visualizza i dettagli del negozio",
      "View More": "Visualizza altro",
      "No Location found": "Nessuna località trovata",
      "Frequently Asked Questions": "Domande frequenti",
      "Read more": "Lire la suite",
      "Nearby Locations": "Località nelle vicinanze",
      "View All Location": "Visualizza tutte le località",
      open: "aprire",
      closed: "chiuso",
      closes_at: "chiude alle",
      Opens_at: "Apre alle",
      "Temporarily Closed": "Momentaneamente chiuso",
      "Store Locator": "Localizzatore di negozi",
      "English Uk": "Inglese Regno Unito",
      French: "francese",
      Spanish: "Spagnolo",
      German: "Tedesco",
      Italian: "Italiano",
      SERVICES: "SERVIZI",
      ORDERS: "ORDINI",
      "NEW AT DIPTYQUE": "NUOVO A DIPTYQUE",
      "MOST POPULAR": "PIÙ POPOLARE",
      "Best Seller": "Best seller",
      "Product Categories": "Categorie di Prodotto",
      "Sign up for offers and sale info":
        "Iscriviti per offerte e informazioni sulla vendita",
      "SIGN UP": "ISCRIZIONE",
      "The Store will reopen at": "Lo Store riaprirà alle",
      "Day of the Week": "Giorno della settimana",
      Hours: "Ore",
      "All Locations of": "Tutte le sedi di",
      "Cities in ": "Città dentro",
      All: "Tutti",
      of: "di",
      "it seems": "sembra",
      "this page": "questa pagina",
      "doesn't exist...": "non esiste...",
      "Page not found": "pagina non trovata",
      "Click here to Return to Homepage":
        "Fare clic qui per tornare alla home page",
      "NEARBY ADDRESSES": "INDIRIZZI VICINI",
      "All Addresses": "Tutti gli indirizzi",
      "More information": "Maggiori informazioni",
    },
  },
  ja: {
    translation: {
      sunday: "日曜日",
      monday: "月曜日",
      tuesday: "火曜日",
      wednesday: "水曜日",
      thursday: "木曜日",
      friday: "金曜日",
      saturday: "土曜日",
     "View Details":"詳細を見る", 
    "Nearby Locations": "近くの住所",
    "All Addresses": "すべての住所",
    "View More": "もっと見る",
    "More information": "詳しくは",
    "Get Direction":"方向を取得",
    "Open": "開ける",
    "Closed": "閉まっている",
    "Close at": "に閉まります",
    "Opens at": "開店時間",
    }
  },

};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en_GB", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
export default i18n;