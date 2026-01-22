 

PRACA DYPLOMOWA INŻYNIERSKA / MAGISTERSKA

Projekt i implementacja aplikacji internetowej do obsługi wielu kont pocztowych
Title (Plik-> Właściwości).

Patryk Wojtala
Nr albumu: 135884
Kierunek: Informatyka
Forma studiów: niestacjonarne
Poziom studiów : I
Promotor pracy:Mariusz Ciesielski

Praca przyjęta dnia:

Podpis promotora:



Częstochowa, 2026 
 
Spis treści
Projekt i implementacja aplikacji internetowej do obsługi wielu kont pocztowych	1
1.	Wstęp	1
2.	Cel pracy	2
3.	Zakres pracy	4
4.	Rozdział I – Przegląd rozwiązań	1
4.1.	Microsoft Outlook	1
4.1.1.	Charakterystyka rozwiązania	1
4.1.2.	Zarządzanie wieloma kontami	1
4.1.3.	Zalety rozwiązania	1
4.1.4.	Wady i ograniczenia	2
4.2.	Mozilla Thunderbird	2
4.2.1.	Charakterystyka rozwiązania	2
4.2.2.	Zarządzanie wieloma kontami	2
4.2.3.	Zalety rozwiązania	2
4.2.4.	Wady i ograniczenia	3
4.3.	Webowe aplikacje pocztowe (Gmail, Outlook.com)	3
4.3.1.	Charakterystyka rozwiązania	3
4.3.2.	Zarządzanie wieloma kontami	3
4.3.3.	Zalety rozwiązania	3
4.3.4.	Wady i ograniczenia	4
4.4.	Podsumowanie przeglądu	4
5.	Rozdział II – Protokoły pocztowe i technologia zarządzania mailem	7
5.1.	Protokół IMAP (Internet Message Access Protocol)	7
5.1.1.	Zasada działania protokołu IMAP	7
5.1.2.	Kluczowe cechy protokołu IMAP	7
5.1.3.	Protokół SMTP (Simple Mail Transfer Protocol)	9
5.1.4.	Zasada działania protokołu SMTP	9
5.1.5.	Standardy bezpieczeństwa w komunikacji pocztowej	10
5.1.6.	Szyfrowanie połączeń – TLS/SSL	10
5.1.7.	Mechanizmy uwierzytelniania	11
5.1.8.	Przechowywanie haseł w aplikacji	11
5.1.9.	Podsumowanie rozdziału	12
6.	Rozdział III Opis Wykorzystywanych technologii oraz narzędzi	13
7.	Omówienie zagadnienia …	35
7.1.	Podrozdział X	35
7.2.	Podrozdział Y	35
7.3.	Podrozdział Z	35
8.	Opis wykorzystanych technologii oraz narzędzi	37
8.1.	Technologia I	37
8.2.	Technologia II	37
8.3.	Technologia III	37
8.4.	Narzędzie I	37
8.5.	Narzędzie II	37
8.6.	Narzędzie III	37
9.	Założenia projektowe	39
9.1.	Wymagania funkcjonalne	39
9.2.	Wymagania niefunkcjonalne	39
9.3.	Diagram przypadków użycia	39
9.4.	Diagram klas	39
9.5.	Schemat bazy danych	39
9.6.	Projekt interfejsu	39
10.	Prezentacja projektu	41
10.1.	Działanie …	41
10.2.	Działanie …	41
10.3.	Działanie …	41
11.	Opis wybranych rozwiązań programistycznych	43
11.1.	Rozwiązanie …	43
11.2.	Rozwiązanie …	43
11.3.	Rozwiązanie …	43
Podsumowanie	45
Literatura	47
Dodatek 1. Zawartość płyty CD dołączonej do pracy	49
Spis rysunków	50
Spis tabel	51
Spis listingów	52
Streszczenie	53
Summary	54
Słowa kluczowe	55

 
1.	Wstęp

W aktualnych czasach poczta stała się nieodłącznym elementem zarówno życia prywatnego, jak i zawodowego. Zgodnie z raportem Radicati Group, liczba aktywnych kont pocztowych na świecie przekroczyła 4,3 miliarda w 2023 roku, a dziennie wysyłanych jest ponad 330 miliardów wiadomości e-mail. Coraz więcej użytkowników korzysta jednocześnie z wielu kont pocztowych – służbowego, prywatnego, a niekiedy również dodatkowych adresów przeznaczonych do komunikacji z różnymi serwisami internetowymi.
Niestety, zarządzanie wieloma kontami pocztowymi przy użyciu istniejących rozwiązań wiąże się z szeregiem niedogodności. Popularne aplikacje webowe, takie jak Gmail czy Outlook.com, wymagają ciągłego logowania się do różnych serwisów i przełączania między kartami przeglądarki. Tradycyjne klienty pocztowe, takie jak Microsoft Outlook czy Mozilla Thunderbird, oferują wprawdzie możliwość obsługi wielu kont w jednym miejscu, jednak charakteryzują się dużym zużyciem zasobów systemowych, skomplikowanym interfejsem oraz wymagają zakupu licencji dla pełnej funkcjonalności. Większość dostępnych rozwiązań nie oferuje wystarczającej elastyczności w zakresie personalizacji interfejsu, organizacji wiadomości czy ich filtrowania według indywidualnych potrzeb użytkownika.
W związku z powyższym, ciekawym wydaje się opracowanie lekkiej, webowej aplikacji do zarządzania wieloma kontami pocztowymi, która umożliwiałaby przeglądanie wszystkich wiadomości w jednym miejscu, oferowała zaawansowane funkcje organizacji i filtrowania korespondencji, zapewniała wysoki poziom bezpieczeństwa przechowywanych danych, a jednocześnie charakteryzowała się intuicyjnym i nowoczesnym interfejsem użytkownika. Taka aplikacja powinna wykorzystywać standardowe protokoły pocztowe IMAP i SMTP, co zapewniłoby kompatybilność z większością dostawców usług pocztowych, oraz być dostępna przez przeglądarkę internetową, co eliminuje konieczność instalacji dodatkowego oprogramowania na komputerze użytkownika.
Niniejsza praca przedstawia proces projektowania i implementacji takiego systemu – aplikacji webowej o nazwie "Patlook", która stanowi kompleksowe rozwiązanie do zarządzania wieloma kontami pocztowymi w jednym interfejsie. System został zbudowany w oparciu o nowoczesne technologie webowe: Node.js z frameworkiem Express.js po stronie serwera oraz bibliotekę React.js po stronie klienta, co zapewnia wysoką wydajność, skalowalność i przyjazny użytkownikowi interfejs.
2.	Cel pracy

 Celem niniejszej pracy jest zaprojektowanie i implementacja webowej aplikacji do zarządzania wieloma kontami pocztowymi, która umożliwi centralizację korespondencji elektronicznej w jednym interfejsie użytkownika. Problem, który rozwiązuje niniejsza praca, dotyczy fragmentacji komunikacji pocztowej współczesnych użytkowników, którzy zmuszeni są do korzystania z wielu niezależnych kont e-mail – służbowych, prywatnych oraz dodatkowych adresów przeznaczonych do komunikacji z różnymi serwisami internetowymi. Brak zunifikowanego narzędzia do zarządzania wieloma kontami prowadzi do obniżenia efektywności pracy oraz zwiększa ryzyko pominięcia istotnych wiadomości. Praca mieści się w dziedzinie inżynierii oprogramowania, ze szczególnym uwzględnieniem technologii webowych, protokołów komunikacji sieciowej oraz systemów zarządzania danymi.
Część teoretyczna pracy ma na celu przeprowadzenie przeglądu dostępnych rozwiązań do zarządzania pocztą elektroniczną, ze szczególnym uwzględnieniem ich funkcjonalności, zalet oraz ograniczeń. W ramach tej części dokonano analizy popularnych klientów pocztowych, takich jak Microsoft Outlook i Mozilla Thunderbird, oraz webowych interfejsów pocztowych oferowanych przez dostawców usług (Gmail, Outlook.com). Ponadto, w części teoretycznej przedstawiono fundamentalne protokoły komunikacji pocztowej – IMAP (Internet Message Access Protocol) służący do odbioru wiadomości oraz SMTP (Simple Mail Transfer Protocol) wykorzystywany do ich wysyłania. Omówiono również standardy bezpieczeństwa w komunikacji elektronicznej, w tym wykorzystanie szyfrowania TLS/SSL, mechanizmów uwierzytelniania oraz technik bezpiecznego przechowywania danych dostępowych. Ostatnim elementem części teoretycznej jest prezentacja wykorzystanych w projekcie technologii i narzędzi programistycznych, obejmująca środowisko Node.js z frameworkiem Express.js po stronie serwera, bibliotekę React.js do budowy interfejsu użytkownika, bazę danych SQLite, a także specjalistyczne biblioteki node-imap i nodemailer do obsługi protokołów pocztowych oraz narzędzia kryptograficzne bcrypt i JSON Web Token do zapewnienia bezpieczeństwa systemu.
Część praktyczna pracy obejmuje kompleksowy proces projektowania i implementacji systemu "Patlook". W pierwszej kolejności sformułowano założenia projektowe, definiując wymagania funkcjonalne (takie jak rejestracja użytkowników, dodawanie kont pocztowych, odbiór i wysyłanie wiadomości, system etykiet, filtrowanie i wyszukiwanie) oraz wymagania niefunkcjonalne (bezpieczeństwo, wydajność, użyteczność interfejsu). Zaprojektowano architekturę systemu w modelu trójwarstwowym klient-serwer z wykorzystaniem REST API jako warstwy komunikacyjnej, opracowano schemat relacyjnej bazy danych z mechanizmami izolacji danych między użytkownikami, oraz przygotowano projekt interfejsu użytkownika z uwzględnieniem zasad user experience. Następnie przeprowadzono implementację warstwy serwerowej, obejmującą system uwierzytelniania oparty na tokenach JWT, kontrolery zarządzające zasobami systemu (użytkownicy, konta pocztowe, wiadomości, etykiety), mechanizmy szyfrowania haseł użytkowników za pomocą algorytmu bcrypt oraz haseł do kont pocztowych z wykorzystaniem AES-256, a także integrację z zewnętrznymi serwerami pocztowymi poprzez protokoły IMAP i SMTP. Równolegle zrealizowano warstwę kliencką z responsywnym interfejsem użytkownika zbudowanym w technologii React.js, zawierającym komponenty do przeglądania i zarządzania wiadomościami, system organizacji korespondencji (etykiety, filtry, wyszukiwarka pełnotekstowa), funkcjonalność eksportu wiadomości do formatu PDF oraz obsługę trybu ciemnego (dark mode). Końcowym etapem części praktycznej jest prezentacja działania zaimplementowanego systemu oraz szczegółowy opis wybranych rozwiązań programistycznych, ze szczególnym uwzględnieniem mechanizmów uwierzytelniania i autoryzacji, technik szyfrowania danych wrażliwych, oraz implementacji systemu etykiet i filtrowania wiadomości.



