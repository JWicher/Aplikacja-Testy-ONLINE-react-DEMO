# --- FILMAG ---
Aplikacja dla branży produkcyjnej.
<br/>
Cel: gromadzenie i przekazywanie zgłoszeń od operatorów maszyn.

<img src="prezentacja/1 rejestracja.gif" alt="Logo">
<img src="prezentacja/2-logowanie-i-dodawanie-testu.gif" alt="Logo">
<img src="prezentacja/3-dodawanie-zadania.gif" alt="Logo">
<img src="prezentacja/4-generowanie-kodów-testu.gif" alt="Logo">
<img src="prezentacja/5-logowanie-kodem-do-testu.gif" alt="Logo">
<img src="prezentacja/6-wypełnianie-testu-przyspieszone.gif" alt="Logo">
<img src="prezentacja/7-wysłanie-testu-i-przegląd-poczty-w-wynikiem.gif" alt="Logo">

### Demo:
Wersja demonstracyjna: [https://filmag-demo.herokuapp.com](https://filmag-demo.herokuapp.com)
<br/>
Loginy: Operator, Magazynier, Kierownik, Prezes.
<br/>
Hasło: 12345
<br/>
<br/>

### Zalety aplikacji:
- łatwy dostęp do bieżących i zakończonych zadań,
- prosta obsługa ułatwia wprowadzanie danych na maszynach i wózkach widłowych,
- szczegółowe informacje o zdarzeniach,
- odliczanie czasu jaki upłynął od zgłoszenia,
- szybkie sortowanie zgłoszeń po lokalizacjach,
- oznaczenia kolorami, np. awaria - czerwone tło, przezbrojenie - żółte tło,
- działa online,
- panel ustawień dla osób zarządzających,
- zabezpieczenia zmian uprawnień użytkowników wg hierarchii pracowników firmy,
- przyjazny interfejs dostępny na różnej wielkości ekranach - sześciostopniowy podział RWD, 
- możliwość pobrania danych historycznych do pliku .xlsx.
<br/>

## UŻYTE TECHNOLOGIE
<img src="prezentacja/stack.png" alt="użyte technologie">
<br/>

#### **_Ponadto_**
<br/>

Fontend:
- wymuszenie stosowania protokołu https,
- JSON Web Token - przesył i przechowywanie informacji o użytkowniku,
- joi-browser - walidacja wprowadzanych danych,
- ciągłe sprawdanie czy użytkownik jest aktywny i wymuszenie wylogowania w razie dłużej bezczynności,
- optymalizacja czasu renderowania niektórych komponentów przez użycie bibliotek react-window i react-virtualized-auto-sizer,
- użycie Gulp - prekompilatora CSS,
- stosowanie plików .env dla środowisk development i production (inne bazy danych inne adresy API node),
- stworzenie komponentów protected-route,
- react-confirm-alert z modyfikacją stylów CSS okienek,
- dodatkowe biblioteki pomocnicze: axios, react-toastify, file-saver, bootstrap, font-awesome, lodash
<br/>

Backend:
- aplikacja napisana w Node.js / express,
- stosowanie funkcji typu middleware do identyfikacji, sprawdzania uprawnień i czasu ostatniej aktywności,
- użycie biblioteki bcrypt do hashowania haseł użytkowników,
- tokenizacja danych z użyciem biblioteki jsonwebtoken,
- przechowywanie wrażliwych danych w zmiennych środowiskowych na serwerze, np. adres bazy danych i dane dostępu, czy \"soli" *Salt*,
- @hapi/joi - walidacja otrzymanych danych od użytkownika,
- baza danych - mongoDB, mongoose, tworzenie modeli danych i obsługa zapytań,
- obsługa operacji CRUD przez interfejsy API wg zasobów, np. api/tasks, api/users,
- biblioteki pomocnicze: helmet, compression, cors, lodash, xlsx, nodemailer,
- podział struktury kodu, tzn. osobno routes, models, middlewares, startup files.
- demo kodu dostępne na osobnym repozytorium.
<br/>

## OPIS I PREZENTACJA
### **_1. Logowanie._**
Etap logowania jest zależny od rodzaju wykonywanej pracy przez użytkownika. System automatycznie rozpoznaje, który rodzaj ma rozpocząć.
- operator -> logowanie - wybór maszyny - wyświetlenie danych tylko dla danej maszyny, 
- magazynier -> logowanie - wybór magazynu - przejście do widoku magazynu,
- osoba zarządzająca (kierownik, prezes, itp.) -> logowanie - przekierowanie na widok magazynu (wszystkie zdarzenia).

<img src="prezentacja/operator.gif" alt="logowanie">

### **_2. Obsługa programu - operator._**
Użytkownik posiadający uprawnienia operatora może:
- zgłaszać i zamykać zlecenia do magazynu,
- informować o postojach (awarie, czyszczenie) i zakończeniu zadań.

<img src="prezentacja/addTask.gif" alt="dodawanie głoszenia">

### **_3. Obsługa programu - magazynier._**
Użytkownik magazynier może:
- zadeklarować przyjęcie zlecenia,
- przejąć zlecenie od innego magazyniera,
- zgłaszać częściowe dostawy, np. dostarczono 200 szt. z 2500 szt.

<img src="prezentacja/magazynier.gif" alt="obsługa magazynier">

### **_4. Obsługa programu - osoba zarządzająca._**
Użytkownik zadeklarowany jako osoba zarządzająca (mistrz zmiany, kierownik, dyrektor, prezes) ma możliwość:
- zgłoszenia i zamknięcia zlecenia na daną maszynę,
- przełączania między widokami danych maszyn i magazynów,
- dostęp do ustawień lokalizacji,
- zmiany uprawnień pozostałym użytkownikom - z zastrzeżeniem że tylko tym, którzy są niżej w hierarchii firmy. \*

\* Przykładowo kierownik może zmienić uprawnienia operatora, magazyniera czy mistrza, lecz nie może innemu kierownikowi czy dyrektorowi.

<img src="prezentacja/Ustawienia.gif" alt="ustawienia">

### **_5. Przyjazny interfejs na różnej wielkości ekranach._**
Aplikacja jest w pełni responsywna.

<img src="prezentacja/RWD.png" alt="rwd">
<br/>

## UWAGI
Jest to demonstracyjne repozytorium, tzn. posiada tylko część kodu.