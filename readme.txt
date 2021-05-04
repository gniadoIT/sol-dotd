1. Zawartość katalogów:
 - fonts - czcionka Formula1 wykorzystywana w overlayu
 - graphic - grafiki top/bottom
 - js - skrypty JavaScript w tym pliki konfiguracyjne
 - photos - zdjęcia kierowców
 - styles - arkusze stylu w tym arkusz zawierający kolory zespołów

2. Uruchamianie:
 Aplikację można uruchomić na dwa sposoby:
 - SPOSÓB 1: uruchamiając serwer aplikacyjny HTTP z poziomu katalogu /sol/
 - SPOSÓB 2: uruchamiając plik liveserver.bat (wymagany python 3)

 W przypadku sposobu 2 aplikacja uruchomi się na serwerze localhost:9000, adres do aplikacji to http://localhost:9000/dotd.html

3. Konfiguracja:
 1. Uzupełniamy teamy (jeśli nieuzupełnione i/lub brakuje) w pliku /styles/teams.css wg wzoru:
    .nazwa_bez_spacji {
        background-color: #RGBHEX !important;
    }
    słowo kluczowe !important jest konieczne, aby nadpisać domyślny, biały kolor teamu.
 2. Uzupełniamy kierowców wg wzoru:
    "Imię Nazwisko team", przy czym team musi być zgodny z tym, który jest w teams.css. Przykład:
    "Lewis Hamilton mercedes",
    "Max Verstappen redbull"
    - Jeśli kierowca ma podwójne nazwisko - należy zastosować łącznik "-", na przykład:
    "Janusz Korwin-Mikke mclaren", ponieważ spacje oddzielają kolejne pola (tj. imię, nazwisko oraz team)
    - Nie należy zmieniać pierwszej ani ostatniej linijki w pliku drivers.js, skutkuje to crashem
 3. Ustawiamy nazwę kanału oraz długość poszczególnych etapów głosowania w config.js:
    - channelName - nazwa kanału, np. scigalka_tv
    - timer - czas trwania głosowania W SEKUNDACH
    - prevote - czas trwania planszy prevote (bez pokazywanych procentów) W SEKUNDACH