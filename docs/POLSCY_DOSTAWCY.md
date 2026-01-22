# Konfiguracja polskich dostawców email

## 📧 Onet.pl

### Konfiguracja automatyczna
- W aplikacji wybierz **"Onet"** z listy dostawców
- Pola IMAP/SMTP wypełnią się automatycznie

### Dane ręczne
```
IMAP Host: imap.poczta.onet.pl
IMAP Port: 993 (SSL)
SMTP Host: smtp.poczta.onet.pl
SMTP Port: 465 (SSL)
```

### Wymagania
- Standardowe hasło do konta
- IMAP musi być włączony w ustawieniach (domyślnie włączone)

---

## 📧 WP.pl

### Konfiguracja automatyczna
- W aplikacji wybierz **"WP"** z listy dostawców
- Pola IMAP/SMTP wypełnią się automatycznie

### Dane ręczne
```
IMAP Host: imap.wp.pl
IMAP Port: 993 (SSL)
SMTP Host: smtp.wp.pl
SMTP Port: 465 (SSL)
```

### Wymagania
- Standardowe hasło do konta
- IMAP jest włączony domyślnie

---

## 📧 Interia.pl

### Konfiguracja automatyczna
- W aplikacji wybierz **"Interia"** z listy dostawców
- Pola IMAP/SMTP wypełnią się automatycznie

### Dane ręczne
```
IMAP Host: poczta.interia.pl
IMAP Port: 993 (SSL)
SMTP Host: poczta.interia.pl
SMTP Port: 465 (SSL)
```

### Wymagania
- Standardowe hasło do konta
- IMAP musi być włączony w ustawieniach poczty

### Włączanie IMAP w Interia
1. Zaloguj się na poczta.interia.pl
2. Ustawienia → Dostęp przez protokoły IMAP/POP3
3. Zaznacz "Włącz protokół IMAP"
4. Zapisz zmiany

---

## 🔐 Konto testowe

Aplikacja zawiera gotowe konto testowe do celów demonstracyjnych:

```
Email: test@test.pl
Hasło: patrykinzynierka123
```

**UWAGA:** To konto służy tylko do logowania w aplikacji, nie ma przypisanych rzeczywistych kont pocztowych.

---

## 💡 Porównanie dostawców

| Dostawca | Łatwość konfiguracji | IMAP domyślnie | Uwagi |
|----------|---------------------|----------------|-------|
| **Onet** | ⭐⭐⭐⭐⭐ | ✅ Tak | Najprostszy, działa od razu |
| **WP** | ⭐⭐⭐⭐⭐ | ✅ Tak | Działa od razu |
| **Interia** | ⭐⭐⭐⭐ | ❌ Nie | Wymaga włączenia IMAP |
| Gmail | ⭐⭐ | ✅ Tak | Wymaga hasła aplikacji |

---

## 🚨 Rozwiązywanie problemów

### "Błąd połączenia z serwerem pocztowym"
- Sprawdź czy dane logowania są poprawne
- Upewnij się że IMAP jest włączony w ustawieniach konta
- Sprawdź czy masz połączenie z internetem

### "Nieprawidłowe dane logowania"
- Upewnij się że używasz prawidłowego hasła
- NIE używaj hasła z dwoma znakami @ (niektóre portale wymagają username bez @domena)
- Spróbuj zalogować się na stronie www poczty, aby upewnić się że hasło jest prawidłowe

### Interia - IMAP wyłączony
1. Zaloguj się na poczta.interia.pl
2. Kliknij **Ustawienia** (koło zębate)
3. Przejdź do **Dostęp przez protokoły**
4. Włącz **IMAP**
5. Zapisz i poczekaj 5 minut

---

## 📝 Instrukcja dodawania konta (krok po kroku)

### Przykład: Onet.pl

1. **Zaloguj się** do aplikacji Mail Manager
2. Kliknij przycisk **"Dodaj"** w lewym panelu
3. Wybierz **"Onet"** z listy dostawców
4. Wprowadź dane:
   - Email: `twoj.email@onet.pl`
   - Nazwa użytkownika: `twoj.email@onet.pl` (lub samo `twoj.email`)
   - Hasło: twoje hasło do poczty Onet
5. Kliknij **"Dodaj konto"**
6. Kliknij na dodane konto aby zobaczyć wiadomości

**TIP:** Dla większości polskich dostawców nazwa użytkownika = pełny adres email

---

## 🌍 Międzynarodowi dostawcy

Aplikacja wspiera również:
- **Gmail** (wymaga hasła aplikacji)
- **Outlook/Hotmail**
- **Yahoo** (wymaga hasła aplikacji)
- **Dowolny inny** (tryb własny)