3.	Zakres pracy
Zakres pracy obejmuje:
•	zebranie wiadomości z zakresu technologii webowych stosowanych w budowie aplikacji pocztowych, protokołów komunikacji pocztowej IMAP i SMTP, mechanizmów uwierzytelniania i szyfrowania danych w aplikacjach internetowych, oraz istniejących rozwiązań do zarządzania wieloma kontami pocztowymi,
•	porównanie popularnych aplikacji pocztowych, takich jak Microsoft Outlook, Mozilla Thunderbird, oraz webowych interfejsów pocztowych Gmail.com czy Outlook.com pod względem funkcjonalności, wymagań systemowych, bezpieczeństwa oraz możliwości zarządzania wieloma kontami w jednym interfejsie,
•	opracowanie architektury webowej aplikacji pocztowej w modelu trójwarstwowym klient-serwer, projektu relacyjnej bazy danych SQLite z mechanizmami izolacji danych między użytkownikami, specyfikacji wymagań funkcjonalnych i niefunkcjonalnych systemu, diagramów przypadków użycia oraz projektu interfejsu użytkownika z obsługą trybu ciemnego,
•	realizację w pełni funkcjonalnej aplikacji webowej "Patlook" z wykorzystaniem Node.js i Express.js po stronie serwera oraz React.js i TailwindCSS po stronie klienta, obejmującą implementację systemu rejestracji i uwierzytelniania użytkowników z tokenami JWT, modułu zarządzania kontami pocztowymi z szyfrowaniem haseł algorytmem AES-256, integracji z serwerami pocztowymi poprzez protokoły IMAP i SMTP z wykorzystaniem bibliotek node-imap i nodemailer, systemu etykiet i filtrowania wiadomości, wyszukiwarki pełnotekstowej, funkcjonalności eksportu wiadomości do formatu PDF oraz mechanizmów obsługi załączników.
W rozdziale 1 pracy opisano przegląd dostępnych rozwiązań do zarządzania pocztą elektroniczną, obejmujący analizę tradycyjnych klientów pocztowych Microsoft Outlook i Mozilla Thunderbird, webowych aplikacji pocztowych takich jak Gmail i Outlook.com, wraz z tabelarycznym zestawieniem ich zalet, wad oraz ograniczeń w kontekście zarządzania wieloma kontami pocztowymi. Rozdział drugi zawiera natomiast szczegółowe omówienie teoretycznych zagadnień związanych z protokołami pocztowymi – przedstawiono działanie protokołu IMAP odpowiedzialnego za odbiór i synchronizację wiadomości, protokołu SMTP wykorzystywanego do wysyłania korespondencji, oraz standardów bezpieczeństwa w komunikacji pocztowej, w tym szyfrowania TLS/SSL i mechanizmów uwierzytelniania PLAIN oraz LOGIN. Rozdział trzeci prezentuje wykorzystane w projekcie technologie oraz narzędzia programistyczne, w tym szczegółową charakterystykę środowiska Node.js z frameworkiem Express.js, biblioteki React.js wraz z frameworkiem TailwindCSS do budowy interfejsu użytkownika, bazy danych SQLite, specjalistycznych bibliotek node-imap i nodemailer do obsługi protokołów pocztowych, oraz narzędzi kryptograficznych bcrypt i jsonwebtoken zapewniających bezpieczeństwo systemu. Rozdział czwarty zawiera założenia projektowe, w tym szczegółową specyfikację wymagań funkcjonalnych (m.in. rejestracja użytkowników, zarządzanie kontami pocztowymi, odbiór i wysyłanie wiadomości, system etykiet) oraz wymagań niefunkcjonalnych (bezpieczeństwo, wydajność, użyteczność), diagram przypadków użycia ilustrujący interakcje użytkownika z systemem, model danych przedstawiający strukturę bazy danych wraz ze schematem relacji między tabelami, architekturę systemu w modelu trójwarstwowym z REST API jako warstwą komunikacyjną, oraz projekt interfejsu użytkownika z przykładowymi widokami ekranów. W rozdziale piątym zaprezentowano proces implementacji systemu "Wojtala - Program pocztowy", obejmujący realizację warstwy serwerowej z kontrolerami zarządzającymi uwierzytelnianiem, kontami pocztowymi, wiadomościami i etykietami, realizację warstwy klienckiej z komponentami React do przeglądania i zarządzania korespondencją, oraz szczegółowy opis integracji z serwerami pocztowymi poprzez protokoły IMAP i SMTP z obsługą różnych dostawców usług pocztowych. Rozdział szósty przedstawia opis wybranych rozwiązań programistycznych zastosowanych w projekcie, ze szczególnym uwzględnieniem mechanizmów uwierzytelniania i autoryzacji użytkowników z wykorzystaniem tokenów JWT, technik szyfrowania haseł użytkowników algorytmem bcrypt oraz haseł pocztowych z użyciem AES-256-CBC, a także implementacji systemu etykiet umożliwiającego kategoryzację wiadomości oraz zaawansowanych mechanizmów filtrowania i wyszukiwania pełnotekstowego w korespondencji.
 
4.	Rozdział I – Przegląd rozwiązań
W niniejszym rozdziale dokonano przeglądu najpopularniejszych rozwiązań służących do zarządzania pocztą elektroniczną, ze szczególnym uwzględnieniem ich funkcjonalności w kontekście obsługi wielu kont pocztowych jednocześnie. Przeanalizowano trzy główne kategorie aplikacji: tradycyjne klienty pocztowe typu desktop, webowe interfejsy pocztowe oraz nowoczesne aplikacje mobilne. Dla każdego z rozwiązań przedstawiono charakterystykę techniczną, możliwości zarządzania wieloma kontami, główne zalety oraz ograniczenia funkcjonalne i techniczne.
4.1.	Microsoft Outlook
W niniejszym podrozdziale przedstawiono analizę Microsoft Outlook, będącego jednym z najbardziej zaawansowanych klientów pocztowych dostępnych na rynku.
4.1.1.	Charakterystyka rozwiązania
Microsoft Outlook stanowi integralną część pakietu Microsoft Office i jest powszechnie wykorzystywany w środowiskach korporacyjnych. Aplikacja działa jako wielofunkcyjny klient desktopowy w systemach Windows i macOS, łącząc funkcje poczty elektronicznej, kalendarza, menedżera zadań oraz książki kontaktów. Outlook wspiera protokoły IMAP, POP3 oraz Exchange Server, oferując szeroką kompatybilność z różnymi dostawcami usług pocztowych.
4.1.2.	Zarządzanie wieloma kontami
Outlook umożliwia konfigurację wielu kont pocztowych w ramach jednego interfejsu użytkownika. Wiadomości mogą być przeglądane w oddzielnych folderach dla każdego konta lub w zunifikowanym widoku skrzynki odbiorczej. System pozwala na definiowanie odrębnych sygnatur dla poszczególnych kont, ustawianie domyślnego konta wysyłającego oraz tworzenie reguł filtrowania dedykowanych dla konkretnych adresów email.
4.1.3.	Zalety rozwiązania
Do głównych zalet Microsoft Outlook należą:
•	głęboka integracja z ekosystemem Microsoft 365, OneDrive, Teams oraz SharePoint,
•	zaawansowane funkcje kalendarza umożliwiające planowanie spotkań i udostępnianie harmonogramów,
•	pełne wsparcie dla Exchange Server w środowiskach korporacyjnych,
•	rozbudowany system reguł i automatyzacji przetwarzania wiadomości,
•	tryb offline zapewniający pełną funkcjonalność bez połączenia z internetem,
•	mechanizmy bezpieczeństwa korporacyjnego obejmujące szyfrowanie i polityki DLP.
4.1.4.	Wady i ograniczenia
Microsoft Outlook charakteryzuje się jednak istotnymi ograniczeniami:
•	wysokie wymagania sprzętowe dotyczące pamięci RAM i mocy procesora,
•	konieczność wykupienia płatnej subskrypcji Microsoft 365 dla pełnej funkcjonalności,
•	skomplikowany interfejs mogący być przytłaczający dla przeciętnych użytkowników,
•	brak natywnej wersji dla systemów Linux,
•	ograniczona personalizacja wizualna interfejsu użytkownika.
4.2.	Mozilla Thunderbird
W niniejszym podrozdziale omówiono Mozilla Thunderbird jako darmową, otwartoźródłową alternatywę dla komercyjnych klientów pocztowych.
4.2.1.	Charakterystyka rozwiązania
Mozilla Thunderbird to wieloplatformowa aplikacja desktopowa rozwijana przez Mozilla Foundation, dostępna dla systemów Windows, macOS oraz Linux. Aplikacja obsługuje protokoły IMAP, POP3 i SMTP, oferując podstawowe funkcje zarządzania pocztą elektroniczną, książkę adresową, kalendarz oraz czytnik RSS. Thunderbird charakteryzuje się modułową architekturą umożliwiającą rozszerzanie funkcjonalności za pomocą dodatków tworzonych przez społeczność.
4.2.2.	Zarządzanie wieloma kontami
Thunderbird umożliwia prostą konfigurację wielu kont pocztowych poprzez intuicyjny kreator, automatycznie wykrywający ustawienia serwera dla popularnych dostawców. Użytkownik może zarządzać kontami w ramach jednego interfejsu, przełączając się między nimi lub korzystając ze zunifikowanego widoku wszystkich wiadomości. System wspiera różne tożsamości dla pojedynczego konta, co umożliwia wysyłanie wiadomości z różnymi adresami nadawcy.
4.2.3.	Zalety rozwiązania
Główne zalety Mozilla Thunderbird obejmują:
•	całkowicie darmowy charakter i otwarty kod źródłowy,
•	silny nacisk na prywatność użytkowników i brak telemetrii,
•	natywne wsparcie dla wszystkich głównych systemów operacyjnych,
•	bogata biblioteka dodatków umożliwiających personalizację funkcjonalności,
•	niskie wymagania sprzętowe pozwalające na działanie na starszych komputerach,
•	łatwość importu i eksportu profili oraz wiadomości.

4.2.4.	Wady i ograniczenia
Mozilla Thunderbird posiada następujące ograniczenia:
•	przestarzały interfejs użytkownika w porównaniu do nowoczesnych rozwiązań,
•	brak natywnego kalendarza wymagającego instalacji dodatku Lightning,
•	ograniczona integracja z usługami chmurowymi,
•	wolniejsze tempo rozwoju projektu niż w przypadku komercyjnych alternatyw,
•	sporadyczne problemy z synchronizacją z niektórymi serwerami pocztowymi,
•	brak oficjalnej aplikacji mobilnej.

