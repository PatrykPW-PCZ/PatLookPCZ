# Podsumowanie

Niniejsza praca inżynierska miała na celu zaprojektowanie i implementację webowej aplikacji do zarządzania wieloma kontami pocztowymi z jednego miejsca. Cel ten został w pełni zrealizowany poprzez stworzenie aplikacji PatLook, która umożliwia użytkownikom kompleksowe zarządzanie korespondencją elektroniczną z różnych skrzynek pocztowych w ramach jednolitego, intuicyjnego interfejsu.

W ramach niniejszej pracy:

- zebrano wiadomości z zakresu technologii webowych stosowanych w budowie aplikacji pocztowych, protokołów komunikacji pocztowej IMAP i SMTP, mechanizmów uwierzytelniania i szyfrowania danych w aplikacjach internetowych oraz istniejących rozwiązań do zarządzania wieloma kontami pocztowymi,
- porównano popularne aplikacje pocztowe, takie jak Microsoft Outlook, Mozilla Thunderbird oraz webowe interfejsy pocztowe Gmail.com i Outlook.com pod względem funkcjonalności, wymagań systemowych, bezpieczeństwa oraz możliwości zarządzania wieloma kontami w jednym interfejsie,
- opracowano architekturę webowej aplikacji pocztowej w modelu trójwarstwowym klient-serwer, projekt relacyjnej bazy danych SQLite z mechanizmami izolacji danych między użytkownikami, specyfikację wymagań funkcjonalnych i niefunkcjonalnych systemu, diagramy przypadków użycia oraz projekt interfejsu użytkownika z obsługą trybu ciemnego,
- zrealizowano w pełni funkcjonalną aplikację webową PatLook z wykorzystaniem Node.js i Express.js po stronie serwera oraz React.js i TailwindCSS po stronie klienta, obejmującą implementację systemu rejestracji i uwierzytelniania użytkowników z tokenami JWT, modułu zarządzania kontami pocztowymi z szyfrowaniem haseł algorytmem AES-256-CBC, integracji z serwerami pocztowymi poprzez protokoły IMAP i SMTP z wykorzystaniem bibliotek node-imap i nodemailer, systemu etykiet i filtrowania wiadomości, wyszukiwarki pełnotekstowej, funkcjonalności eksportu wiadomości do formatu PDF oraz mechanizmów obsługi załączników.

W niniejszej pracy zrealizowano:

- system bezpiecznej autoryzacji użytkowników z wykorzystaniem tokenów JWT oraz hashowania haseł algorytmem bcrypt z parametrem cost factor równym 10,
- uniwersalny mechanizm obsługi protokołów IMAP i SMTP z automatycznym mapowaniem folderów dla różnych dostawców poczty (Gmail, Outlook, Yahoo, Onet, WP, Interia),
- intuicyjny interfejs użytkownika z responsywnym designem opartym na TailwindCSS, trybem ciemnym oraz systemem etykiet do kategoryzacji wiadomości,
- mechanizm szyfrowania danych uwierzytelniających do kont pocztowych z wykorzystaniem algorytmu AES-256-CBC przechowywanych w bazie danych SQLite.

Rezultaty uzyskane w ramach pracy można wykorzystać:

- jako gotowe rozwiązanie do centralnego zarządzania korespondencją elektroniczną dla użytkowników posiadających wiele kont pocztowych u różnych dostawców usług,
- jako materiał dydaktyczny prezentujący praktyczne zastosowanie technologii full-stack (React.js, Node.js, Express.js) w budowie aplikacji webowych oraz implementację protokołów IMAP i SMTP,
- jako podstawę do dalszego rozwoju i rozszerzenia funkcjonalności o dodatkowe moduły, takie jak kalendarz, kontakty, automatyczne filtrowanie wiadomości czy aplikację mobilną.

Podczas realizacji pracy napotkano szereg wyzwań technicznych, w szczególności związanych z obsługą asynchronicznych operacji protokołu IMAP oraz różnicami w implementacji tego protokołu przez poszczególnych dostawców poczty. Rozwiązanie tych problemów wymagało opracowania uniwersalnego mechanizmu mapowania nazw folderów oraz obsługi różnych formatów odpowiedzi serwerów pocztowych. Dodatkowym wyzwaniem była implementacja bezpiecznego przechowywania haseł pocztowych, które ze względu na wymagania protokołów muszą być deszyfrowane przy każdym połączeniu z serwerem.

Praca stanowi nowe ujęcie problemu agregacji poczty elektronicznej poprzez zastosowanie nowoczesnego stosu technologicznego (React.js, Node.js) oraz architektury REST API, co odróżnia ją od tradycyjnych klientów desktopowych. W odróżnieniu od istniejących rozwiązań, aplikacja PatLook oferuje lekki, webowy interfejs dostępny z dowolnej przeglądarki bez konieczności instalacji dedykowanego oprogramowania, przy jednoczesnym zachowaniu wysokiego poziomu bezpieczeństwa i prywatności danych użytkowników.

Za własne osiągnięcia autor uważa:

