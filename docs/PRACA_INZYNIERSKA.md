# Mail Manager - Dokumentacja do pracy inżynierskiej

## 1. Wstęp

### 1.1 Cel projektu
Celem projektu jest stworzenie aplikacji internetowej umożliwiającej zarządzanie wieloma kontami pocztowymi z jednego miejsca. Aplikacja pozwala użytkownikom na:
- Dodawanie i zarządzanie wieloma kontami email
- Przeglądanie wiadomości ze wszystkich kont w jednym miejscu
- Wysyłanie wiadomości email
- Bezpieczne przechowywanie danych uwierzytelniających

### 1.2 Zakres funkcjonalny
- System rejestracji i logowania użytkowników
- Zarządzanie kontami pocztowymi (CRUD)
- Odbieranie wiadomości przez protokół IMAP
- Wysyłanie wiadomości przez protokół SMTP
- Interfejs użytkownika do przeglądania i zarządzania emailami

## 2. Analiza wymagań

### 2.1 Wymagania funkcjonalne
- F1: System musi umożliwiać rejestrację nowych użytkowników
- F2: System musi umożliwiać logowanie użytkowników
- F3: Użytkownik może dodać wiele kont pocztowych
- F4: System musi pobierać wiadomości z serwerów IMAP
- F5: System musi umożliwiać wysyłanie wiadomości przez SMTP
- F6: System musi wyświetlać listę wiadomości
- F7: System musi wyświetlać szczegóły wybranej wiadomości
- F8: System musi umożliwiać usuwanie wiadomości
- F9: Dane logowania do kont pocztowych muszą być szyfrowane

### 2.2 Wymagania niefunkcjonalne
- NF1: Bezpieczeństwo - hasła użytkowników muszą być hashowane
- NF2: Bezpieczeństwo - dane logowania do kont pocztowych muszą być szyfrowane
- NF3: Użyteczność - interfejs musi być intuicyjny i responsywny
- NF4: Wydajność - czas ładowania wiadomości < 5 sekund
- NF5: Skalowalność - możliwość obsługi wielu użytkowników

## 3. Architektura systemu

### 3.1 Architektura ogólna
Aplikacja oparta jest na architekturze klient-serwer z wyraźnym podziałem na:
- **Frontend** - interfejs użytkownika (React)
- **Backend** - logika biznesowa i API (Node.js + Express)
- **Baza danych** - przechowywanie danych (SQLite)
- **Serwery pocztowe** - zewnętrzne serwery IMAP/SMTP

### 3.2 Diagram architektury

```
┌─────────────────┐
│   Przeglądarka  │
│   (Frontend)    │
│     React       │
└────────┬────────┘
         │ HTTP/REST
         │
┌────────▼────────┐      ┌──────────────┐
│   Serwer API    │──────│    SQLite    │
│   (Backend)     │      │   Database   │
│  Node.js/Express│      └──────────────┘
└────────┬────────┘
         │ IMAP/SMTP
         │
┌────────▼────────┐
│ Serwery pocztowe│
│ (Gmail, Outlook)│
└─────────────────┘
```

### 3.3 Wzorce projektowe
- **MVC** - separacja logiki biznesowej (controllers), danych (models) i prezentacji (views/components)
- **REST API** - komunikacja między frontendem a backendem
- **Middleware** - autoryzacja i obsługa błędów
- **Context API** - zarządzanie stanem globalnym w React

## 4. Technologie

### 4.1 Backend
- **Node.js** - środowisko uruchomieniowe JavaScript
- **Express.js** - framework do budowy API
- **SQLite** - lekka baza danych SQL
- **node-imap** - biblioteka do obsługi protokołu IMAP
- **nodemailer** - biblioteka do wysyłania emaili przez SMTP
- **bcryptjs** - hashowanie haseł
- **jsonwebtoken** - autoryzacja JWT
- **mailparser** - parsowanie wiadomości email

### 4.2 Frontend
- **React** - biblioteka do budowy interfejsu użytkownika
- **React Router** - routing w aplikacji
- **Axios** - klient HTTP do komunikacji z API
- **TailwindCSS** - framework CSS do stylowania

### 4.3 Uzasadnienie wyborów technologicznych

#### Node.js + Express
- Jednolity język (JavaScript) dla całego stosu technologicznego
- Bogaty ekosystem bibliotek (npm)
- Doskonała obsługa operacji asynchronicznych (ważne dla IMAP/SMTP)
- Lekki i wydajny