4.3.	Webowe aplikacje pocztowe (Gmail, Outlook.com)
W niniejszym podrozdziale przeanalizowano webowe interfejsy pocztowe oferowane bezpośrednio przez dostawców usług email.
4.3.1.	Charakterystyka rozwiązania
Webowe aplikacje pocztowe, takie jak Gmail i Outlook.com, działają w przeglądarce internetowej bez konieczności instalacji dodatkowego oprogramowania. Gmail oferuje 15 GB przestrzeni współdzielonej z Google Drive, zaawansowane mechanizmy filtrowania spamu oraz integrację z ekosystemem Google Workspace. Outlook.com zapewnia analogiczną pojemność, integrację z OneDrive i Skype oraz zaawansowane reguły filtrowania wiadomości.
4.3.2.	Zarządzanie wieloma kontami
Gmail umożliwia dodawanie zewnętrznych kont pocztowych poprzez funkcję importu z wykorzystaniem protokołu POP3, oraz konfigurację wysyłania wiadomości z innych adresów. Outlook.com oferuje podobną funkcjonalność podłączania zewnętrznych kont. Jednakże, zarządzanie wieloma niezależnymi kontami w ramach tego samego dostawcy wymaga ciągłego przełączania się między sesjami użytkownika.
4.3.3.	Zalety rozwiązania
Główne zalety webowych aplikacji pocztowych obejmują:
•	dostępność z dowolnego urządzenia z przeglądarką internetową,
•	brak konieczności instalacji i konfiguracji oprogramowania,
•	automatyczne aktualizacje interfejsu przez dostawcę usługi,
•	bezpośrednią integrację z usługami chmurowymi i narzędziami współpracy,
•	zaawansowane algorytmy filtrowania spamu oparte na uczeniu maszynowym,
•	darmowy dostęp do podstawowej funkcjonalności.
4.3.4.	Wady i ograniczenia
Webowe interfejsy pocztowe charakteryzują się następującymi ograniczeniami:
•	wymaganie stałego połączenia z internetem dla pełnej funkcjonalności,
•	potencjalne kwestie prywatności związane z analizą treści wiadomości,
•	ograniczone możliwości personalizacji interfejsu użytkownika,
•	fragmentacja przy zarządzaniu wieloma niezależnymi kontami,
•	zależność od dostawcy i brak pełnej kontroli nad danymi,
•	limity pojemności w bezpłatnych wersjach usług.
4.4.	Podsumowanie przeglądu
W niniejszym podrozdziale przedstawiono syntetyczne zestawienie przeanalizowanych rozwiązań oraz identyfikację luki rynkowej.
Przeprowadzona analiza wykazała, że każde z omówionych rozwiązań posiada zarówno mocne strony, jak i istotne ograniczenia w kontekście zarządzania wieloma kontami pocztowymi. Tradycyjne klienty desktopowe oferują szeroką funkcjonalność i tryb offline, lecz wymagają instalacji oraz zużywają znaczne zasoby systemowe. Webowe interfejsy zapewniają dostępność z dowolnego miejsca, ale fragmentują zarządzanie kontami i budzą wątpliwości dotyczące prywatności.
W tabeli 1 przedstawiono szczegółowe porównanie analizowanych rozwiązań według kluczowych kryteriów funkcjonalnych i technicznych.
Tabela 1. Porównanie rozwiązań do zarządzania pocztą elektroniczną
Lp.	Microsoft Outlook	Mozilla Thunderbird	Gmail/Outlook.com	Patlook
Kryterium	Desktop 	Desktop 	Webowa	Webowa
Koszt	Płatna subskrypcja 	Darmowa 	Darmowa	Darmowa 
Wieloplatformowość	Ograniczona 	Pełna	Pełna 	Pełna 
Wymagania sprzętowe	Wysokie	Niskie	Minimalne 	Minimalne 
Praca offline	Tak	Tak	Ograniczona	Nie
Zarządzanie wieloma kontami	Tak	Tak	Ograniczone	Tak 
Protokoły pocztowe	IMAP, POP3, Exchange	IMAP, POP3, SMTP	Własne API	IMAP, SMTP
Personalizacja interfejsu	Średnia	Wysoka 	Niska	Niska
Wyszukiwanie	Zaawansowane	Podstawowe	Zaawansowane 	Pełnotekstowe
Eksport wiadomości	TAK 	Tak 	Ograniczony	Tak 
Bezpieczeństwo	Wysokie 	Wysokie	Wysokie	Średnie 
Prywatność	Średnia	Wysoka	Niska 	Wysoka 

ŹRÓDŁO: OPRACOWANIE WŁASNE

Analiza przedstawiona w tabeli 1 wskazuje na istotną lukę rynkową w postaci lekkiej, webowej aplikacji pocztowej łączącej zalety różnych rozwiązań. Zaprojektowana i zaimplementowana w ramach niniejszej pracy aplikacja Patlook stanowi odpowiedź na zidentyfikowane ograniczenia, oferując ujednolicony widok wiadomości ze wszystkich kont, działanie w przeglądarce bez instalacji, wykorzystanie standardowych protokołów IMAP i SMTP oraz nacisk na bezpieczeństwo poprzez szyfrowanie danych i autentykację JWT.
 
5.	Rozdział II – Protokoły pocztowe i technologia zarządzania mailem
W niniejszym rozdziale przedstawiono fundamentalne protokoły komunikacyjne stanowiące podstawę wymiany wiadomości elektronicznych między serwerami pocztowymi oraz klientami użytkowników końcowych. Omówiono szczegółowo protokoły IMAP i SMTP, które zostały wykorzystane w implementacji systemu PatLook, oraz zaprezentowano standardy bezpieczeństwa stosowane w komunikacji pocztowej. Analiza obejmuje zasady działania protokołów, ich kluczowe cechy oraz praktyczne aspekty implementacji w kontekście zarządzania wieloma kontami pocztowymi.
5.1.	Protokół IMAP (Internet Message Access Protocol)
W niniejszym podrozdziale scharakteryzowano protokół IMAP jako standardowy mechanizm odbioru wiadomości e-mail z serwera pocztowego.
5.1.1.	Zasada działania protokołu IMAP
Protokół IMAP (Internet Message Access Protocol) w wersji IMAP4rev1, zdefiniowanej w dokumencie RFC 3501, stanowi standard komunikacyjny oparty na modelu klient-serwer, w którym wszystkie wiadomości są przechowywane centralnie na serwerze pocztowym. Komunikacja w protokole IMAP przebiega według następującej sekwencji: nawiązanie połączenia TCP na porcie 143 dla transmisji nieszyfrowanej lub porcie 993 dla połączeń zabezpieczonych SSL/TLS, uwierzytelnienie użytkownika za pomocą komend LOGIN lub AUTHENTICATE, wybór folderu pocztowego komendą SELECT lub EXAMINE, wykonywanie operacji na wiadomościach takich jak FETCH, SEARCH, STORE oraz COPY, a następnie zakończenie sesji komendą LOGOUT.
5.1.2.	Kluczowe cechy protokołu IMAP
Protokół IMAP charakteryzuje się następującymi właściwościami funkcjonalnymi:
•	synchronizacja wielourządzeniowa umożliwiająca dostęp do wiadomości z wielu klientów jednocześnie przy zachowaniu spójności stanów,
•	hierarchiczne zarządzanie strukturą folderów na serwerze pocztowym,
•	mechanizm częściowego pobierania wiadomości pozwalający na pobieranie wyłącznie nagłówków lub wybranych części treści,
•	możliwość wykonywania operacji wyszukiwania bezpośrednio na serwerze,
•	system flag standardowych oraz niestandardowych do oznaczania statusu wiadomości.
W tabeli 1 przedstawiono porównanie protokołów IMAP i POP3 według kluczowych kryteriów technicznych.
Tab. 1. Porównanie protokołów IMAP i POP3
Protokół	IMAP	POP3
Lokalizacja wiadomości	Na Serwerze	Lokalna
Synchronizacja	Tak	Nie
Zarządzanie folderami	Tak	Nie
Port(SSL/TLS)	993	995
ŹRÓDŁO: OPRACOWANIE WŁASNE
Implementacja w projekcie
W systemie PatLook protokół IMAP został zaimplementowany przy użyciu biblioteki node-imap w wersji 0.9.6. Listing 1 przedstawia konfigurację połączenia z serwerem IMAP.
Listing 1. Realizacja połączenia z serwerem IMAP
const Imap = require('node-imap');

const imapConfig = {
  user: account.username,
  password: decryptedPassword,
  host: account.imap_host,
  port: account.imap_port,
  tls: account.use_tls === 1,
  tlsOptions: { rejectUnauthorized: false },
  connTimeout: 15000,
  authTimeout: 15000
};

const imap = new Imap(imapConfig);

imap.once('ready', () => {
  imap.openBox('INBOX', true, (err, box) => {
    const fetch = imap.seq.fetch('1:50', {
      bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
      struct: true
    });
  });
});

imap.connect();

Na listingu Błąd! Nie można odnaleźć źródła odwołania. pokazano sposób realizacji połączenia z serwerem IMAP 
ŹRÓDŁO: OPRACOWANIE WŁASNE
5.1.3.	Protokół SMTP (Simple Mail Transfer Protocol)
W niniejszym podrozdziale omówiono protokół SMTP jako fundament infrastruktury wysyłania wiadomości elektronicznych.
5.1.4.	Zasada działania protokołu SMTP
Protokół SMTP (Simple Mail Transfer Protocol), zdefiniowany w RFC 5321, stanowi standard komunikacyjny służący do przesyłania wiadomości e-mail między serwerami pocztowymi oraz od klientów do serwerów. Proces wysyłania wiadomości obejmuje następujące etapy: nawiązanie połączenia TCP z serwerem na jednym z portów dedykowanych, identyfikację klienta komendą EHLO, opcjonalne uwierzytelnienie za pomocą mechanizmu SMTP AUTH, zdefiniowanie nadawcy i odbiorcy komendami MAIL FROM oraz RCPT TO, przesłanie treści wiadomości poprzez komendę DATA, oraz zakończenie sesji komendą QUIT.
Porty i tryby szyfrowania
Tab. 2. Porty SMTP i tryby szyfrowania
Port	Nazwa	Szyfrowanie
25	SMTP	Brak
465	SMTPS	SSL
587	Submission	STARTTLS
ŹRÓDŁO: OPRACOWANIE WŁASNE NA PODSTAWIE RFC 8314
Implementacja w projekcie
W systemie PatLook protokół SMTP został zaimplementowany przy użyciu biblioteki nodemailer w wersji 6.9.7. Listing 2 przedstawia konfigurację mechanizmu wysyłania wiadomości z obsługą załączników.
Listing 2. Wysyłanie wiadomości przez SMTP
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: account.smtp_host,
  port: account.smtp_port,
  secure: account.smtp_port === 465,  // SSL dla portu 465
  auth: {
    user: account.username,
    pass: decryptedPassword
  },
  tls: { rejectUnauthorized: false }
});

const mailOptions = {
  from: account.email,
  to: emailData.to,
  subject: emailData.subject,
  text: emailData.text,
  attachments: emailData.attachments.map(file => ({
    filename: file.originalname,
    content: file.buffer
  }))
};

