import { get } from "lodash";

const tekstyWersjiJęzykowych = {

    pl: {
        stronaGłówna: {
            InformacjaPotwierdzenieKonta: {
                wiadomośćPotwierdzenie: "Konto zostało aktywowane. Możesz się teraz zalogować.",
                wiadomośćNegacja: "Konto nie zostało aktywowane. Wystąpił błąd.",
                przycisk: "OK"
            },
            StronaGlownaNaglowek: {
                nazwaAplikacji: "JW TESTY ONLINE",
                przyciskLogowania: "Zaloguj się",
                przyciskRejestracji: "Rejestracja",
                przyciskWeryfikacjiKodu: "Sprawdź kod",
                input: {
                    labelLogin: "Adres e-mail",
                    labelHasło: "Hasło"
                }
            },
            WeryfikacjaKodu: {
                tytuł: "Rozpocznij test",
                opis: "Aby rozpocząć test należy wpisać kod dostepu otrzymany od rekrutera.",
                przyciskRozpocznij: "Rozpocznij"
            },
            RejestracjaUżytkownika: {
                błędy: {
                    nazwa: "Nazwa jest wymagana",
                    email: "Nieprawidłowy e-mail",
                    haslo: "Za krótkie hasło",
                    hasloPowrorzenie: "Za krótkie powtórzone hasło",
                    notyfikacjaHasloPowrorzenie: "Hasło i jego powtórzenie nie są równe"
                },
                tytuł: "Rejestracja",
                inputy: {
                    nazwa: "Imię i nazwisko lub nazwa",
                    email: "Adres e-mail",
                    hasło: "Hasło",
                    powtórzHasło: "Powtórz hasło"
                },
                przyciskZarejestruj: "Zarejestruj",
                przyciskPotwierdzenie: "OK"
            },
            Stopka: {
                autor: "Autorem strony jest J.W.",
                prawaAutorskie: "Wszelkie prawa zastrzeżone."
            }
        },
        test: {
            InformacjaKońcowa: {
                tytuł: "Test zakończony",
                wiadomość: {
                    trwaWysyłanie: "Trwa wysyłanie odpowiedzi...",
                    odpowiedziZapisano: "Odpowiedzi zapisano."
                },
                przyciskPotwierdzenia: "OK",
                błędy: {
                    notyfikacjaNieUdałoSięWysłaćWyników: "Nie udało się wysłać wyników"
                }
            },
            InstrukcjaTestu: {
                podtytuły: {
                    informacja: "Informacja",
                    inputy: "Proszę wprowadzić swoje dane"
                },
                inputy: {
                    imie: "Imię",
                    nazwisko: "Nazwisko"
                },
                przycisk: {
                    etykietaGdyNierozpoczętyTest: "Start",
                    etykietaGdyRozpoczętyTest: "Test"
                },
                błędy: {
                    imię: "Proszę podać swoje imię",
                    nazwisko: "Proszę podać swoje nazwisko"
                }
            },
            Naglowek: {
                etykietaOdpowiedzi: "Ilość udzielonych odpowiedzi:",
                przyciskWyśljWyniki: "Wyślij wyniki"
            },
            SpisZadan: {
                etykietaPytanie: "Pytanie"
            },
            Zadanie: {
                etykietaZadanieNr: "Zadanie nr",
                informacjaPrzyPróbieWklejania: "Wklejanie jest niedozwolone"
            },
            Zegar: {
                etykietaZegara: "Pozostały czas"
            }
        },
        panelKlienta: {
            MenuBoczne: {
                przycisk: {
                    testy: "Testy",
                    kodyDostępu: "Kody dostępu",
                    twojeKonto: "Twoje konto",
                    użytkownicy: "Użytkownicy"
                }
            },
            Naglowek: {
                tytułAplikacji: "TESTY ONLINE",
                tytułPodstrony: "PANEL KLIENTA",
                przyciskWylogowania: "Wyloguj się"
            },
            trescGłówna: {
                PanelKlientaKody: {
                    confirmAlert: {
                        tytuł: "Usuwanie zapisu",
                        treśćOstrzeżenia: "Czy napewno chcesz usunąć ten kod?",
                        tak: "Tak",
                        nie: "Nie"
                    },
                    infoBrakKodów: "Brak kodów"
                },
                PanelKlientaTesty: {
                    przycisk: {
                        dodajTest: "Dodaj test"
                    },
                    dodajTest: {
                        nazwa: "Nowy test",
                        krótkiOpis: "Krótki opis"
                    },
                    notyfikacje: {
                        usuwanie: {
                            sukces: "Usunięto test",
                            niepowodzenie: "Próba usunięcia się nie powiodła"
                        },
                        zapiszZmiany: {
                            sukces: "Zapisano zmiany",
                            niepowodzenie: "Próba zapisania zmian się nie powiodła"
                        }
                    }
                },
                PanelKlientaUżytkownik: {
                    podtytuł: "Twoje konto",
                    notyfikacje: {
                        aktualizacjaDanych: {
                            sukces: "Zapisano zmiany",
                            niepowodzenie: "Nie udało się zapisać zmiany"
                        }
                    }
                },
                zakładki: {
                    kodyTestów: {
                        KodTestu: {
                            badgeWyniki: {
                                brakWyników: "Brak"
                            },
                            przycisk: {
                                usuń: "Usuń"
                            },
                            notyfikacje: {
                                ściągnijWyniki: {
                                    niepowodzenie: "Nie udało się ściągnąć pliku"
                                }
                            }
                        },
                        KodTestuNaglowek: {
                            lp: "#",
                            dataUtworzenia: "Data utworzenia",
                            kandydat: "Kandydat",
                            nazwaTestu: "Test",
                            kod: "Kod",
                            odbiorcy: "Odbiorcy",
                            dataUsunięcia: "Data usunięcia",
                            wyniki: "Wyniki"
                        }
                    },
                    testy: {
                        PanelKlientaTestPoziom2: {
                            blokIlośćZadań: {
                                etykietaŁącznaIlosćZadań: "Łączna ilość zadań:",
                                etykietaZamkniętych: "- zamkniętych:",
                                etykietaOtwartych: "- otwartych:",
                            },
                            blokZarządzanieTestem: {
                                etykietaZarządzaTestem: "Zarządza testem:",
                                etykietaDataRejestracji: "Data rejestracji:",
                                etykietaDataModyfikacji: "Data modyfikacji:"
                            },
                            blokPrzycisków: {
                                etykietaZadania: "Zadania",
                                etykietaUstawieniaTestu: "Ustawienia testu",
                                etykietaWygenerujKod: "Wygeneruj kod",
                            }
                        },
                        poziom3_szczegóły: {
                            EdytowaneZadanie: {
                                usuńOpdcję: "Usuń",
                                dodajOpcję: "Dodaj opcję",
                                poprawnaOdpowiedź: "Poprawna odpowiedź:",
                                trybEdycji: "Tryb edycji",
                                usuńZadanie: "Usuń zadanie",
                                zapisz: "Zapisz",
                                zamknij: "Zamknij",
                                odrzućZmiany: "Odrzuć zmiany",
                                confirmAlert: {
                                    tytuł: "Ostrzeżenie",
                                    treśćOstrzeżenia1: "Operacji nie będzie można cofnąć.",
                                    treśćOstrzeżenia2: "Czy napewno chcesz usunąć to zadanie?",
                                    tak: "Potwierdzam",
                                    nie: "Odrzucam"
                                }
                            },
                            Email: {
                                etykietaUsuńEmail: "Usuń"
                            },
                            GeneratorKodu: {
                                walidacjaInfoBłąd: "Nieprawidłowy adres email",
                                podtytuł: "Generator kodu dostępu do testu",
                                nazwaTestu: "Nazwa testu:",
                                wynikiPrześlijNa: "Wyniki prześlij na:",
                                inputEmail: {
                                    placeholderWpiszEmail: "wpisz adres email",
                                    przyciskDodaj: "Dodaj"
                                },
                                obiektKOdu: {
                                    tytuł: "Nowy kod to:",
                                    informacja: "Przekaż kod kandydatowi, aby mógł uruchomić test.",
                                    przycisk: {
                                        wygeneruj: "Wygeneruj",
                                        nowy: "nowy",
                                        kod: "kod"
                                    }
                                }
                            },
                            ModyfikujTest: {
                                tytuł: "MODYFIKOWANIE TESTU",
                                opis: "Opis",
                                przycisk: {
                                    usuńTest: "Usuń test",
                                    resetuj: "Resetuj",
                                    zatwierdźZmiany: "Zatwierdź zmiany"
                                },
                                inputy: {
                                    labelNazwaTestu: "Nazwa testu",
                                    labelKrótkiOpis: "Krótki opis"
                                },
                                awatar: {
                                    tytuł: "Awatar",
                                    aktualny: "Aktualny:"
                                },
                                dostępDoTestu: {
                                    tytuł: "Dostęp do testu",
                                    etykietaTylkoTy: "Tylko Ty",
                                    grupa: "Grupa",
                                    wszyscy: "Wszyscy użytkownicy portalu"
                                },
                                limitCzasowy: {
                                    tytuł: "Czas trwania testu",
                                    label: {
                                        limitCzasowy: "Limit czasowy",
                                        minuty: "Minuty",
                                        sekundy: "Sekundy"
                                    }
                                },
                                instrukcja: {
                                    tytuł: "Instrukcja",
                                    inputLabel: "Treść instrukcji"
                                },
                                walidacjaInfoBłąd: {
                                    nazwa: "Nazwa testu może mieć między 1 a 60 znaków",
                                    krótkiOpis: "Opis testu może mieć między 1 a 60 znaków",
                                    limitCzasowySekundy: "Limit czasu -> maksymalna wartość dla sekund to 59"
                                },
                                confirmAlertTest: {
                                    tytuł: "Ostrzeżenie",
                                    treśćOstrzeżenia1: "Operacji nie będzie można cofnąć.",
                                    treśćOstrzeżenia2: "Czy napewno chcesz usunąć ten test?",
                                    tak: "Tak",
                                    nie: "Nie"
                                }
                            },
                            OryginalneZadanie: {
                                etykietaPoprawnaOdpowiedź: "Poprawna odpowiedź:"
                            },
                            ZadaniaTestu: {
                                tytuł: "ZADANIA",
                                brakPrzypisanychZadań: "Brak przypisanych zadań.",
                                wybierzTypZadania: "Wybierz typ zadania",
                                przycisk: {
                                    dodajZadanie: "Dodaj zadanie",
                                    anuluj: "Anuluj",
                                    zadanieZamknięte: "Zadanie zamknięte",
                                    zadanieOtwarte: "Zadanie otwarte"
                                },
                                dodajZadanie: {
                                    treść: "...",
                                    nowaOpcjaTreść: "..."
                                },
                                notyfikacja: {
                                    błądZapisZmian: "Nie udało się zapisać zmiany",
                                    błądDodanieZadania: "Nie udało się dodać zadania",
                                    błądUsunięcieZadania: "Nie udało się usunąć zadania"
                                }
                            },
                            Zadanie: {
                                dodajOpcję: {
                                    treść: ""
                                },
                                walidacjaInfoBłąd: {
                                    treść: "Treść zadania nie może być pusta",
                                    treść_opcja: "Treść opcji wyboru nie może być pusta",
                                    niePodanoOpcji: "Musisz podać przynajmniej jedną opcję wyboru"
                                }
                            },
                            ZmienAvatar: {
                                tytuł: "Wybierz obraz reprezentujący test",
                                przyciskZamknij: "Zamknij"
                            }
                        }
                    },
                    użytkownik: {
                        DaneUżytkownikaGrupa: {
                            grupa: "Grupa",
                            niePrzypisano: "Nie przypisano",
                            trybEdycji: "Tryb edycji",
                            przyciskZamknij: "Zamknij"
                        },
                        DaneUzytkownikaHaslo: {
                            hasło: "Hasło",
                            trybEdycji: "Tryb edycji",
                            etykietaInputu: {
                                hasło: "Hasło",
                                powtórzHasło: "Powtórz hasło"
                            },
                            przycisk: {
                                zamknij: "Zamknij",
                                zapisz: "Zapisz"
                            },
                            walidacjaInfoBłąd: {
                                hasło: "Podane hasło jest za krótkie"
                            },
                            notyfikacja: {
                                błądPowtórzeniaHasła: "Błędnie powtórzono hasło",
                            }
                        },
                        DaneUzytkownikaNazwa: {
                            imieInazwisko: "Imię i nazwisko",
                            trybEdycji: "Tryb edycji",
                            przycisk: {
                                zamknij: "Zamknij",
                                zapisz: "Zapisz"
                            },
                            notyfikacja: {
                                błądNazwa: "Nazwa nie może być pusta",
                            }
                        },
                        GrupaRejestracja: {
                            tytuł: "Zarejestruj nową grupę",
                            przyciskZarejestruj: "Zarejestruj",
                            zarejestrowanoNowaFirmę: "Zarejestrowano nowa firmę.",
                            nazwa: "Nazwa",
                            czyPrzypisać: "Czy przypisać firmę do Twojego konta?",
                            przycisk: {
                                potwierdzenie: "Tak",
                                zaprzeczenie: "Nie"
                            },
                            notyfikacja: {
                                błądGrupaJużIstnieje: "This group is already registered",
                            },
                        },
                        GrupaWyszukiwanie: {
                            notyfikacja: {
                                błądNieznalezionoGrupy: "Nie znaleziono takiej grupy w bazie danych",
                            },
                            blokNieznalezionoGrupy: {
                                tytuł: "Wyszukaj grupę po nazwie",
                            },
                            blokZnalezionoGrupę: {
                                tytuł: "Znaleizono grupę",
                                nazwa: "Nazwa",
                                czyPrzypisać: "Czy przypisać firmę do Twojego konta?",
                            },
                            przycisk: {
                                szukaj: "Szukaj",
                                potwierdzenie: "Tak",
                                zaprzeczenie: "Nie"
                            }
                        },
                        UstawienieJęzyka: {
                            tytuł: "Ustawienia języka",
                            trybEdycji: "Tryb edycji",
                            pełnaNazwaJęzyka: {
                                pl: "polski",
                                en: "angielski"
                            },
                            notyfikacja: {
                                błądJęzyk: "Proszę określić język"
                            },
                            przycisk: {
                                zamknij: "Zamknij",
                                zapisz: "Zapisz"
                            }
                        }
                    }
                }
            }
        }
    },

    en: {
        stronaGłówna: {
            InformacjaPotwierdzenieKonta: {
                wiadomośćPotwierdzenie: "The account has been activated. You can log in now.",
                wiadomośćNegacja: "The account has not been activated. An error occured.",
                przycisk: "OK"
            },
            StronaGlownaNaglowek: {
                nazwaAplikacji: "JW ONLINE TESTS",
                przyciskLogowania: "Log in",
                przyciskRejestracji: "Registration",
                przyciskWeryfikacjiKodu: "Check the code",
                input: {
                    labelLogin: "E-mail adress",
                    labelHasło: "Password"
                }
            },
            WeryfikacjaKodu: {
                tytuł: "Start test",
                opis: "To start the test, enter the access code received from the recruiter.",
                przyciskRozpocznij: "Start"
            },
            RejestracjaUżytkownika: {
                błędy: {
                    nazwa: "The name is required",
                    email: "Invalid email",
                    haslo: "Too short password",
                    hasloPowrorzenie: "Too short repeated password",
                    notyfikacjaHasloPowrorzenie: "The password and its repetition are not equal"
                },
                tytuł: "Registration",
                inputy: {
                    nazwa: "Name and surname",
                    email: "E-mail adress",
                    hasło: "Password",
                    powtórzHasło: "Repeat password"
                },
                przyciskZarejestruj: "Register me",
                przyciskPotwierdzenie: "OK"
            },
            Stopka: {
                autor: "The author of this app is J.W.",
                prawaAutorskie: "All rights reserved."
            }
        },
        test: {
            InformacjaKońcowa: {
                tytuł: "Test completed",
                wiadomość: {
                    trwaWysyłanie: "Sending results to server...",
                    odpowiedziZapisano: "Answers were saved."
                },
                przyciskPotwierdzenia: "OK",
                błędy: {
                    notyfikacjaNieUdałoSięWysłaćWyników: "Results could not be sent"
                }
            },
            InstrukcjaTestu: {
                podtytuły: {
                    informacja: "Information",
                    inputy: "Please enter your name and surname"
                },
                inputy: {
                    imie: "Name",
                    nazwisko: "Surname"
                },
                przycisk: {
                    etykietaGdyNierozpoczętyTest: "Start",
                    etykietaGdyRozpoczętyTest: "Test"
                },
                błędy: {
                    imię: "You must enter your name",
                    nazwisko: "You must enter your surname"
                }
            },
            Naglowek: {
                etykietaOdpowiedzi: "Number of your answers:",
                przyciskWyśljWyniki: "Send answers"
            },
            SpisZadan: {
                etykietaPytanie: "Question"
            },
            Zadanie: {
                etykietaZadanieNr: "Task",
                informacjaPrzyPróbieWklejania: "Pasting is not allowed"
            },
            Zegar: {
                etykietaZegara: "Remaining time"
            }
        },
        panelKlienta: {
            MenuBoczne: {
                przycisk: {
                    testy: "Tests",
                    kodyDostępu: "Access codes",
                    twojeKonto: "Your account",
                    użytkownicy: "Users"
                }
            },
            Naglowek: {
                tytułAplikacji: "JW ONLINE TESTS",
                tytułPodstrony: "CUSTOMER PANEL",
                przyciskWylogowania: "Log out"
            },
            trescGłówna: {
                PanelKlientaKody: {
                    confirmAlert: {
                        tytuł: "Deleting a record",
                        treśćOstrzeżenia: "Do you really want to delete this record?",
                        tak: "Yes",
                        nie: "No"
                    },
                    infoBrakKodów: "Lack of codes"
                },
                PanelKlientaTesty: {
                    przycisk: {
                        dodajTest: "Add test"
                    },
                    dodajTest: {
                        nazwa: "New test",
                        krótkiOpis: "Short description"
                    },
                    notyfikacje: {
                        usuwanie: {
                            sukces: "Test has been removed",
                            niepowodzenie: "The attempt to delete was unsuccessful"
                        },
                        zapiszZmiany: {
                            sukces: "Changes saved",
                            niepowodzenie: "An attempt to save changes has failed"
                        }
                    }
                },
                PanelKlientaUżytkownik: {
                    podtytuł: "Your account",
                    notyfikacje: {
                        aktualizacjaDanych: {
                            sukces: "Changes saved",
                            niepowodzenie: "The change could not be saved"
                        }
                    }
                },
                zakładki: {
                    kodyTestów: {
                        KodTestu: {
                            badgeWyniki: {
                                brakWyników: "No results"
                            },
                            przycisk: {
                                usuń: "Delete"
                            },
                            notyfikacje: {
                                ściągnijWyniki: {
                                    niepowodzenie: "The file could not be downloaded"
                                }
                            }
                        },
                        KodTestuNaglowek: {
                            lp: "#",
                            dataUtworzenia: "Created on",
                            kandydat: "Candidate",
                            nazwaTestu: "Test",
                            kod: "Code",
                            odbiorcy: "Recipients",
                            dataUsunięcia: "Valid till",
                            wyniki: "Results"
                        }
                    },
                    testy: {
                        PanelKlientaTestPoziom2: {
                            blokIlośćZadań: {
                                etykietaŁącznaIlosćZadań: "Total number of tasks:",
                                etykietaZamkniętych: "- closed:",
                                etykietaOtwartych: "- open:",
                            },
                            blokZarządzanieTestem: {
                                etykietaZarządzaTestem: "Manages the test:",
                                etykietaDataRejestracji: "Date of registration:",
                                etykietaDataModyfikacji: "Date of modification:"
                            },
                            blokPrzycisków: {
                                etykietaZadania: "Tasks",
                                etykietaUstawieniaTestu: "Test settings",
                                etykietaWygenerujKod: "Generate the code",
                            }
                        },
                        poziom3_szczegóły: {
                            EdytowaneZadanie: {
                                usuńOpdcję: "Delete",
                                dodajOpcję: "Add an option",
                                poprawnaOdpowiedź: "Correct answer:",
                                trybEdycji: "Edit mode",
                                usuńZadanie: "Delete the task",
                                zapisz: "Save",
                                zamknij: "Close",
                                odrzućZmiany: "Discard changes",
                                confirmAlert: {
                                    tytuł: "Warning",
                                    treśćOstrzeżenia1: "The operation can not be undone.",
                                    treśćOstrzeżenia2: "Do you really want to delete this task?",
                                    tak: "Confirm",
                                    nie: "I reject"
                                }
                            },
                            Email: {
                                etykietaUsuńEmail: "Delete"
                            },
                            GeneratorKodu: {
                                walidacjaInfoBłąd: "Incorrect e-mail address",
                                podtytuł: "Test access code generator",
                                nazwaTestu: "Test name:",
                                wynikiPrześlijNa: "Send results to:",
                                inputEmail: {
                                    placeholderWpiszEmail: "Enter email",
                                    przyciskDodaj: "Add"
                                },
                                obiektKOdu: {
                                    tytuł: "New code is:",
                                    informacja: "Give the candidate a code so that he can run the test.",
                                    przycisk: {
                                        wygeneruj: "Generate",
                                        nowy: "new",
                                        kod: "code"
                                    }
                                }
                            },
                            ModyfikujTest: {
                                tytuł: "TEST SETTINGS",
                                opis: "Description",
                                przycisk: {
                                    usuńTest: "Delete test",
                                    resetuj: "Reset",
                                    zatwierdźZmiany: "Confirm changes"
                                },
                                inputy: {
                                    labelNazwaTestu: "Test name",
                                    labelKrótkiOpis: "Short description"
                                },
                                awatar: {
                                    tytuł: "Avatar",
                                    aktualny: "Current:"
                                },
                                dostępDoTestu: {
                                    tytuł: "Access to the test",
                                    etykietaTylkoTy: "Only You",
                                    grupa: "Group",
                                    wszyscy: "All users"
                                },
                                limitCzasowy: {
                                    tytuł: "Duration of the test",
                                    label: {
                                        limitCzasowy: "Time limit",
                                        minuty: "Minutes",
                                        sekundy: "Seconds"
                                    }
                                },
                                instrukcja: {
                                    tytuł: "Instruction",
                                    inputLabel: "Contents of the instructions"
                                },
                                walidacjaInfoBłąd: {
                                    nazwa: "The test name can be between 1 and 60 characters long",
                                    krótkiOpis: "The test description can be between 1 and 60 characters long",
                                    limitCzasowySekundy: "Timeout -> maximum value for seconds is 59"
                                },
                                confirmAlertTest: {
                                    tytuł: "Warning",
                                    treśćOstrzeżenia1: "The operation can not be undone.",
                                    treśćOstrzeżenia2: "Do you really want to delete this test?",
                                    tak: "Yes",
                                    nie: "No"
                                }
                            },
                            OryginalneZadanie: {
                                etykietaPoprawnaOdpowiedź: "Correct answer:"
                            },
                            ZadaniaTestu: {
                                tytuł: "TASKS",
                                brakPrzypisanychZadań: "Brak przypisanych zadań.",
                                wybierzTypZadania: "There are no assigned tasks",
                                przycisk: {
                                    dodajZadanie: "Add task",
                                    anuluj: "Cancel",
                                    zadanieZamknięte: "Closed task",
                                    zadanieOtwarte: "Open task"
                                },
                                dodajZadanie: {
                                    treść: "...",
                                    nowaOpcjaTreść: "..."
                                },
                                notyfikacja: {
                                    błądZapisZmian: "The change could not be saved",
                                    błądDodanieZadania: "The task could not be added",
                                    błądUsunięcieZadania: "The task could not be deleted"
                                }
                            },
                            Zadanie: {
                                dodajOpcję: {
                                    treść: ""
                                },
                                walidacjaInfoBłąd: {
                                    treść: "The content of the task can not be empty",
                                    treść_opcja: "The content of the selection options can not be empty",
                                    niePodanoOpcji: "You must provide at least one selection option"
                                }
                            },
                            ZmienAvatar: {
                                tytuł: "Select the image representing the test",
                                przyciskZamknij: "Close"
                            }
                        }
                    },
                    użytkownik: {
                        DaneUżytkownikaGrupa: {
                            grupa: "Group",
                            niePrzypisano: "Not assigned",
                            trybEdycji: "Edit mode",
                            przyciskZamknij: "Close"
                        },
                        DaneUzytkownikaHaslo: {
                            hasło: "Password",
                            trybEdycji: "Edit mode",
                            etykietaInputu: {
                                hasło: "Password",
                                powtórzHasło: "Repeated password"
                            },
                            przycisk: {
                                zamknij: "Close",
                                zapisz: "Save"
                            },
                            walidacjaInfoBłąd: {
                                hasło: "The password provided is too short"
                            },
                            notyfikacja: {
                                błądPowtórzeniaHasła: "The password has been incorrectly repeated",
                            }
                        },
                        DaneUzytkownikaNazwa: {
                            imieInazwisko: "Name and surname",
                            trybEdycji: "Edit mode",
                            przycisk: {
                                zamknij: "Close",
                                zapisz: "Save"
                            },
                            notyfikacja: {
                                błądNazwa: "The name can not be empty",
                            }
                        },
                        GrupaRejestracja: {
                            tytuł: "Register a new group",
                            przyciskZarejestruj: "Register",
                            zarejestrowanoNowaFirmę: "A new group was registered.",
                            nazwa: "Name",
                            czyPrzypisać: "Whether to assign a group to your account?",
                            przycisk: {
                                potwierdzenie: "Yes",
                                zaprzeczenie: "No"
                            },
                            notyfikacja: {
                                błądGrupaJużIstnieje: "This group is already registered",
                            },
                        },
                        GrupaWyszukiwanie: {
                            notyfikacja: {
                                błądNieznalezionoGrupy: "This group was not found in the database",
                            },
                            blokNieznalezionoGrupy: {
                                tytuł: "Search for the group by name",
                            },
                            blokZnalezionoGrupę: {
                                tytuł: "The group was found",
                                nazwa: "Name",
                                czyPrzypisać: "Whether to assign a company to your account?",
                            },
                            przycisk: {
                                szukaj: "Search",
                                potwierdzenie: "Yes",
                                zaprzeczenie: "No"
                            }
                        },
                        UstawienieJęzyka: {
                            tytuł: "Language settings",
                            trybEdycji: "Edit mode",
                            pełnaNazwaJęzyka: {
                                pl: "polish",
                                en: "english"
                            },
                            notyfikacja: {
                                błądJęzyk: "Please specify language"
                            },
                            przycisk: {
                                zamknij: "Close",
                                zapisz: "Save"
                            }
                        }
                    }
                }
            }
        }
    },
}


export function zdobądźTekstyWersjiJęzykowej(ścieżka) {
    let { wersjaJęzykowa } = window.store.getState().reducerWersjaJęzkowa;
    wersjaJęzykowa = wersjaJęzykowa ? wersjaJęzykowa : pobierzJęzykZLocalStorage()
    return get(tekstyWersjiJęzykowych[wersjaJęzykowa], ścieżka);
}

const key = 'wersjaJęzykowa'
export function ustawJęzykWLocalStorage(język) {
    localStorage.setItem(key, język)
}
export function pobierzJęzykZLocalStorage(język) {
    localStorage.getItem(key)
}
export default {
    zdobądźTekstyWersjiJęzykowej,
    ustawJęzykWLocalStorage,
    pobierzJęzykZLocalStorage
}