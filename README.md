# --- JW-TESTY-ONLINE ---
Aplikacja głównie dla rekruterów.
<br/>
Cel: automatyzacja testów kompetencji kandydatów.

### Demo:
Wersja demonstracyjna: [//jw-testy-online.herokuapp.com/](https://jw-testy-online.herokuapp.com)
<br/>

<img src="prezentacja/pogląd.png" alt="pogląd">

### Zalety aplikacji:
- wyniki testu dostępne natychmiast po jego wypełnieniu przez kandydata,
- generowanie pliku PDF z wynikami tak, jakby kandydat wypełnił test papierowy,
- działa na różnych przeglądarkach, w tm na IE,
- przyjemny interfejs, stosowanie efektów na elementy interaktywne,
- możliwość udostępniania własnego testu dla innych rekrutetów,
- szczegóły testu są zapisywane dla każdego generowanego kodu, zmiana treści nie wypływa na te już wygenerowane,
- wystarczy przesłać kod i adres portalu jw-testy-online do kandydata i czekać na wyniki,
<br/>

## UŻYTE TECHNOLOGIE
<img src="prezentacja/stack-frontend.png" alt="użyte technologie">

#### **_Ponadto_**

Fontend:
- wymuszenie stosowania protokołu https (przekierowanie http -> https),
- wykorzystanie standardu JWT do autoryzacji użytkownika,
- wykorzystanie klas i react-komponentów biblioteki _Material Design for Bootstrap 4_,
- joi-browser - walidacja wprowadzanych danych,
- optymalizacja czasu renderowania niektórych komponentów przez użycie bibliotek react-window i react-virtualized-auto-sizer,
- użycie Gulp do kompilowania pliku stylów CSS z źródłowych .scss,
- stosowanie plików .env dla środowisk development i production (inne bazy danych, inne adresy API node),
- react-confirm-alert z własnymi stylami CSS okienek,
- dodatkowe biblioteki pomocnicze: babel-polyfill, axios, react-notifications, file-saver, jwt-decode, font-awesome,
<br/>

Backend:
- autorska aplikacja napisana w Node.js / express,
- stosowanie funkcji typu middleware do autentyfikacji użytkowników,
- zakrywanie haseł użytkowników z użyciem biblioteki bcrypt,
- identyfikacja użytkowników z wykorzystaniem standardu jsonwebtoken,
- przechowywanie wrażliwych danych w zmiennych środowiskowych na serwerze, np. adres bazy danych, dane dostępu, czy \"soli" *Salt*,
- @hapi/joi - walidacja otrzymanych danych od użytkownika,
- baza danych - mongoDB, mongoose, tworzenie zagnieżdżonych modeli danych i obsługa zapytań,
- generowanie pliku PDF na podstawie obiektu .json z danymi wypełnionego testu - wykorzystanie własnego szablonu .hbr i biblioteki puppeteer,
- obsługa operacji CRUD przez interfejsy API wg zasobów, np. api/tests, api/users,
- biblioteki pomocnicze: fs-extra, handlebars, nodemailer, helmet, compression, cors, puppeteer,
- podział struktury kodu, tzn. osobno routes, models, middlewares, startup files.
- demo kodu dostępne na osobnym repozytorium.
<br/>

## OPIS I PREZENTACJA
### **_1. Rejestracja._**
Aby się zarejestrować należy podać imię i nazwisko lub nazwę, adres email i hasło dla tworzonego konta. Następnie aplikacja generuje i wysyła wiadomość na podany adres email z linkiem, którego uruchomienie powoduje zatwierdzenie konta.

<img src="prezentacja/1_rejestracja_przysp_2x.gif" alt="rejestracja użytkownika">

### **_2. Tworzenie i modyfikacja testu._**
Aplikacja umożliwia łatwe tworzenie i modyfikowanie testów.
Layout: 
- góra: nagłówek,
- lewa strona: menu nawigacyjne po panelu klienta,
- prawa strona: część robocza, wyświetlanie danych.
<br/>

#### **Dodawanie nowego testu.**
Kliknięcie w zakładkę "TESTY" spowoduje wyświetlenie widoku prezentującego dostępne testy wraz z przyciskiem dodawania.

<img src="prezentacja/2_logowanie_i_dodawanie_testu_przysp_2x.gif" alt="logowanie i dodawanie nowego testu">


#### **Zadania.**
Aby dodać, modyfikować lub usunąć zadania należy kliknąć dany test, a następnie przycik "ZADANIA". Tryb edycji umożliwia usunięcie niezapisanych zmian.

<img src="prezentacja/3_dodawanie_zadania_przysp_2x.gif" alt="dodawanie zadania">


### **_3. Generowanie kodu dostępu do testu._**
Kod dostępu do testu umożliwia uruchomienie sprawdzianu przez kandydata. Generator jest dostępny tylko jeżeli test zawiera przynajmniej jedno zadanie. Przycisk kreowania kodu powoduje utworzenie obiektu, w którym zapisywany jest obecny stan zadań i innych danych testu, jak np. limit czasowy. Wszelkie modyfikacje testu nie mają wpływu na wcześniej wytworzone kody. Serwer posiada funkcję tworzenia unikatowego 13-znakowego kodu, który jest zwracany do klienta i dołączany do ww. obiektu.

<img src="prezentacja/4_generowanie_kodów_testu_2x.gif" alt="użyte technologie">


### **_4. Uruchamianie testu._**
Kandydat może uruchomić kod tylko dzieki otrzymanemu od rekrutera kodu dostępu do testu. Miejsce gdzie, należy go umieścić znajduje się w widocznym miejscu na stronie startowej aplikacji. Wciśnięcie przycisku "ROZPOCZNIJ" spowoduje odcięcie białych znaków przed i za tekstem reprezentującym kod oraz wysłanie kodu na serwer.
Próba zostanie odrzucona, gdy:
- kod nie znajduje sie w bazie danych,
- lub został już wykorzystany.
<br/>

<img src="prezentacja/5_logowanie_kodem_do_testu_przysp_2x.gif" alt="użyte technologie">


#### **Wypełnianie testu.**
Przed rozpoczęciem testu wyświetlana jest instrukcja. W tym kroku kandydat jest zobowiązany do podania imienia i nazwiska. Po spełnieniu tego warunku możliwe jest przystąpienie do wypełniania testu poprzez wcisnięcie przycisku "START".
W górnej części znajduje się nagłówek wraz z zegarem pokazującym pozostały czas, sumą udzielonych odpowiedzi oraz z przyciskiem wysłania odpowiedzi. Zadania zamknięte posiadają możliwośc zaznaczenia tylko jednej pozycji, a zadania otwarte mają blokadę wklejania treści. 

<img src="prezentacja/6_wypełnianie_testu_przysp_4x.gif" alt="użyte technologie">


### **_5. Wyniki._**
Po wciśnięciu przycisku 'WYŚLIJ WYNIKI" lub upływie dozwolonego czasu wyniki są wysyłane na serwer. Na podstawie tych informacji jest tworzony plik PDF i wysyłany na adres mailowy rekrutera. Możliwe jest również wygenerowanie pliku .pdf w dowolnej chwili w zakładce "KODY DOSTĘPU".

<img src="prezentacja/7_wysłanie_testu_i_przegląd_poczty_w_wynikiem_przysp_2x.gif" alt="użyte technologie">
<img src="prezentacja/8_podgląd_wyników_przysp_2x.gif" alt="użyte technologie">


## UWAGI
Jest to demonstracyjne repozytorium, tzn. posiada tylko część kodu.