const info = await transporter.sendMail(mailOptions);
console.log('Wysłano:', info.messageId);
Listing 2. Wysyłanie wiadomości przez SMTP
ŹRÓDŁO: OPRACOWANIE WŁASNE
Na listingu 2 pokazano sposób realizacji wysyłania wiadomości z automatycznym doborem trybu szyfrowania w zależności od numeru portu oraz obsługą wielu załączników.
5.1.5.	Standardy bezpieczeństwa w komunikacji pocztowej
W niniejszym podrozdziale omówiono mechanizmy zabezpieczające komunikację pocztową oraz metody ochrony danych uwierzytelniających.
5.1.6.	Szyfrowanie połączeń – TLS/SSL
Transport Layer Security stanowi protokół kryptograficzny zapewniający szyfrowanie danych przesyłanych między klientem a serwerem pocztowym, chroniąc przed podsłuchem oraz atakami typu man-in-the-middle. W komunikacji pocztowej stosowane są dwa tryby szyfrowania: Implicit TLS, w którym połączenie jest szyfrowane od momentu nawiązania na portach 465 i 993, oraz Explicit TLS realizowany poprzez mechanizm STARTTLS, gdzie połączenie rozpoczyna się w trybie nieszyfrowanym i przełącza się na szyfrowane po wydaniu odpowiedniej komendy na portach 143 i 587. W projekcie PatLook zaimplementowano obsługę obu trybów dla maksymalnej kompatybilności z różnymi dostawcami usług pocztowych.
5.1.7.	Mechanizmy uwierzytelniania
Rozszerzenie SMTP AUTH umożliwia uwierzytelnianie klienta przed wysłaniem wiadomości za pomocą różnych metod:
•	PLAIN – nazwa użytkownika i hasło w formacie base64, wymaga aktywnego szyfrowania TLS,
•	LOGIN – osobne przesyłanie danych uwierzytelniających, również z wymaganiem TLS,
•	CRAM-MD5 – mechanizm challenge-response z funkcją skrótu MD5, oferujący wyższy poziom bezpieczeństwa,
•	OAUTH2 – uwierzytelnianie oparte na tokenach, stosowane przez dostawców takich jak Google i Microsoft.
5.1.8.	Przechowywanie haseł w aplikacji
W systemie PatLook zastosowano dwupoziomowy model zabezpieczenia haseł. Hasła użytkowników do aplikacji są hashowane jednokierunkowo za pomocą algorytmu bcrypt z parametrem cost factor równym 10, co odpowiada 1024 iteracjom funkcji skrótu. Hasła do kont pocztowych wymagają szyfrowania symetrycznego algorytmem AES-256-CBC, ponieważ serwery pocztowe wymagają oryginalnego hasła w procesie uwierzytelniania. Listing 3 przedstawia implementację mechanizmu szyfrowania i deszyfrowania haseł pocztowych.
Listing 3. Szyfrowanie i deszyfrowanie haseł
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: account.smtp_host,
  port: account.smtp_port,
  secure: account.smtp_port === 465,  // SSL dla portu 465
  auth: {
    user: account.username,
    pass: decryptedPassword
  },
  tls: { rejectUnauthorized: false }
});

const mailOptions = {
  from: account.email,
  to: emailData.to,
  subject: emailData.subject,
  text: emailData.text,
  attachments: emailData.attachments.map(file => ({
    filename: file.originalname,
    content: file.buffer
  }))
};

const info = await transporter.sendMail(mailOptions);
console.log('Wysłano:', info.messageId);

ŹRÓDŁO: OPRACOWANIE WŁASNE
Na listingu 3 pokazano sposób realizacji szyfrowania symetrycznego z wykorzystaniem klucza derywowanego z sekretu JWT oraz stałego wektora inicjalizującego.
5.1.9.	Podsumowanie rozdziału
W niniejszym rozdziale przedstawiono fundamentalne protokoły komunikacji pocztowej stanowiące podstawę funkcjonowania systemu PatLook. Omówiono szczegółowo protokół IMAP jako mechanizm odbioru i synchronizacji wiadomości między wieloma urządzeniami oraz protokół SMTP służący do wysyłania korespondencji elektronicznej. Zaprezentowano sekwencje komunikacji dla obu protokołów wraz z praktycznymi przykładami implementacji w środowisku Node.js. Przeanalizowano standardy bezpieczeństwa, w tym mechanizmy szyfrowania TLS/SSL, metody uwierzytelniania SMTP AUTH oraz strategie bezpiecznego przechowywania danych uwierzytelniających. Zastosowane rozwiązania technologiczne zapewniają bezpieczną komunikację z serwerami pocztowymi różnych dostawców oraz skuteczną ochronę danych użytkowników zgodnie z aktualnymi standardami branżowymi.
6.	Rozdział III Opis Wykorzystywanych technologii oraz narzędzi
Realizacja systemu PatLook - aplikacji do zarządzania pocztą elektroniczną - wymagała doboru odpowiedniego stosu technologicznego, który zapewnia wysoką wydajność, bezpieczeństwo oraz możliwość łatwego rozszerzania funkcjonalności. W niniejszym rozdziale przedstawiono szczegółową charakterystykę wykorzystanych technologii oraz narzędzi programistycznych, wraz z uzasadnieniem dokonanego wyboru oraz analizą alternatywnych rozwiązań.
6.1.	Technologie serwerowe
Implementacja warstwy serwerowej aplikacji PatLook opiera się na środowisku Node.js oraz frameworku Express.js, które zapewniają asynchroniczne przetwarzanie żądań oraz obsługę protokołów pocztowych. Wybór ten umożliwia efektywne zarządzanie wieloma równoczesnymi połączeniami z serwerami IMAP i SMTP.

6.2.	Node.js

Node.js to środowisko uruchomieniowe JavaScript oparte na silniku V8 firmy Google, umożliwiające wykonywanie kodu JavaScript po stronie serwera [1]. Główną zaletą Node.js jest model nieblokujących operacji wejścia/wyjścia (non-blocking I/O), który wykorzystuje jednowątkową pętlę zdarzeń (event loop) do obsługi tysięcy równoczesnych połączeń [2].
Architektura Node.js opiera się na asynchronicznym modelu wykonywania kodu, w którym operacje I/O nie blokują głównego wątku aplikacji. Dzięki temu możliwe jest równoległe przetwarzanie wielu żądań bez konieczności tworzenia osobnych wątków dla każdego połączenia. Model ten sprawdza się szczególnie dobrze w aplikacjach sieciowych, gdzie większość czasu spędzana jest na oczekiwaniu na odpowiedzi z zewnętrznych systemów [3].
Ekosystem Node.js oferuje dostęp do menedżera pakietów NPM (Node Package Manager), który zawiera ponad 2 miliony pakietów open source [4]. Umożliwia to szybką integrację gotowych rozwiązań, takich jak biblioteki do obsługi protokołów pocztowych, baz danych czy mechanizmów autoryzacji.

W projekcie PatLook wykorzystano Node.js w wersji 18 LTS (Long Term Support), która zapewnia długoterminowe wsparcie oraz stabilność działania. Wersja ta oferuje pełną obsługę standardu ECMAScript 2022 oraz ulepszone mechanizmy zarządzania pamięcią.

Uzasadnienie wyboru: Node.js został wybrany ze względu na asynchroniczny model I/O, który idealnie nadaje się do aplikacji wymagających równoczesnej komunikacji z wieloma serwerami pocztowymi. Alternatywne rozwiązania, takie jak PHP z Apache czy Python z Django, wymagałyby zastosowania wielowątkowego modelu przetwarzania, co zwiększyłoby złożoność implementacji oraz zużycie zasobów systemowych. Dodatkową zaletą jest możliwość wykorzystania języka JavaScript zarówno po stronie serwera, jak i klienta, co upraszcza proces rozwoju aplikacji.
6.3.	Framework Express.js
Express.js to minimalistyczny framework webowy dla Node.js, zaprojektowany do tworzenia aplikacji internetowych oraz interfejsów API [5]. Framework dostarcza zestaw narzędzi do definiowania tras (routing), obsługi żądań HTTP oraz implementacji warstwy pośredniej (middleware).
Architektura Express.js opiera się na koncepcji middleware – funkcji przetwarzających żądania HTTP w określonej kolejności przed dotarciem do właściwej procedury obsługi (handler). Każda funkcja middleware może modyfikować obiekty żądania i odpowiedzi, zakończyć przetwarzanie żądania lub przekazać kontrolę do kolejnej funkcji w łańcuchu [6].

System routingu w Express.js umożliwia definiowanie tras dla różnych metod HTTP (GET, POST, PUT, DELETE, PATCH) oraz parametryzację ścieżek URL. Framework wspiera tworzenie modularnej struktury aplikacji poprzez możliwość grupowania tras w osobne moduły, co ułatwia zarządzanie kodem w większych projektach [7].
Listing 4. Przedstawia konfiugracje serwera Express.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/emails', require('./routes/emails'));
app.use('/api/labels', require('./routes/labels'));

// Obsługa błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Wystąpił błąd serwera' });
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
Na listingu 4 pokazano sposób konfiguracji serwera Express.js.
ŹRÓDŁO: OPRACOWANIE WŁASNE
W projekcie wykorzystano Express.js w wersji 4.18.2, która stanowi stabilną i szeroko stosowaną wersję frameworka.
Uzasadnienie wyboru: Express.js został wybrany ze względu na prostotę implementacji oraz elastyczność konfiguracji. Alternatywne frameworki, takie jak Fastify czy Koa.js, oferują lepszą wydajność, jednak Express.js zapewnia znacznie bogatszy ekosystem gotowych rozwiązań oraz szersze wsparcie społeczności deweloperskiej. Framework ten jest de facto standardem w środowisku Node.js dla aplikacji typu REST API.
6.4.	Technologie interfejsu użytkownika
Warstwa kliencka aplikacji PatLook została zaimplementowana z wykorzystaniem biblioteki React.js oraz frameworka stylów TailwindCSS. Rozwiązania te umożliwiają tworzenie dynamicznych, responsywnych interfejsów użytkownika z wykorzystaniem komponentowego paradygmatu programowania.
6.5.	Biblioteka React.js
React.js to biblioteka JavaScript do budowy interfejsów użytkownika, rozwijana przez Meta Platforms (dawniej Facebook) [8]. Architektura React.js opiera się na koncepcji komponentów – niezależnych, wielokrotnego użytku elementów interfejsu, które zarządzają własnym stanem oraz logiką renderowania.
Kluczowym mechanizmem React.js jest Virtual DOM – wirtualna reprezentacja struktury DOM, która umożliwia efektywne aktualizacje interfejsu. Mechanizm reconciliation porównuje poprzedni i aktualny stan Virtual DOM, identyfikuje różnice i dokonuje minimalnych zmian w rzeczywistym drzewie DOM [9]. Podejście to znacząco zwiększa wydajność renderowania w porównaniu z bezpośrednią manipulacją DOM.
React.js wykorzystuje składnię JSX (JavaScript XML), która pozwala na deklaratywne definiowanie struktury interfejsu bezpośrednio w kodzie JavaScript. Składnia ta jest następnie transpilowana do wywołań funkcji JavaScript przez narzędzia takie jak Babel [10].
Od wersji 16.8 React.js oferuje mechanizm hooków, który umożliwia wykorzystanie stanu i innych funkcjonalności w komponentach funkcyjnych bez konieczności tworzenia komponentów klasowych [11]. Podstawowe hooki to:
• useState – zarządzanie stanem komponentu
• useEffect – obsługa efektów ubocznych (pobieranie danych, subskrypcje)
• useContext – dostęp do kontekstu React
• useMemo i useCallback – optymalizacja wydajności poprzez memoizację
Listing 5. przedstawia implementację komponentu funkcyjnego wykorzystującego hooki do zarządzania stanem oraz efektami ubocznymi
import React, { useState, useEffect } from 'react';
import { emailsAPI } from '../services/api';