#### React
- Komponenty wielokrotnego użytku
- Wirtualny DOM dla lepszej wydajności
- Duża społeczność i wsparcie
- Łatwa integracja z różnymi bibliotekami

#### SQLite
- Nie wymaga osobnego serwera bazy danych
- Lekka i szybka
- Idealna dla małych/średnich aplikacji
- Łatwa konfiguracja i przenoszenie

#### JWT (JSON Web Tokens)
- Stateless authentication
- Skalowalność
- Bezpieczeństwo
- Standard branżowy

## 5. Struktura bazy danych

### 5.1 Model danych

```sql
-- Tabela użytkowników
users
├── id (INTEGER, PRIMARY KEY)
├── email (VARCHAR, UNIQUE)
├── password (VARCHAR, hashed)
├── name (VARCHAR)
└── created_at (DATETIME)

-- Tabela kont pocztowych
email_accounts
├── id (INTEGER, PRIMARY KEY)
├── user_id (INTEGER, FOREIGN KEY)
├── email (VARCHAR)
├── provider (VARCHAR)
├── imap_host (VARCHAR)
├── imap_port (INTEGER)
├── smtp_host (VARCHAR)
├── smtp_port (INTEGER)
├── username (VARCHAR)
├── password (VARCHAR, encrypted)
├── use_tls (BOOLEAN)
└── created_at (DATETIME)

-- Tabela folderów (opcjonalna, cache)
folders
├── id (INTEGER, PRIMARY KEY)
├── account_id (INTEGER, FOREIGN KEY)
├── name (VARCHAR)
└── path (VARCHAR)
```

### 5.2 Relacje
- Jeden użytkownik może mieć wiele kont pocztowych (1:N)
- Jedno konto pocztowe ma wiele folderów (1:N)

## 6. API Endpoints

### 6.1 Autentykacja

```
POST /api/auth/register
Body: { email, password, name }
Response: { token, user }

POST /api/auth/login
Body: { email, password }
Response: { token, user }

GET /api/auth/profile
Headers: { Authorization: Bearer <token> }
Response: { user }
```

### 6.2 Zarządzanie kontami

```
GET /api/accounts
Headers: { Authorization: Bearer <token> }
Response: { accounts: [...] }

POST /api/accounts
Body: { email, provider, imapHost, imapPort, ... }
Response: { account }

PUT /api/accounts/:id
Body: { email, provider, ... }
Response: { message }

DELETE /api/accounts/:id
Response: { message }
```

### 6.3 Zarządzanie emailami

```
GET /api/emails/:accountId?folder=INBOX&limit=50
Response: { emails: [...], total }

GET /api/emails/:accountId/:emailId?folder=INBOX
Response: { email }

POST /api/emails/send
Body: { accountId, to, subject, text, html }
Response: { message, messageId }

DELETE /api/emails/:accountId/:emailId
Response: { message }
```

## 7. Bezpieczeństwo

### 7.1 Mechanizmy bezpieczeństwa

#### Hashowanie haseł (bcrypt)
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
```

#### Szyfrowanie danych logowania
```javascript
const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(JWT_SECRET, 'salt', 32);
```

#### JWT dla autoryzacji
```javascript
const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
```

### 7.2 Zabezpieczenia
- CORS - kontrola dostępu z innych domen
- Walidacja danych wejściowych
- Hasła użytkowników nigdy nie są przechowywane w postaci jawnej
- Tokeny JWT z ograniczonym czasem ważności
- HTTPS w środowisku produkcyjnym (zalecane)

## 8. Protokoły pocztowe

### 8.1 IMAP (Internet Message Access Protocol)
Protokół do odbierania wiadomości email:
- Domyślny port: 993 (SSL/TLS) lub 143 (bez szyfrowania)
- Umożliwia synchronizację wiadomości
- Wiadomości pozostają na serwerze
- Obsługa folderów

Przykład połączenia:
```javascript
const imap = new Imap({
  user: 'user@example.com',
  password: 'password',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});
```

### 8.2 SMTP (Simple Mail Transfer Protocol)
Protokół do wysyłania wiadomości email:
- Domyślny port: 587 (STARTTLS) lub 465 (SSL)
- Służy wyłącznie do wysyłania
- Wymaga autoryzacji

Przykład wysyłania:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'user@example.com',
    pass: 'password'
  }
});
```

## 9. Interfejs użytkownika

