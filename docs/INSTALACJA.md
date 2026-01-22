# Instrukcja instalacji Mail Manager

## Wymagania wstępne

Przed rozpoczęciem instalacji upewnij się, że masz zainstalowane:
- Node.js (wersja 14 lub nowsza)
- npm (zwykle instalowany razem z Node.js)
- Git (opcjonalnie, do klonowania repozytorium)

## Instalacja krok po kroku

### 1. Instalacja backendu

```bash
# Przejdź do katalogu backend
cd mail-manager/backend

# Zainstaluj zależności
npm install

# Zainicjalizuj bazę danych
npm run init-db

# Uruchom serwer (tryb deweloperski)
npm run dev

# LUB uruchom serwer (tryb produkcyjny)
npm start
```

Serwer powinien uruchomić się na porcie 5000. Sprawdź czy działa odwiedzając:
http://localhost:5000/api/health

### 2. Instalacja frontendu

Otwórz nowe okno terminala:

```bash
# Przejdź do katalogu frontend
cd mail-manager/frontend

# Zainstaluj zależności
npm install

# Uruchom aplikację
npm start
```

Aplikacja powinna automatycznie otworzyć się w przeglądarce pod adresem:
http://localhost:3000

## Konfiguracja

### Backend (.env)

Plik `.env` w katalogu backend:

```
PORT=5000
JWT_SECRET=zmien_to_na_bezpieczny_klucz_w_produkcji
DB_PATH=./database.sqlite
NODE_ENV=development
```

WAŻNE: W środowisku produkcyjnym zmień `JWT_SECRET` na długi, losowy ciąg znaków!

### Frontend (.env)

Plik `.env` w katalogu frontend:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Pierwsze uruchomienie

1. Otwórz przeglądarkę i przejdź do http://localhost:3000
2. Kliknij "Zarejestruj się"
3. Utwórz nowe konto użytkownika
4. Po zalogowaniu dodaj swoje pierwsze konto pocztowe

## Konfiguracja kont pocztowych

### Gmail

WAŻNE: Gmail wymaga użycia "Haseł aplikacji" zamiast zwykłego hasła.

1. Włącz weryfikację dwuetapową w swoim koncie Google
2. Wygeneruj hasło aplikacji: https://myaccount.google.com/apppasswords
3. W aplikacji Mail Manager wybierz dostawcę "Gmail"
4. Wprowadź swój adres email
5. Jako hasło użyj wygenerowanego hasła aplikacji (16 znaków bez spacji)

Ustawienia (wypełniane automatycznie):
- IMAP: imap.gmail.com:993
- SMTP: smtp.gmail.com:587

### Outlook/Hotmail

Ustawienia (wypełniane automatycznie):
- IMAP: outlook.office365.com:993
- SMTP: smtp-mail.outlook.com:587

UWAGA: Może wymagać włączenia IMAP w ustawieniach konta Outlook.

### Yahoo Mail

Ustawienia (wypełniane automatycznie):
- IMAP: imap.mail.yahoo.com:993
- SMTP: smtp.mail.yahoo.com:587

UWAGA: Yahoo wymaga hasła aplikacji podobnie jak Gmail.

### Własny serwer

Jeśli używasz własnego serwera pocztowego:
1. Wybierz dostawcę "Własny"
2. Wprowadź dane serwera IMAP i SMTP
3. Zwykle porty to 993 (IMAP) i 587 (SMTP)
4. Wprowadź dane logowania

## Rozwiązywanie problemów

### Backend nie uruchamia się

```bash
# Upewnij się, że jesteś w katalogu backend
cd backend

# Sprawdź czy wszystkie zależności są zainstalowane
npm install

# Sprawdź logi
npm run dev
```

### Frontend nie uruchamia się

```bash
# Upewnij się, że jesteś w katalogu frontend
cd frontend

# Wyczyść cache i zainstaluj ponownie
rm -rf node_modules package-lock.json
npm install

# Uruchom ponownie
npm start
```

### Nie można połączyć się z kontem pocztowym

- Sprawdź czy dane logowania są poprawne
- Upewnij się, że IMAP jest włączony w ustawieniach konta
- W przypadku Gmail/Yahoo użyj hasła aplikacji
- Sprawdź czy firewall nie blokuje połączenia

### Błąd CORS

Upewnij się, że:
- Backend działa na porcie 5000
- Frontend działa na porcie 3000
- W pliku `.env` frontendu jest ustawiony poprawny adres API

## Budowanie na produkcję

### Backend

```bash
cd backend
npm install --production
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

Pliki produkcyjne znajdziesz w katalogu `frontend/build/`

## Deployment

Dla środowiska produkcyjnego:
1. Zmień `JWT_SECRET` na bezpieczny klucz
2. Użyj właściwej bazy danych (np. PostgreSQL zamiast SQLite)
3. Skonfiguruj HTTPS
4. Ustaw zmienne środowiskowe dla produkcji
5. Rozważ użycie PM2 do zarządzania procesem backendu

## Wsparcie

W razie problemów sprawdź:
- Logi serwera (backend)
- Konsolę przeglądarki (frontend)
- Dokumentację w pliku README.md