const EmailList = ({ accountId, onSelectEmail }) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmails = async () => {
      if (!accountId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await emailsAPI.getEmails(accountId, 'INBOX');
        setEmails(response.data.emails);
      } catch (err) {
        setError('Błąd podczas pobierania wiadomości');
        console.error('Błąd pobierania wiadomości:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEmails();
  }, [accountId]);

  if (loading) return <div>Ładowanie wiadomości...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="email-list">
      {emails.map(email => (
        <div
          key={email.uid}
          onClick={() => onSelectEmail(email)}
          className="email-item"
        >
          <strong>{email.from}</strong>
          <p>{email.subject}</p>
          <span>{new Date(email.date).toLocaleString('pl-PL')}</span>
        </div>
      ))}
    </div>
  );
};

export default EmailList;
Na listingu 5 pokazano sposób realizacji Komponent React.js z wykorzystaniem hooków useState i useEffect.
ŹRÓDŁO: OPRACOWANIE WŁASNE

W projekcie PatLook wykorzystano React.js w wersji 18.2.0, która wprowadza mechanizm Concurrent Rendering umożliwiający przerwanie i wznowienie renderowania komponentów, co poprawia responsywność aplikacji [12].

Uzasadnienie wyboru: React.js został wybrany jako najpopularniejsza biblioteka do budowy interfejsów użytkownika, zapewniająca bogate wsparcie społeczności oraz szeroki ekosystem narzędzi deweloperskich. Alternatywne rozwiązania, takie jak Vue.js czy Angular, oferują podobną funkcjonalność, jednak React.js charakteryzuje się większą elastycznością oraz lepszą integracją z narzędziami do zarządzania stanem aplikacji. Dodatkowo, komponentowy model programowania ułatwia utrzymanie i rozbudowę aplikacji.
6.6.	Framework TailwindCSS
TailwindCSS to framework CSS oparty na koncepcji utility-first, w której stylowanie odbywa się poprzez komponowanie predefiniowanych klas użytkowych bezpośrednio w znacznikach HTML [13]. Podejście to różni się od tradycyjnych frameworków CSS, takich jak Bootstrap, które dostarczają gotowe komponenty interfejsu użytkownika.
Architektura TailwindCSS opiera się na zestawie niskopoziomowych klas użytkowych, które reprezentują pojedyncze właściwości CSS (m-4 dla margin, bg-blue-500 dla koloru tła, flex dla display: flex). Deweloper komponuje te klasy, tworząc właściwy wygląd elementów interfejsu bezpośrednio w kodzie JSX [14].
Framework oferuje system konfiguracji oparty na pliku tailwind.config.js, który pozwala na dostosowanie palety kolorów, odstępów, breakpointów oraz innych aspektów designu. TailwindCSS automatycznie generuje jedynie te klasy, które są faktycznie wykorzystane w projekcie, co minimalizuje rozmiar finalnego pliku CSS [15].
System responsywności w TailwindCSS wykorzystuje prefiksy dla różnych breakpointów (sm:, md:, lg:, xl:, 2xl:), co umożliwia definiowanie różnych stylów dla poszczególnych rozmiarów ekranu. Framework oferuje również natywne wsparcie dla trybu ciemnego (dark mode) poprzez prefiks dark: [16].
Listing 6. przedstawia przykład komponentu wykorzystującego TailwindCSS do stylowania widoku wiadomości e-mail.
const EmailView = ({ email }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800
                    rounded-lg shadow-md">
      {/* Nagłówek wiadomości */}
      <div className="border-b border-gray-200 dark:border-gray-700
                      pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-900
                       dark:text-gray-100 mb-2">
          {email.subject}
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400
                        space-y-1">
          <p>
            <span className="font-medium">Od:</span> {email.from}
          </p>
          <p>
            <span className="font-medium">Data:</span>{' '} 
            {new Date(email.date).toLocaleString('pl-PL')}
          </p>
        </div>
      </div>

      {/* Treść wiadomości */}
      <div className="prose dark:prose-invert max-w-none mb-6">
        <div dangerouslySetInnerHTML={{
          __html: email.html || email.text
        }} />
      </div>

      {/* Przyciski akcji */}
      <div className="flex gap-2">
        <button className="bg-blue-500 hover:bg-blue-600
                           text-white font-medium px-4 py-2
                           rounded-lg transition-colors">
          Odpowiedz
        </button>
        <button className="bg-gray-200 hover:bg-gray-300
                           dark:bg-gray-700 dark:hover:bg-gray-600
                           text-gray-800 dark:text-gray-200
                           font-medium px-4 py-2 rounded-lg
                           transition-colors">
          Prześlij dalej
        </button>
      </div>
    </div>
  );
};
Na listingu 6 pokazano sposób realizacji Komponent React z wykorzystaniem klas TailwindCSS
ŹRÓDŁO: OPRACOWANIE WŁASNE
W projekcie PatLook wykorzystano TailwindCSS w wersji 3.3.5, która oferuje ulepszoną wydajność kompilacji oraz nowe klasy użytkowe.
TailwindCSS został wybrany ze względu na znaczące przyspieszenie procesu implementacji interfejsu użytkownika oraz eliminację konieczności pisania własnych plików CSS. Oferuje pełną elastyczność w kreowaniu unikalnego designu. Dodatkowo, mechanizm usuwania nieużywanych stylów zapewnia minimalny rozmiar finalnego pliku CSS w wersji produkcyjnej.
6.7.	System zarządzania bazą danych
Warstwa trwałości danych w aplikacji PatLook została zaimplementowana z wykorzystaniem systemu SQLite, który oferuje lekkie, wbudowane rozwiązanie bazodanowe bez konieczności instalacji osobnego serwera bazy danych.
SQLite to relacyjny system zarządzania bazą danych implementujący większość standardu SQL-92, który przechowuje całą bazę danych w pojedynczym pliku [17]. System ten nie wymaga osobnego procesu serwera – biblioteka SQLite jest bezpośrednio zintegrowana z aplikacją i wykonuje operacje bazodanowe w procesie aplikacji [18].
SQLite oferuje natywne typy danych (NULL, INTEGER, REAL, TEXT, BLOB) oraz mechanizmy integralności referencyjnej poprzez klucze obce. System wspiera tworzenie indeksów, widoków oraz wyzwalaczy dla implementacji złożonej logiki biznesowej [19].
Tabela 3.1 przedstawia strukturę relacyjną bazy danych wykorzystaną w projekcie PatLook.
Tab. 3. Struktura tabel w bazie danych SQLite
Tabela	Kolumny	Opis
Users	ID, E-mail, password, name, created at	Dane użytkowników systemu
email_accounts	id, user_id, email, provider, imap_host, imap_port, smtp_host, smtp_port, username, password, use_tls, created_at	Konta pocztowe użytkowników
labels	id, user_id, name, color, created_at	Etykiety do kategoryzacji wiadomości
email_labels	id, user_id, account_id, email_uid, label_id, created_at	Powiązania emaila z etykietą
folders	id, account_id, name, path	Cache folderów IMAP
ŹRÓDŁO: OPRACOWANIE WŁASNE
OBJAŚNIENIA: PK – KLUCZ GŁÓWNY (PRIMARY KEY), FK – KLUCZ OBCY (FOREIGN KEY)
Listing 7. Inicjalizacja bazy danych SQLite z utworzeniem struktury tabel
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err);
  } else {
    console.log('Połączono z bazą danych SQLite');
 }
});
// Włączenie obsługi kluczy obcych
db.run('PRAGMA foreign_keys = ON');
// Inicjalizacja struktury bazy danych
db.serialize(() => {
  // Tabela użytkowników
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  // Tabela kont pocztowych
  db.run(`
    CREATE TABLE IF NOT EXISTS email_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      email VARCHAR(255) NOT NULL,
      provider VARCHAR(50),
      imap_host VARCHAR(255) NOT NULL,
      imap_port INTEGER NOT NULL,
      smtp_host VARCHAR(255) NOT NULL,
      smtp_port INTEGER NOT NULL,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      use_tls BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE
   )
  `);
  // Tabela etykiet
  db.run(`
    CREATE TABLE IF NOT EXISTS labels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name VARCHAR(100) NOT NULL,
      color VARCHAR(20) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE,
      UNIQUE(user_id, name)
    )
  `);
  console.log('Struktura bazy danych utworzona pomyślnie');
});
module.exports = db;
Na listingu 7 pokazano sposób realizacji Inicjalizacji bazy danych SQLite z utworzeniem struktury tabel.
Źródło: opracowanie własne
W projekcie PatLook wykorzystano bibliotekę sqlite3 w wersji 5.1.6 dla Node.js, która oferuje natywne wiązania (bindings) do biblioteki SQLite.
Uzasadnienie wyboru: SQLite został wybrany ze względu na prostotę konfiguracji oraz wystarczającą wydajność dla aplikacji zarządzającej pocztą elektroniczną. System nie wymaga instalacji osobnego serwera bazy danych, co upraszcza proces wdrożenia aplikacji. Alternatywne rozwiązania, takie jak PostgreSQL czy MySQL, oferują lepszą wydajność w środowiskach wieloużytkownikowych, jednak wymagają dodatkowej infrastruktury oraz konfiguracji. W przypadku aplikacji desktopowej lub małych wdrożeń serwerowych SQLite stanowi optymalne rozwiązanie.
6.8.	Biblioteki do obsługi protokołów pocztowych
Implementacja komunikacji z serwerami pocztowymi w systemie PatLook wymaga zastosowania bibliotek obsługujących protokoły IMAP (odbieranie wiadomości) oraz SMTP (wysyłanie wiadomości). W projekcie wykorzystano biblioteki node-imap oraz nodemailer, które są de facto standardem w ekosystemie Node.js.
6.9.	Biblioteka node-imap
node-imap to biblioteka implementująca protokół IMAP4rev1 (Internet Message Access Protocol) zgodnie ze specyfikacją RFC 3501 [21]. Protokół IMAP umożliwia zdalny dostęp do wiadomości e-mail przechowywanych na serwerze pocztowym oraz zarządzanie strukturą folderów.
Biblioteka oferuje pełną obsługę operacji IMAP, w tym:
• Uwierzytelnianie przy użyciu różnych mechanizmów (PLAIN, LOGIN, CRAM-MD5)
• Szyfrowanie połączenia poprzez TLS/SSL
• Pobieranie struktury folderów (LIST, LSUB)
• Wyszukiwanie wiadomości po stronie serwera (SEARCH)
• Pobieranie nagłówków i treści wiadomości
• Zarządzanie flagami wiadomości (\Seen, \Flagged, \Deleted, \Answered)
• Operacje na folderach (CREATE, DELETE, RENAME)