- zaprojektowanie i zaimplementowanie kompletnej aplikacji typu full-stack od podstaw z wykorzystaniem nowoczesnych technologii webowych,
- opracowanie uniwersalnego mechanizmu obsługi różnych dostawców poczty elektronicznej z automatyczną konfiguracją serwerów,
- stworzenie intuicyjnego interfejsu użytkownika w układzie trójpanelowym wzorowanego na profesjonalnych klientach poczty,
- implementację systemu etykiet umożliwiającego kategoryzację i filtrowanie wiadomości,
- realizację mechanizmów bezpieczeństwa obejmujących hashowanie haseł bcrypt oraz szyfrowanie AES-256-CBC.

Rekapitulując można stwierdzić, że zrealizowane w ramach niniejszej pracy zadania pozwoliły na osiągnięcie założonego celu, jakim było zaprojektowanie i implementacja webowej aplikacji do zarządzania wieloma kontami pocztowymi w jednym interfejsie użytkownika. Aplikacja PatLook stanowi kompletne rozwiązanie spełniające wszystkie zdefiniowane wymagania funkcjonalne i niefunkcjonalne, które może być wykorzystywane zarówno do celów praktycznych, jak i edukacyjnych, demonstrując zastosowanie współczesnych technologii webowych w budowie złożonych systemów informatycznych.

---

# Literatura

[1] OpenJS Foundation, *Node.js Documentation*, 2024. [Online]. Dostępne: https://nodejs.org/docs [Dostęp: styczeń 2026]

[2] S. Tilkov, S. Vinoski, "Node.js: Using JavaScript to Build High-Performance Network Programs", *IEEE Internet Computing*, vol. 14, no. 6, pp. 80-83, 2010.

[3] M. Cantelon, M. Harter, T.J. Holowaychuk, N. Rajlich, *Node.js in Action*, 2nd ed., Manning Publications, 2017.

[4] npm, Inc., *npm Documentation*, 2024. [Online]. Dostępne: https://docs.npmjs.com [Dostęp: styczeń 2026]

[5] OpenJS Foundation, *Express.js - Fast, unopinionated, minimalist web framework for Node.js*, 2024. [Online]. Dostępne: https://expressjs.com [Dostęp: styczeń 2026]

[6] E. Brown, *Web Development with Node and Express*, 2nd ed., O'Reilly Media, 2019.

[7] Express.js, *Express.js Routing Guide*, 2024. [Online]. Dostępne: https://expressjs.com/en/guide/routing.html [Dostęp: styczeń 2026]

[8] Meta Platforms, Inc., *React Documentation*, 2024. [Online]. Dostępne: https://react.dev [Dostęp: styczeń 2026]

[9] A. Banks, E. Porcello, *Learning React: Modern Patterns for Developing React Apps*, 2nd ed., O'Reilly Media, 2020.

[10] Babel, *Babel Documentation*, 2024. [Online]. Dostępne: https://babeljs.io/docs [Dostęp: styczeń 2026]

[11] React Team, *Introducing Hooks*, React Blog, 2019. [Online]. Dostępne: https://react.dev/reference/react [Dostęp: styczeń 2026]

[12] React Team, *React 18 Release*, React Blog, 2022. [Online]. Dostępne: https://react.dev/blog/2022/03/29/react-v18 [Dostęp: styczeń 2026]

[13] Tailwind Labs, *Tailwind CSS Documentation*, 2024. [Online]. Dostępne: https://tailwindcss.com/docs [Dostęp: styczeń 2026]

[14] A. Wathan, S. Schoger, *Refactoring UI*, Tailwind Labs, 2018.

[15] Tailwind Labs, *Optimizing for Production*, Tailwind CSS Documentation, 2024. [Online]. Dostępne: https://tailwindcss.com/docs/optimizing-for-production [Dostęp: styczeń 2026]

[16] Tailwind Labs, *Dark Mode*, Tailwind CSS Documentation, 2024. [Online]. Dostępne: https://tailwindcss.com/docs/dark-mode [Dostęp: styczeń 2026]

[17] SQLite Consortium, *SQLite Documentation*, 2024. [Online]. Dostępne: https://www.sqlite.org/docs.html [Dostęp: styczeń 2026]

[18] SQLite Consortium, *SQLite Architecture*, 2024. [Online]. Dostępne: https://www.sqlite.org/arch.html [Dostęp: styczeń 2026]

[19] J. Kreibich, *Using SQLite*, O'Reilly Media, 2010.

[20] M. Crispin, *INTERNET MESSAGE ACCESS PROTOCOL - VERSION 4rev1*, RFC 3501, Internet Engineering Task Force, 2003. [Online]. Dostępne: https://tools.ietf.org/html/rfc3501 [Dostęp: styczeń 2026]

[21] node-imap, *node-imap Documentation*, GitHub, 2024. [Online]. Dostępne: https://github.com/mscdex/node-imap [Dostęp: styczeń 2026]

[22] Node.js, *Stream API Documentation*, 2024. [Online]. Dostępne: https://nodejs.org/api/stream.html [Dostęp: styczeń 2026]

[23] J. Klensin, *Simple Mail Transfer Protocol*, RFC 5321, Internet Engineering Task Force, 2008. [Online]. Dostępne: https://tools.ietf.org/html/rfc5321 [Dostęp: styczeń 2026]