### 9.1 Strony aplikacji
1. **Logowanie** - formularz logowania
2. **Rejestracja** - formularz rejestracji
3. **Dashboard** - główny widok aplikacji z:
   - Listą kont pocztowych (sidebar)
   - Listą wiadomości (środek)
   - Podglądem wiadomości (prawo)

### 9.2 Komponenty React
- `Login.js` - strona logowania
- `Register.js` - strona rejestracji
- `Dashboard.js` - główny widok aplikacji
- `AccountList.js` - lista i zarządzanie kontami
- `EmailList.js` - lista wiadomości
- `EmailView.js` - widok pojedynczej wiadomości
- `ComposeEmail.js` - formularz nowej wiadomości

### 9.3 Zarządzanie stanem
- **Context API** - globalny stan autoryzacji
- **useState** - lokalny stan komponentów
- **useEffect** - efekty uboczne (pobieranie danych)

## 10. Testowanie

### 10.1 Testowanie manualne
1. Rejestracja nowego użytkownika
2. Logowanie
3. Dodanie konta pocztowego
4. Pobieranie wiadomości
5. Wyświetlanie szczegółów wiadomości
6. Wysyłanie nowej wiadomości
7. Usuwanie wiadomości
8. Wylogowanie

### 10.2 Przypadki testowe

| ID | Test | Oczekiwany rezultat |
|----|------|---------------------|
| T1 | Rejestracja z poprawnymi danymi | Utworzenie konta i automatyczne logowanie |
| T2 | Logowanie z błędnymi danymi | Wyświetlenie komunikatu o błędzie |
| T3 | Dodanie konta Gmail | Pomyślne dodanie konta |
| T4 | Pobieranie wiadomości | Wyświetlenie listy wiadomości |
| T5 | Wysłanie wiadomości | Wiadomość wysłana pomyślnie |
| T6 | Dostęp bez tokenu | Przekierowanie do logowania |

## 11. Możliwe rozszerzenia

### 11.1 Krótkoterminowe
- Obsługa załączników
- Filtrowanie i wyszukiwanie wiadomości
- Oznaczanie wiadomości jako przeczytane/nieprzeczytane
- Obsługa folderów (Wysłane, Spam, Kosz)
- Powiadomienia o nowych wiadomościach

### 11.2 Długoterminowe
- Automatyczne kategoryzowanie wiadomości
- Filtrowanie spamu (machine learning)
- Harmonogram wysyłania wiadomości
- Podpisy email
- Tryb offline
- Aplikacja mobilna (React Native)
- Eksport/import danych
- Integracje z kalendarzem

## 12. Wnioski

### 12.1 Osiągnięte cele
- Stworzono w pełni funkcjonalną aplikację do zarządzania wieloma kontami pocztowymi
- Zaimplementowano bezpieczny system autoryzacji
- Zapewniono intuicyjny interfejs użytkownika
- Zastosowano nowoczesne technologie webowe

### 12.2 Napotkane wyzwania
- Obsługa asynchronicznych operacji IMAP
- Różnice w implementacji IMAP między dostawcami
- Zarządzanie stanem w złożonej aplikacji React
- Bezpieczne przechowywanie danych uwierzytelniających

### 12.3 Zdobyte umiejętności
- Tworzenie REST API z Node.js/Express
- Budowa aplikacji React z routingiem
- Praca z protokołami IMAP/SMTP
- Implementacja autoryzacji JWT
- Projektowanie bazy danych
- Zarządzanie projektem full-stack

## 13. Bibliografia

1. Node.js Documentation - https://nodejs.org/docs
2. React Documentation - https://react.dev
3. Express.js Guide - https://expressjs.com
4. RFC 3501 - IMAP Protocol - https://tools.ietf.org/html/rfc3501
5. RFC 5321 - SMTP Protocol - https://tools.ietf.org/html/rfc5321
6. JWT Introduction - https://jwt.io/introduction
7. OWASP Security Guidelines - https://owasp.org
8. MDN Web Docs - https://developer.mozilla.org

## 14. Załączniki

### Załącznik A - Instrukcja instalacji
Zobacz: `docs/INSTALACJA.md`

### Załącznik B - Zrzuty ekranu
(Dodać po uruchomieniu aplikacji)

### Załącznik C - Kod źródłowy
Kod źródłowy dostępny w strukturze projektu:
- `/backend` - kod backendu
- `/frontend` - kod frontendu