Architektura biblioteki opiera się na strumieniach (streams) Node.js, co umożliwia efektywną obsługę dużych wiadomości bez konieczności wczytywania całej treści do pamięci. Biblioteka emituje zdarzenia dla różnych etapów komunikacji z serwerem, co pozwala na asynchroniczną obsługę operacji [22].
Listing 8. Przykład implementacji pobierania wiadomości IMAP
const Imap = require('node-imap');
const { simpleParser } = require('mailparser');
const connectIMAP = (config) => {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: config.username,
      password: config.password,
      host: config.imapHost,
      port: config.imapPort,
      tls: config.useTls,
      tlsOptions: { rejectUnauthorized: false }
    });
    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err, box) => {
        if (err) {
          reject(err);
          return;
        }
        const fetch = imap.seq.fetch('1:10', {
          bodies: '',
          struct: true
        });
        const messages = [];
        fetch.on('message', (msg, seqno) => {
        msg.on('body', (stream) => {
          simpleParser(stream, (err, parsed) => {
            if (!err) {
              messages.push({
                uid: seqno,
                subject: parsed.subject,
                from: parsed.from.text,
                date: parsed.date,
                text: parsed.text,
                html: parsed.html
            });
             }
            });
          });
        });
        fetch.once('end', () => {
        imap.end();
    resolve(messages);
    });
    });
    });
    imap.once('error', (err) => {
      reject(err);
    });
    imap.connect();
  });
};
Na listingu 8 pokazano sposób implementacji pobierania wiadomości IMAP
ŹRÓDŁO: OPRACOWANIE WŁASN
W projekcie PatLook wykorzystano node-imap w wersji 0.9.6 oraz bibliotekę mailparser w wersji 3.6.5 do parsowania zawartości wiadomości zgodnie ze standardem MIME.
6.10.	Biblioteka nodemailer
nodemailer to biblioteka umożliwiająca wysyłanie wiadomości e-mail poprzez protokół SMTP (Simple Mail Transfer Protocol) zgodnie ze specyfikacją RFC 5321 [23]. Protokół SMTP stanowi standard komunikacji między serwerami pocztowymi oraz między klientem a serwerem podczas wysyłania wiadomości.
Biblioteka nodemailer oferuje wysokopoziomowe API do komponowania i wysyłania wiadomości, obsługując:
• Uwierzytelnianie SMTP 
• Szyfrowanie STARTTLS oraz bezpośrednie połączenia TLS/SSL
• Wysyłanie wiadomości HTML oraz plain text
• Dołączanie załączników (pliki, obrazy osadzone)
• Obsługę wielu odbiorców
• Niestandardowe nagłówki wiadomości
• Wysyłanie za pośrednictwem różnych transportów
Architektura nodemailer wykorzystuje koncepcję transporterów (transporters), które stanowią abstrakcję dla różnych metod wysyłania wiadomości. Transporter SMTP jest najczęściej wykorzystywanym mechanizmem, który nawiązuje bezpośrednie połączenie z serwerem SMTP [24].
Listing 3. [Proszę kliknąć i wpisać opis listingu] 

Listing 9 przedstawia implementację wysyłania wiadomości e-mail z wykorzystaniem biblioteki nodemailer w aplikacji PatLook.
const nodemailer = require('nodemailer');
const sendEmail = async (config, mailOptions) => {
  // Konfiguracja transportera SMTP
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465,  // true dla portu 465
    auth: {
    user: config.username,
    pass: config.password
    },
    tls: {
    rejectUnauthorized: false
    }
  });
  // Weryfikacja połączenia
  try {
    await transporter.verify();
    console.log('Serwer SMTP gotowy do wysyłki');
  } catch (error) {
    console.error('Błąd konfiguracji SMTP:', error);
    throw error;
  }
  // Wysłanie wiadomości
  const info = await transporter.sendMail({
    from: mailOptions.from,
    to: mailOptions.to,
    cc: mailOptions.cc,
    bcc: mailOptions.bcc,
    subject: mailOptions.subject,
    text: mailOptions.text,
    html: mailOptions.html,
    attachments: mailOptions.attachments
  });
  console.log('Wiadomość wysłana:', info.messageId);
  return info;
};
// Przykład użycia w aplikacji PatLook
const config = {
  smtpHost: 'smtp.example.com',
  smtpPort: 587,
  username: 'user@example.com',
  password: 'password'
};

const mailOptions = {
  from: '"Użytkownik PatLook" <user@example.com>',
  to: 'recipient@example.com',
  subject: 'Test Email',
  text: 'Treść wiadomości w formacie tekstowym',
  html: '<p>Treść wiadomości w formacie <strong>HTML</strong></p>',
  attachments: [
    {
      filename: 'document.pdf',
      path: '/path/to/document.pdf'
    }
  ]
};
sendEmail(config, mailOptions)
.then(() => console.log('Wysłano pomyślnie'))
.catch(err => console.error('Błąd wysyłki:', err));
Na listingu 3 pokazano sposób realizacji [Proszę kliknąć i wpisać opis listingu] .
W projekcie PatLook wykorzystano nodemailer w wersji 6.9.7, która oferuje stabilne API oraz wsparcie dla nowoczesnych mechanizmów uwierzytelniania.

 Biblioteki node-imap i nodemailer zostały wybrane jako najbardziej dojrzałe i stabilne rozwiązania w ekosystemie Node.js dla obsługi protokołów pocztowych. Alternatywne biblioteki, takie jak imap-simple czy emailjs, oferują uproszczone API, jednak mają ograniczoną funkcjonalność oraz mniejsze wsparcie społeczności. node-imap i nodemailer zapewniają pełną kontrolę nad komunikacją z serwerami pocztowymi oraz są aktywnie rozwijane i utrzymywane.
6.11.	Mechanizmy bezpieczeństwa
Implementacja bezpiecznej aplikacji webowej wymaga zastosowania sprawdzonych mechanizmów kryptograficznych do ochrony danych użytkowników. W projekcie PatLook wykorzystano bibliotekę bcrypt do hashowania haseł oraz standard JWT dla implementacji mechanizmu autoryzacji.
6.11.1.	Biblioteka bcrypt
bcrypt to funkcja skrótu kryptograficznego zaprojektowana specjalnie do bezpiecznego przechowywania haseł, oparta na algorytmie szyfrowania Blowfish [25]. Główną cechą bcrypt jest celowo wolne działanie, które utrudnia przeprowadzenie ataków typu brute-force oraz rainbow tables.

Algorytm bcrypt wykorzystuje mechanizm soli czyli losowego ciągu znaków dodawanego do hasła przed obliczeniem skrótu. Sól jest generowana automatycznie dla każdego hasła i przechowywana razem z wynikowym skrótem. Mechanizm ten zapobiega sytuacji, w której dwa identyczne hasła generują ten sam skrót [26].
Parametr cost factor określa złożoność obliczeniową algorytmu poprzez liczbę iteracji. Wartość cost factor równa n oznacza 2^n iteracji algorytmu. Standardowa wartość wynosi 10, co zapewnia równowagę między bezpieczeństwem a wydajnością. Parametr ten może być zwiększany wraz z rozwojem mocy obliczeniowej komputerów [27].
Listing 10. [Proszę kliknąć i wpisać opis listingu] 
Listing 3.7 przedstawia implementację hashowania i weryfikacji haseł z wykorzystaniem biblioteki bcrypt w aplikacji PatLook.
const bcrypt = require('bcryptjs');

// Hashowanie hasła podczas rejestracji
const hashPassword = async (plainPassword) => {
  try {
    const saltRounds = 10;  // 2^10 = 1024 iteracji
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword, salt);

    console.log('Sól:', salt);
    console.log('Hash:', hash);
    return hash;
  } catch (error) {
    console.error('Błąd hashowania hasła:', error);
    throw error;
  }
};
// Weryfikacja hasła podczas logowania
const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error('Błąd weryfikacji hasła:', error);
    throw error;
 }
};

// Przykład użycia w kontrolerze rejestracji PatLook
const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  // Walidacja danych wejściowych
  if (!email || !password || password.length < 8) {
    return res.status(400).json({
      error: 'Hasło musi mieć minimum 8 znaków'
    });
  }
  // Hashowanie hasła
  const hashedPassword = await hashPassword(password);
  // Zapisanie użytkownika w bazie danych
  db.run(
    'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
    [email, hashedPassword, name],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Błąd rejestracji' });
      }
      res.status(201).json({
        message: 'Użytkownik zarejestrowany pomyślnie',
        userId: this.lastID
      });
    }
  );
};
ŹRÓDŁO: OPRACOWANIE WŁASNE

W projekcie PatLook wykorzystano bibliotekę bcryptjs w wersji 2.4.3, która stanowi implementację bcrypt w czystym JavaScript, nie wymagającą kompilacji natywnych modułów C++.
6.11.2.	JSON Web Token
JSON Web Token to otwarty standard RFC 7519 definiujący kompaktowy, samowystarczalny format przekazywania informacji między stronami w postaci obiektu JSON [28]. JWT jest powszechnie wykorzystywany do implementacji bezstanowej autoryzacji w aplikacjach webowych oraz API.
Struktura JWT składa się z trzech części zakodowanych w formacie Base64URL i rozdzielonych kropkami:
header.payload.signature

• Header (nagłówek) – zawiera typ tokenu (JWT) oraz algorytm podpisu (np. HS256, RS256)
• Payload (dane) – zawiera claims, czyli twierdzenia o użytkowniku (np. userId, email) oraz metadane tokenu (iat – issued at, exp – expiration)
• Signature (podpis) – kryptograficzny podpis obliczony z nagłówka, payloadu oraz tajnego klucza, zapewniający integralność tokenu
Mechanizm działania JWT w aplikacji PatLook opiera się na weryfikacji podpisu cyfrowego. Serwer generuje token po pomyślnym uwierzytelnieniu użytkownika, kodując w nim identyfikator oraz uprawnienia. Token jest następnie przesyłany do klienta, który dołącza go do każdego żądania HTTP w nagłówku Authorization. Serwer weryfikuje podpis tokenu bez konieczności odpytywania bazy danych, co czyni mechanizm bezstanowym [29].
W projekcie PatLook wykorzystano bibliotekę jsonwebtoken w wersji 9.0.2, która oferuje pełną obsługę standardu JWT oraz różnych algorytmów podpisu.
Uzasadnienie wyboru: JWT został wybrany jako mechanizm autoryzacji ze względu na bezstanowy charakter, który eliminuje konieczność przechowywania sesji po stronie serwera. Alternatywne rozwiązania, takie jak sesje serwerowe (express-session) lub OAuth 2.0, wymagają utrzymywania stanu po stronie serwera lub integracji z zewnętrznymi dostawcami tożsamości. JWT oferuje prostotę implementacji przy zachowaniu wysokiego poziomu bezpieczeństwa, co jest optymalne dla aplikacji o niewielkiej i średniej skali.
6.12.	Środowisko deweloperskie i narzędzia pomocnicze
Efektywny proces rozwoju aplikacji PatLook wymaga zastosowania odpowiednich narzędzi deweloperskich wspierających pisanie kodu, debugowanie, testowanie oraz zarządzanie zależnościami. W projekcie wykorzystano zestaw narzędzi standardowych dla ekosystemu Node.js oraz React.js.
Tab. 4. Wykorzystane narzędzia deweloperskie
Narzędzia	Wersja	Przeznaczenie
Visual Studio Code	1.85+	Edytor kodu z rozszerzeniami
Git	2.40+	System kontroli wersji
Postman	10.0+	Testowanie API REST
Chrome DevTools	-	Debugowanie aplikacji frontend
DB Browser for SQLite	3.12+	Przeglądanie bazy danych
nodemon	3.0.2	Hot reload w development