[24] Nodemailer, *Nodemailer Documentation*, 2024. [Online]. Dostępne: https://nodemailer.com/about/ [Dostęp: styczeń 2026]

[25] N. Provos, D. Mazières, "A Future-Adaptable Password Scheme", *Proceedings of the 1999 USENIX Annual Technical Conference*, 1999.

[26] OWASP Foundation, *Password Storage Cheat Sheet*, 2024. [Online]. Dostępne: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html [Dostęp: styczeń 2026]

[27] bcrypt.js, *bcrypt.js Documentation*, npm, 2024. [Online]. Dostępne: https://www.npmjs.com/package/bcryptjs [Dostęp: styczeń 2026]

[28] M. Jones, J. Bradley, N. Sakimura, *JSON Web Token (JWT)*, RFC 7519, Internet Engineering Task Force, 2015. [Online]. Dostępne: https://tools.ietf.org/html/rfc7519 [Dostęp: styczeń 2026]

[29] Auth0, *Introduction to JSON Web Tokens*, 2024. [Online]. Dostępne: https://jwt.io/introduction [Dostęp: styczeń 2026]

[30] OWASP Foundation, *OWASP Top Ten Web Application Security Risks*, 2021. [Online]. Dostępne: https://owasp.org/www-project-top-ten/ [Dostęp: styczeń 2026]

[31] Mozilla Developer Network, *MDN Web Docs - HTTP*, 2024. [Online]. Dostępne: https://developer.mozilla.org/en-US/docs/Web/HTTP [Dostęp: styczeń 2026]

[32] Axios, *Axios - Promise based HTTP client*, 2024. [Online]. Dostępne: https://axios-http.com/docs/intro [Dostęp: styczeń 2026]

[33] React Router, *React Router Documentation*, 2024. [Online]. Dostępne: https://reactrouter.com [Dostęp: styczeń 2026]

[34] L. Moore, K. Melcher, *Internet Message Access Protocol (IMAP) - Version 4 Revision 2*, RFC 9051, Internet Engineering Task Force, 2021. [Online]. Dostępne: https://tools.ietf.org/html/rfc9051 [Dostęp: styczeń 2026]

[35] K. Moriarty, B. Kaliski, *PKCS #5: Password-Based Cryptography Specification Version 2.1*, RFC 8018, Internet Engineering Task Force, 2017. [Online]. Dostępne: https://tools.ietf.org/html/rfc8018 [Dostęp: styczeń 2026]

[36] The Radicati Group, *Email Statistics Report, 2023-2027*, 2023.

---

## Wskazówki dotyczące odwołań w tekście

W tekście pracy należy odwoływać się do bibliografii używając numerów w nawiasach kwadratowych. Poniżej przedstawiono mapowanie odwołań do odpowiednich miejsc w pracy:

### Rozdział I - Przegląd rozwiązań
- Przy danych statystycznych o poczcie email: [36]

### Rozdział II - Protokoły pocztowe
- Przy opisie protokołu IMAP: [20], [34]
- Przy opisie protokołu SMTP: [23]
- Przy opisie szyfrowania TLS: [35]
- Przy opisie mechanizmów uwierzytelniania: [25], [26]

### Rozdział III - Opis wykorzystywanych technologii
- Przy opisie Node.js: [1], [2], [3]
- Przy opisie npm: [4]
- Przy opisie Express.js: [5], [6], [7]
- Przy opisie React.js: [8], [9], [10], [11], [12]
- Przy opisie TailwindCSS: [13], [14], [15], [16]
- Przy opisie SQLite: [17], [18], [19]
- Przy opisie node-imap: [21], [22]
- Przy opisie nodemailer: [24]
- Przy opisie bcrypt: [25], [26], [27]
- Przy opisie JWT: [28], [29]

### Rozdział IV - Założenia projektowe
- Przy opisie bezpieczeństwa: [25], [26], [30]
- Przy opisie architektury REST: [31]

### Rozdział V - Prezentacja aplikacji
- Brak bezpośrednich odwołań (rozdział prezentacyjny)

### Przykłady użycia w tekście:

1. "Node.js to środowisko uruchomieniowe JavaScript oparte na silniku V8 firmy Google [1]."

2. "Główną zaletą Node.js jest model nieblokujących operacji wejścia/wyjścia [2]."

3. "Protokół IMAP w wersji IMAP4rev1, zdefiniowanej w dokumencie RFC 3501 [20], stanowi standard komunikacyjny..."

4. "Protokół SMTP, zdefiniowany w RFC 5321 [23], stanowi standard komunikacyjny służący do przesyłania wiadomości..."

5. "bcrypt to funkcja skrótu kryptograficznego zaprojektowana specjalnie do bezpiecznego przechowywania haseł [25]."

6. "JSON Web Token to otwarty standard RFC 7519 [28] definiujący kompaktowy, samowystarczalny format..."

7. "Zgodnie z raportem Radicati Group [36], liczba aktywnych kont pocztowych na świecie przekroczyła 4,3 miliarda..."