Oprócz głównych narzędzi deweloperskich, projekt PatLook wykorzystuje zestaw bibliotek pomocniczych, które rozszerzają funkcjonalność backendu oraz frontendu:
Backend:
• cors (v2.8.5) – middleware Express.js obsługujący Cross-Origin Resource Sharing, umożliwiający komunikację między frontendem a backendem działającymi na różnych domenach
• body-parser (v1.20.2) – middleware parsujący body żądań HTTP w formatach JSON oraz URL-encoded
• dotenv (v16.3.1) – biblioteka do zarządzania zmiennymi środowiskowymi z pliku .env
• multer (v2.0.2) – middleware obsługujący upload plików przez formularze multipart/form-data

Frontend:
• axios (v1.6.2) – klient HTTP oparty na Promise, wykorzystywany do komunikacji z API
• react-router-dom (v6.20.0) – biblioteka do implementacji routingu w aplikacji SPA
• jspdf (v4.0.0) – biblioteka do generowania dokumentów PDF po stronie klienta

Struktura projektu PatLook została zaprojektowana zgodnie z zasadą separacji odpowiedzialności (Separation of Concerns). Backend podzielony jest na warstwy: routing (routes), logika biznesowa (controllers), dostęp do danych (models) oraz konfiguracja (config). Frontend wykorzystuje komponentową architekturę React.js z podziałem na komponenty wielokrotnego użytku (components), strony (pages), oraz logikę współdzieloną (context, services).

 
6.13.	PODSUMOWANIE
W rozdziale przedstawiono szczegółową charakterystykę stosu technologicznego wykorzystanego do implementacji systemu PatLook – aplikacji do zarządzania pocztą elektroniczną. Wybrane technologie tworzą spójny ekosystem oparty na języku JavaScript, co znacząco ułatwia proces rozwoju aplikacji full-stack.

Warstwa serwerowa oparta na Node.js i Express.js zapewnia asynchroniczną obsługę operacji I/O, co jest kluczowe dla aplikacji intensywnie komunikującej się z serwerami pocztowymi. Wykorzystanie bibliotek node-imap oraz nodemailer umożliwia pełną implementację protokołów IMAP i SMTP zgodnie z obowiązującymi standardami RFC.

Warstwa kliencka zbudowana z wykorzystaniem React.js oraz TailwindCSS oferuje nowoczesny, responsywny interfejs użytkownika z wysoką wydajnością renderowania. Zastosowanie komponentowej architektury ułatwia utrzymanie i rozbudowę aplikacji.

System zarządzania bazą danych SQLite zapewnia prostotę wdrożenia przy zachowaniu mechanizmów ACID oraz integralności referencyjnej. Rozwiązanie to jest optymalne dla aplikacji o małej i średniej skali użytkowników.

Mechanizmy bezpieczeństwa oparte na bcrypt oraz JWT gwarantują odpowiednią ochronę danych uwierzytelniających użytkowników. Hashowanie haseł z wykorzystaniem adaptacyjnej funkcji skrótu oraz bezstanowa autoryzacja poprzez tokeny JWT stanowią sprawdzone rozwiązania w aplikacjach webowych.

Przedstawiony stos technologiczny stanowi solidną podstawę dla systemu PatLook, oferując równowagę między funkcjonalnością, wydajnością oraz prostotą implementacji.
 
7.	Rozdział IV - Założenia projektowe
Proces projektowania systemu PatLook rozpoczął się od zdefiniowania wymagań funkcjonalnych i niefunkcjonalnych, które determinują zakres funkcjonalności oraz cechy jakościowe aplikacji. Na podstawie zebranych wymagań opracowano diagramy przypadków użycia, zaprojektowano strukturę bazy danych oraz określono architekturę systemu w modelu trójwarstwowym klient-serwer.
7.1.	Wymagania funkcjonalne
Wymagania funkcjonalne określają, co system powinien umożliwiać użytkownikom. Specyfikacja wymagań funkcjonalnych dla systemu PatLook obejmuje funkcje związane z zarządzaniem użytkownikami, kontami pocztowymi, wiadomościami e-mail oraz mechanizmami organizacji korespondencji.
Moduł zarządzania użytkownikami
System umożliwia rejestrację nowego użytkownika poprzez podanie imienia, adresu e-mail oraz hasła. Hasła są hashowane algorytmem bcrypt z parametrem cost factor równym 10 przed zapisem w bazie danych. Po pomyślnym uwierzytelnieniu system generuje token JWT o czasie ważności 7 dni, który jest przechowywany w localStorage przeglądarki. System umożliwia wylogowanie poprzez usunięcie tokenu JWT i przekierowanie do strony logowania.
7.1.1.	Moduł zarządzania kontami pocztowymi
System umożliwia dodawanie kont pocztowych z automatyczną konfiguracją dla popularnych dostawców usług pocztowych, takich jak Gmail, Onet, WP oraz Interia. Użytkownik ma możliwość ręcznej konfiguracji konta z podaniem adresów serwerów IMAP i SMTP oraz numerów portów. Hasła do kont pocztowych są szyfrowane algorytmem AES-256-CBC przed zapisem w bazie danych. System wyświetla listę wszystkich kont użytkownika oraz umożliwia usuwanie kont z potwierdzeniem operacji. Funkcja "Wszystkie wiadomości" prezentuje zunifikowany widok wiadomości ze wszystkich skonfigurowanych kont.
7.1.2.	Moduł poczty elektronicznej
System pobiera wiadomości z folderów INBOX, Sent oraz Trash z limitem 50 wiadomości na folder. Lista wiadomości zawiera informacje o nadawcy, temacie, dacie, statusie przeczytania oraz flagach ważności. Wiadomości są sortowane według statusu przeczytania (nieprzeczytane na górze) oraz daty (najnowsze pierwsze). System wyświetla szczegóły wiadomości wraz z załącznikami i automatycznie oznacza wiadomość jako przeczytaną przy jej otwarciu.
System umożliwia tworzenie nowej wiadomości z określeniem odbiorcy, tematu oraz treści. Użytkownik może dodać załączniki z ograniczeniem do 5 plików o maksymalnym rozmiarze 10 MB każdy. Wiadomości są wysyłane przez protokół SMTP z automatycznym zapisem kopii w folderze "Wysłane". System obsługuje odpowiadanie na wiadomości z automatycznym uzupełnieniem adresu odbiorcy i prefiksem "RE:" w temacie oraz przekazywanie wiadomości z prefiksem "FW:".
Użytkownik może oznaczać wiadomości jako przeczytane lub nieprzeczytane poprzez flagę \Seen oraz jako ważne poprzez flagę \Flagged. System umożliwia przenoszenie wiadomości do kosza, trwałe usuwanie oraz opróżnianie całego kosza.
7.1.3.	Moduł filtrowania i etykiet
System oferuje filtrowanie wiadomości według statusu: wszystkie, nieprzeczytane, przeczytane oraz ważne. Wyszukiwanie pełnotekstowe obejmuje temat, nadawcę oraz treść wiadomości z wyświetleniem licznika wyników. Użytkownik może filtrować wiadomości według przypisanej etykiety.
System umożliwia tworzenie etykiet z określeniem nazwy i koloru, przypisywanie wielu etykiet do pojedynczej wiadomości oraz usuwanie etykiet i ich przypisań. Etykiety są wyświetlane w formie kolorowych znaczników (badges) przy wiadomościach.
7.1.4.	Funkcje dodatkowe
System oferuje tryb ciemny (Dark Mode) z zachowaniem preferencji użytkownika w localStorage. Użytkownik może eksportować wiadomości do formatu PDF zawierającego metadane, etykiety, informacje o załącznikach oraz treść wiadomości. System umożliwia ręczne odświeżanie listy wiadomości oraz odświeżanie całej aplikacji poprzez kliknięcie w logo.
7.2.	Wymagania niefunkcjonalne
Wymagania niefunkcjonalne określają cechy jakościowe systemu PatLook, obejmujące aspekty bezpieczeństwa, wydajności, użyteczności oraz skalowalności.
 
7.2.1.	Bezpieczeństwo
Hasła użytkowników systemu są hashowane algorytmem bcrypt z 10 rundami iteracji. Hasła do kont pocztowych są szyfrowane algorytmem AES-256-CBC z kluczem derywowanym z JWT_SECRET przy użyciu funkcji scrypt. Uwierzytelnianie opiera się na tokenach JWT z czasem ważności 7 dni, przesyłanych w nagłówku Authorization z prefiksem Bearer. Komunikacja z serwerami pocztowymi wykorzystuje szyfrowanie TLS/SSL na portach 465, 587 oraz 993. Izolacja danych użytkowników jest zapewniona poprzez warunek WHERE user_id we wszystkich zapytaniach SQL oraz kaskadowe usuwanie powiązanych rekordów (ON DELETE CASCADE).
7.2.2.	Wydajność
Operacje bazodanowe wykonywane są w czasie poniżej 100 ms. Pobieranie wiadomości z serwera IMAP następuje w czasie poniżej 15 sekund z ustawionym timeoutem 15 sekund. System wykorzystuje asynchroniczne operacje wejścia/wyjścia z użyciem konstrukcji async/await oraz Promise.all dla równoległego wykonywania niezależnych operacji. Limit 50 wiadomości na folder zapewnia szybkie ładowanie interfejsu.
7.2.3.	Użyteczność i dostępność
Interfejs użytkownika został zaprojektowany zgodnie z zasadami Material Design, zapewniając intuicyjną obsługę. Responsywny layout zaimplementowany z wykorzystaniem TailwindCSS dostosowuje się do różnych rozmiarów ekranu. System wyświetla czytelne komunikaty błędów informujące użytkownika o problemach. Aplikacja jest kompatybilna z przeglądarkami Chrome 90+, Firefox 88+, Edge 90+ oraz Safari 14+. Dostęp do systemu odbywa się przez przeglądarkę internetową bez konieczności instalacji dedykowanego oprogramowania. System działa na platformach Windows, macOS oraz Linux.
7.2.4.	Skalowalność i niezawodność
Baza danych SQLite jest przeznaczona dla małych i średnich instalacji obsługujących do około 100 użytkowników. Architektura systemu umożliwia migrację do baz PostgreSQL lub MySQL w przypadku większych wdrożeń. Timeout 15 sekund dla połączeń IMAP i SMTP zapobiega zawieszaniu się aplikacji przy problemach z serwerami pocztowymi. Transakcje bazodanowe zapewniają spójność danych zgodnie z właściwościami ACID.
7.2.5.	Schemat bazy danych
Relacyjny model bazy danych systemu PatLook składa się z czterech tabel połączonych kluczami obcymi. Struktura bazy zapewnia integralność referencyjną oraz kaskadowe usuwanie powiązanych rekordów.
7.2.6.	Architektura systemu
System PatLook wykorzystuje architekturę trójwarstwową klient-serwer z interfejsem REST API. Architektura ta zapewnia separację odpowiedzialności między warstwą prezentacji, logiką biznesową oraz warstwą danych.
Warstwa prezentacji (frontend) została zaimplementowana z wykorzystaniem biblioteki React.js w wersji 18.2 oraz frameworka TailwindCSS w wersji 3.3. Warstwa ta odpowiada za renderowanie interfejsu użytkownika, obsługę interakcji oraz komunikację z backendem poprzez klienta HTTP Axios. Główne komponenty warstwy prezentacji obejmują strony (Login, Register, Dashboard), komponenty interfejsu (EmailList, EmailView, ComposeEmail) oraz konteksty zarządzające stanem (AuthContext, ThemeContext).
Warstwa logiki biznesowej (backend) została zaimplementowana z wykorzystaniem środowiska Node.js w wersji 18+ oraz frameworka Express.js w wersji 4.18. Warstwa ta odpowiada za przetwarzanie żądań HTTP, implementację logiki biznesowej, komunikację z bazą danych oraz zewnętrznymi serwerami pocztowymi. Struktura backendu obejmuje trasy API (/api/auth, /api/accounts, /api/emails, /api/labels), kontrolery obsługujące logikę biznesową, middleware (autoryzacja JWT, CORS, parsowanie body) oraz modele danych.
Warstwa danych obejmuje bazę danych SQLite w wersji 5.1 przechowującą dane użytkowników, kont pocztowych, etykiet oraz przypisań, a także zewnętrzne serwery pocztowe komunikujące się z systemem poprzez protokoły IMAP (port 993) oraz SMTP (porty 465 i 587).

Przepływ danych w systemie PatLook przebiega zgodnie z modelem żądanie-odpowiedź charakterystycznym dla architektury REST. Przykładowy przepływ dla operacji pobierania wiadomości przedstawia się następująco:
1. Użytkownik klika na konto pocztowe w interfejsie, co wywołuje funkcję emailsAPI.getEmails(accountId) w warstwie prezentacji.
2. Klient Axios wysyła żądanie GET /api/emails/:accountId z nagłówkiem Authorization: Bearer <token> do warstwy logiki.
3. Middleware autoryzacji weryfikuje token JWT i ekstrahuje identyfikator użytkownika.
4. Kontroler emailController pobiera konfigurację konta z bazy danych poprzez zapytanie SQL z warunkiem user_id.
5. System deszyfruje hasło do konta pocztowego przy użyciu algorytmu AES-256-CBC.
6. Backend nawiązuje połączenie z serwerem IMAP i pobiera wiadomości z wybranego folderu.
7. Biblioteka mailparser parsuje surowe wiadomości do formatu JSON.
8. Backend zwraca odpowiedź JSON zawierającą tablicę wiadomości do warstwy prezentacji.
9. Komponent EmailList aktualizuje stan poprzez setEmails() i renderuje listę wiadomości.
7.3.	Projekt interfejsu użytkownika
Interfejs użytkownika systemu PatLook został zaprojektowany z uwzględnieniem zasad użyteczności oraz współczesnych standardów projektowania aplikacji webowych. Główny ekran aplikacji (Dashboard) wykorzystuje trójkolumnowy layout zapewniający efektywne wykorzystanie przestrzeni ekranu.
Lewa kolumna zawiera listę skonfigurowanych kont pocztowych oraz opcję dodania nowego konta. Środkowa kolumna prezentuje listę wiadomości z wybranego konta wraz z paskiem wyszukiwania i filtrami. Prawa kolumna wyświetla szczegóły wybranej wiadomości wraz z przyciskami akcji.
7.4.	PODSUMOWANIE
W rozdziale przedstawiono założenia projektowe systemu PatLook obejmujące specyfikację wymagań funkcjonalnych oraz niefunkcjonalnych. Wymagania funkcjonalne zdefiniowano w czterech modułach: zarządzanie kontami pocztowymi, obsługa poczty elektronicznej, filtrowanie i etykiety oraz funkcje dodatkowe. Wymagania niefunkcjonalne określono w czterech kategoriach: bezpieczeństwo, wydajność, użyteczność i dostępność oraz skalowalność i niezawodność.
ano trójkolumnowy interfejs użytkownika z obsługą trybu jasnego i ciemnego.
Opracowane założenia projektowe stanowią podstawę do implementacji systemu PatLook przedstawionej w kolejnym rozdziale pracy.
 
8.	 Rozdział V – Prezentacja Aplikacji
 	Rozdział przedstawia finalną wersję aplikacji PatLook z perspektywy użytkownika końcowego. Zaprezentowano w nim poszczególne ekrany aplikacji wraz z opisem ich funkcjonalności, co pozwala na kompleksowe zrozumienie możliwości systemu. Rozdział zawiera również zrzuty ekranu dokumentujące wygląd interfejsu użytkownika oraz instrukcje dotyczące wykonania dodatkowych screenshotów na potrzeby dokumentacji.
8.1.	Ekran logowania i rejestracji
Pierwszym widokiem, z którym spotyka się użytkownik po uruchomieniu aplikacji, jest ekran logowania. Formularz logowania zawiera pola do wprowadzenia nazwy użytkownika oraz hasła, a także link umożliwiający przejście do formularza rejestracji dla nowych użytkowników.
Ekran rejestracji pozwala na utworzenie nowego konta w systemie poprzez podanie unikalnej nazwy użytkownika, hasła oraz opcjonalnie imienia i nazwiska. Po pomyślnej rejestracji konto użytkownika zostaje utworzone i dodane do bazy danych
Ekran Logowania:
 
Rysunek 8.1.1 Panel Logowania
Rejestracja:
 
Rysunek 8.2 Panel Rejestracji
8.2.	Główny panel aplikacji
Po zalogowaniu użytkownik zostaje przekierowany do głównego panelu aplikacji, który stanowi centralny punkt zarządzania pocztą elektroniczną. Interfejs został zaprojektowany w układzie trójpanelowym, wzorowanym na popularnych klientach poczty elektronicznej, co zapewnia intuicyjność obsługi.
Panel boczny znajdujący się po lewej stronie ekranu zawiera listę wszystkich dodanych kont pocztowych oraz opcję wyświetlenia wiadomości ze wszystkich kont jednocześnie. Środkowy panel prezentuje listę wiadomości email z wybranego konta, zawierając informacje o nadawcy, temacie, dacie oraz statusie przeczytania. Prawy panel służy do wyświetlania szczegółowej treści wybranej wiadomości wraz z opcjami odpowiedzi, przekazania i usunięcia.
 
Rysunek 8.3 Główny panel w wersji jasnej.
 
Rysunek 8.4 Główny Panel w wersji ciemnej.
8.3.	Pasek nawigacji i zarządzanie motywem
Górny pasek nawigacji aplikacji zawiera logo "PatLook", informację o zalogowanym użytkowniku oraz zestaw przycisków funkcyjnych. Użytkownik ma możliwość przełączania między trybem jasnym a ciemnym, co zwiększa komfort korzystania z aplikacji w różnych warunkach oświetleniowych. Dodatkowo dostępne są przyciski szybkiego dostępu do zarządzania etykietami i kontami pocztowymi.
 
Rysunek 8.5 Pasek nawigacji aplikacji.
8.4.	Obsługa folderów i filtrowanie wiadomości
Aplikacja obsługuje trzy podstawowe foldery dla każdego konta pocztowego: Odebrane, Wysłane oraz Kosz. System automatycznie mapuje nazwy folderów dla różnych dostawców poczty, uwzględniając różnice w nazewnictwie między Gmail, Outlook, Onet, WP, Interia i innymi.

Dodatkowo użytkownik może filtrować wiadomości według statusu: wszystkie, nieodczytane, odczytane lub ważne. Pasek wyszukiwania umożliwia szybkie znajdowanie wiadomości na podstawie tematu, nadawcy lub treści.
 
Rysunek 8.6 Filtrowanie oraz wyszukiwanie wiadomości.
8.5.	Tworzenie i wysyłanie wiadomości
Formularz tworzenia nowej wiadomości otwiera się w oknie modalnym i zawiera wszystkie niezbędne pola: wybór konta nadawcy, adres odbiorcy, temat oraz treść wiadomości. Aplikacja obsługuje załączniki o maksymalnym rozmiarze 10MB, z limitem 5 plików na wiadomość.
Funkcje odpowiedzi i przekazania automatycznie wypełniają odpowiednie pola formularza, dodając prefiks "RE:" lub "FW:" do tematu oraz cytując treść wiadomości.
 
Rysunek 8.7 Wysyłanie wiadomości.
 
Rysunek 8.8 Wysyłanie wiadomości z wyborem konta do wysłania.
 
Rysunek 8.9 Wiadomość z załącznikiem.
 
Rysunek 8.10 Przesłanie wiadomości dalej.
 
Rysunek 8.11 Odpowiedź na wiadomość.
8.6.	System etykiet
Aplikacja oferuje rozbudowany system etykiet umożliwiający kategoryzowanie wiadomości. Użytkownik może tworzyć własne etykiety z indywidualną nazwą i kolorem, przypisywać je do wiadomości oraz filtrować skrzynkę według wybranych etykiet. Menedżer etykiet dostępny jest z poziomu górnego paska nawigacji.
 
Rysunek 8.12 Tworzenie etykiety oraz wybieranie koloru.
.
 
Rysunek 8.13 Wiadomość z etykietą.
 
Rysunek 8.14 Lista etykiet.
 
Rysunek 8.15 Etykiety po filtrach.
8.7.	Zarządzanie kontami pocztowymi
Modal zarządzania kontami wyświetla listę wszystkich dodanych kont wraz z informacjami o dostawcy oraz konfiguracją serwerów IMAP/SMTP. Aplikacja wspiera automatyczne wykrywanie ustawień dla popularnych dostawców poczty, co znacznie upraszcza proces dodawania nowego konta.
 
Rysunek 8.16 Przykładowe dodanie konta Onet.
 
Rysunek 8.17 Dodanie konta ręcznie.
 
Rysunek 8.18 Odpowiedź na wiadomość
Pozostałe przykłady funkjonalności
 
Rysunek 8.19 Komunikat po eksporcie mail do pdf.
 
Rysunek 8.20 Komunikat po przeniesieniu do kosza.
 
Rysunek 8.21 Zakładka „Moje Konta”
 
Rysunek 8.22 Odebrane wiadomości Gmail.
 
Rysunek 8.23 Odebrane wiadomości Interia.
 
Rysunek 8.24 Odebrane wiadomości Onet.
8.8.	Podsumowanie aplikacji.
Aplikacja PatLook stanowi kompletne rozwiązanie do zarządzania wieloma kontami pocztowymi z jednego miejsca. Interfejs użytkownika został zaprojektowany z myślą o intuicyjności obsługi, estetyce oraz funkcjonalności porównywalnej z komercyjnymi klientami poczty elektronicznej. Wsparcie dla trybu ciemnego, system etykiet oraz automatyczne mapowanie folderów dla różnych dostawców poczty świadczy o spełnieniu potrzeb użytkowników; prosta, czytelna i funkcjonalna aplikacja która ułatwia „internetowe życie”.
