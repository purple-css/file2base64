Создай современное, полностью рабочее веб-приложение **«File to Base64»** — инструмент для преобразования файлов и обычного текста в Base64 и обратно, если это возможно.

Приложение должно работать **полностью на стороне клиента (client-side)**, без сервера, backend и загрузки файлов пользователя куда-либо. Используй современный **HTML5 + CSS3 + JavaScript (ES Modules)**.

## Главная идея

Пользователь может:

1. Выбрать файл через `<input type="file">`.
2. Перетащить файл мышкой в drag-and-drop область.
3. Вставить или самостоятельно написать текст, если файла нет под рукой или файл является текстовым.
4. Получить Base64-представление содержимого.
5. Скопировать Base64.
6. Скачать Base64 как `.txt`/`.base64`.
7. Для текстовых файлов видеть исходный текст и Base64 одновременно.
8. Для бинарных файлов отображать информацию о файле и Base64 без попытки интерпретировать бинарные данные как обычный текст.

---

# Структура проекта

Создай проект строго с такой структурой:

```text
File-to-Base64/
│
├── index.html
├── main.js
├── manifest.json
├── README.md
├── LICENSE
│
└── src/
    ├── css/
    │   ├── styles.css
    │   ├── fonts.css
    │   └── originalText-andBase64-Fonts.css
    │
    ├── js/
    │   ├── script.js
    │   ├── base64.js
    │   └── base64words.json
    │
    ├── favicon-512.svg
    └── favicon-128.svg
```

Не создавай ненужные framework-файлы, `package.json`, Node.js-конфигурацию или backend, если они реально не нужны.

---

# 1. index.html

Создай основной HTML-документ.

Он должен:

* использовать современный HTML5;
* иметь корректные `meta charset`, viewport и description;
* подключать `manifest.json`;
* использовать favicon из `src/favicon-128.svg` или `src/favicon-512.svg`;
* подключать **только один JavaScript-файл**:

```html
<script type="module" src="main.js"></script>
```

Не подключай `script.js`, `base64.js` и другие JS-файлы напрямую из HTML.

`main.js` должен самостоятельно импортировать необходимые модули.

HTML должен содержать семантическую структуру интерфейса, а основная логика должна находиться в JavaScript.

---

# 2. Интерфейс

Сделай современный интерфейс уровня качественного developer-tool сайта.

Название:

**File to Base64**

Подзаголовок:

**Convert files and text to Base64 directly in your browser.**

Интерфейс должен быть удобным как на компьютере, так и на телефоне.

## Основная область

Создай большую drag-and-drop область:

```text
┌─────────────────────────────────────────────┐
│                                             │
│              Drop your file here            │
│                                             │
│                  or click                   │
│                                             │
│             [ Choose a file ]               │
│                                             │
│       Files never leave your browser.       │
│                                             │
└─────────────────────────────────────────────┘
```

Поддерживай:

* click-to-upload;
* drag & drop;
* визуальное состояние при перетаскивании;
* обработку нескольких состояний drag/drop;
* понятное сообщение об ошибке.

---

# 3. Режим ввода текста

Помимо загрузки файла должна быть возможность самостоятельно написать текст.

Добавь переключатель:

```text
[ File ] [ Text ]
```

В режиме `Text` показывай большой редактор:

```text
┌─────────────────────────────────────────────┐
│ Write or paste text here...                 │
│                                             │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```

При вводе текста Base64 должен обновляться автоматически.

Добавь:

* количество символов;
* количество байт;
* кнопку очистки;
* кнопку копирования;
* кнопку преобразования.

Для подсчёта байтов корректно обрабатывай Unicode через `TextEncoder`.

Например, кириллица, emoji и другие Unicode-символы не должны неправильно считаться как ASCII.

---

# 4. Работа с файлами

При загрузке файла используй:

```javascript
FileReader
```

или современные API вроде:

```javascript
file.arrayBuffer()
```

Для бинарных файлов используй `ArrayBuffer` / `Uint8Array`.

Не пытайся преобразовывать бинарный файл через обычный `btoa()` напрямую.

Корректно реализуй:

```text
File
 ↓
ArrayBuffer
 ↓
Uint8Array
 ↓
Base64
```

Для текста:

```text
Text
 ↓
UTF-8
 ↓
Uint8Array
 ↓
Base64
```

---

# 5. Результат Base64

После преобразования показывай отдельную большую область:

```text
Original
────────────────────────────────────────

filename.txt
Type: text/plain
Size: 2.4 KB

Base64
────────────────────────────────────────

SGVsbG8sIHdvcmxkIQ==

[ Copy ] [ Download ]
```

Base64 должен отображаться моноширинным шрифтом.

Добавь:

* подсветку Base64;
* перенос длинных строк;
* возможность выделить весь результат;
* кнопку `Copy`;
* кнопку `Download`;
* кнопку `Clear`.

Для очень больших файлов не создавай чрезмерное количество DOM-элементов.

---

# 6. Data URI

Если загружен файл, дополнительно показывай возможность получить Data URI:

```text
data:image/png;base64,iVBORw0KGgo...
```

Определи MIME type автоматически:

```javascript
file.type
```

Если MIME type неизвестен, используй:

```text
application/octet-stream
```

Добавь кнопку:

```text
Copy Data URI
```

---

# 7. Информация о файле

После загрузки показывай карточку:

```text
File information

Name        image.png
Type        image/png
Size        182.42 KB
Extension   .png
Modified    ...
Base64      243.22 KB
```

Размеры форматируй удобно:

```text
B
KB
MB
GB
```

---

# 8. Base64 → Text

Добавь возможность декодировать Base64 обратно в текст.

Например, отдельный режим:

```text
[ Encode ] [ Decode ]
```

В режиме Decode пользователь вставляет:

```text
SGVsbG8=
```

и получает:

```text
Hello
```

Для декодирования корректно работай с UTF-8.

Не допускай падения приложения из-за неправильного Base64.

Показывай понятную ошибку:

```text
Invalid Base64 input.
```

---

# 9. base64.js

Файл:

```text
src/js/base64.js
```

должен содержать всю основную логику Base64.

Экспортируй функции примерно такого уровня:

```javascript
export function textToBase64(text) {}

export function base64ToText(base64) {}

export function bytesToBase64(bytes) {}

export function base64ToBytes(base64) {}

export function fileToBase64(file) {}

export function createDataUri(mimeType, base64) {}
```

Не смешивай UI-логику с Base64-алгоритмами.

---

# 10. script.js

Файл:

```text
src/js/script.js
```

должен отвечать за интерфейс:

* DOM;
* drag & drop;
* file input;
* переключение режимов;
* кнопки;
* отображение информации;
* clipboard;
* download;
* сообщения об ошибках;
* обновление статистики;
* взаимодействие с `base64.js`.

Используй ES Modules:

```javascript
import {
    textToBase64,
    base64ToText,
    fileToBase64
} from "./base64.js";
```

---

# 11. main.js

`main.js` является главным entry point приложения.

HTML должен подключать только:

```html
<script type="module" src="main.js"></script>
```

`main.js` должен связывать JavaScript, CSS и JSON.

Например:

```javascript
import "./src/css/styles.css";
import "./src/css/fonts.css";
import "./src/css/originalText-andBase64-Fonts.css";

import "./src/js/script.js";

import base64Words from "./src/js/base64words.json";
```

Если браузерная среда не позволяет напрямую импортировать CSS/JSON таким способом без bundler-а, **не ломай приложение**. Реализуй структуру так, чтобы проект запускался непосредственно в браузере без Node.js.

В таком случае допустимо использовать `main.js` как модуль-инициализатор и подключать CSS через `document.head`, а JSON загружать через `fetch()`.

Главное требование:

**index.html подключает только `main.js`.**

---

# 12. base64words.json

Создай:

```text
src/js/base64words.json
```

Он должен содержать данные, связанные с визуализацией/анализом Base64.

Например:

```json
{
  "alphabet": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  "padding": "=",
  "groups": {
    "uppercase": "...",
    "lowercase": "...",
    "digits": "..."
  },
  "commonSequences": []
}
```

Можно расширить JSON дополнительными данными:

* Base64 alphabet;
* символы;
* группы символов;
* часто встречающиеся последовательности;
* связи символов;
* metadata.

**Не делай JSON бесполезным декоративным файлом:** приложение действительно должно использовать его хотя бы для анализа/подсветки Base64.

---

# 13. Визуализация Base64

Добавь небольшую дополнительную визуализацию Base64.

Например:

```text
Base64 characters

A-Z   ███████████
a-z   █████████████████
0-9   ████████
+/    ██
=     █
```

Или компактную статистику:

```text
Characters: 1,024
Unique chars: 64
A-Z: 42%
a-z: 38%
0-9: 17%
+/=: 3%
```

Используй `base64words.json` для определения групп символов.

Не нужно строить тяжёлую графику — всё должно работать быстро даже на слабом ПК.

---

# 14. CSS

## styles.css

Основные стили приложения:

* layout;
* header;
* cards;
* buttons;
* inputs;
* textarea;
* drag & drop;
* Base64 viewer;
* responsive design;
* animations;
* dark/light theme.

Дизайн должен выглядеть современно, но не перегруженно.

Можно использовать эстетику:

* developer tools;
* VS Code;
* GitHub;
* modern SaaS;
* glassmorphism в умеренном количестве.

Не используй огромные градиенты, которые ухудшают читаемость.

---

# 15. fonts.css

Здесь должны находиться основные шрифты интерфейса.

Например:

```css
font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
```

Если используются внешние web-fonts, приложение всё равно должно оставаться читаемым без интернета.

---

# 16. originalText-andBase64-Fonts.css

Этот файл предназначен именно для:

* исходного текста;
* Base64;
* code blocks;
* textarea;
* monospace viewer.

Используй подходящие моноширинные шрифты:

```text
JetBrains Mono
Cascadia Code
Consolas
monospace
```

Раздели стили обычного текста и Base64-кода.

---

# 17. Dark / Light theme

Добавь переключатель темы:

```text
☀ Light
🌙 Dark
```

или компактную кнопку.

Сохраняй выбранную тему через:

```javascript
localStorage
```

При повторном открытии сайта тема должна сохраняться.

Также желательно поддерживать:

```text
prefers-color-scheme
```

если пользователь ещё не выбрал тему вручную.

---

# 18. Clipboard

Кнопки:

```text
Copy
Copy Base64
Copy Data URI
Copy Text
```

должны использовать:

```javascript
navigator.clipboard.writeText(...)
```

После копирования показывай небольшое уведомление:

```text
✓ Copied to clipboard
```

---

# 19. Download

Добавь возможность скачать:

### Base64:

```text
filename.base64.txt
```

### Text:

```text
filename.txt
```

### Data URI:

```text
filename.data-uri.txt
```

Используй `Blob` и `URL.createObjectURL()`.

Не отправляй данные на сервер.

---

# 20. Безопасность и приватность

На странице явно укажи:

```text
Your files never leave your browser.
Everything is processed locally.
```

Не используй:

* backend;
* внешние API;
* загрузку файлов на сервер;
* аналитику, которая отправляет содержимое файлов;
* сторонние сервисы конвертации.

Не логируй содержимое пользовательских файлов в `console`.

---

# 21. Обработка больших файлов

Приложение должно нормально работать с большими файлами настолько, насколько это позволяет память браузера.

Не создавай ненужные копии огромных строк.

Для небольших и средних файлов обычный Base64-процессинг допустим.

Если файл слишком большой, показывай предупреждение:

```text
Large file detected.
Converting it may require significant memory.
```

Но не ломай приложение.

---

# 22. PWA

Создай:

```text
manifest.json
```

Он должен содержать:

* name;
* short_name;
* description;
* start_url;
* display;
* theme_color;
* background_color;
* icons.

Используй:

```text
src/favicon-128.svg
src/favicon-512.svg
```

как иконки, если формат SVG поддерживается выбранной конфигурацией.

Приложение должно быть пригодно для установки как PWA.

---

# 23. Favicon

Создай две SVG-иконки:

```text
src/favicon-128.svg
src/favicon-512.svg
```

Стиль должен соответствовать File to Base64.

Например, минималистичная иконка:

```text
FILE
 ↓
BASE64
```

или символическое сочетание файла и строки Base64.

SVG должен быть настоящим векторным SVG, а не embedded PNG.

---

# 24. README.md

Создай подробный README.

Он должен содержать:

# File to Base64

Описание проекта.

## Features

Перечисли:

* File → Base64
* Text → Base64
* Base64 → Text
* Drag & Drop
* Clipboard
* Data URI
* File information
* Base64 statistics
* Dark/Light theme
* PWA
* Offline/client-side processing
* Responsive UI

## Tech Stack

Укажи:

* HTML5
* CSS3
* JavaScript ES Modules
* Web APIs
* File API
* Clipboard API
* Blob API
* LocalStorage
* PWA

## Privacy

Объясни, что файлы обрабатываются локально в браузере.

## Project Structure

Покажи полную структуру проекта.

## How to run

Поскольку проект должен быть максимально простым, объясни запуск через обычный статический HTTP-сервер.

Также укажи, что для некоторых браузерных возможностей ES Modules/PWA может потребоваться HTTP(S), а не `file://`.

## License

Укажи WTFPL 2.0.

---

# 25. LICENSE

Используй:

**WTFPL — Do What The Fuck You Want To Public License, Version 2**

Автор:

```text
purple-css
```

Не добавляй email:

```text
<asulan.masanov@gmail.com>
```

Email вообще не должен присутствовать в LICENSE.

Не заменяй лицензию на MIT, Apache или другую.

---

# 26. UX

Добавь хорошие состояния интерфейса:

### Empty

```text
Drop a file here
or choose one
```

### Processing

```text
Converting...
```

### Success

```text
✓ Conversion complete
```

### Error

```text
⚠ Unable to process this file
```

Ошибки должны быть понятными обычному пользователю.

---

# 27. Адаптивность

Сайт должен хорошо работать на:

* desktop;
* laptop;
* tablet;
* smartphone.

На маленьком экране:

* панели должны становиться вертикальными;
* кнопки не должны выходить за экран;
* textarea должна нормально изменять размер;
* Base64 viewer не должен ломать layout;
* drag-and-drop область должна оставаться удобной.

---

# 28. Производительность

Особенно важно:

* не использовать React/Vue/Angular без необходимости;
* не использовать тяжёлые библиотеки;
* не использовать jQuery;
* не создавать тысячи DOM-элементов для Base64;
* не выполнять бессмысленные повторные преобразования;
* использовать современные Web APIs;
* минимизировать количество операций с DOM.

Приложение должно нормально работать даже на относительно слабом компьютере.

---

# 29. Итоговые требования

В конце обязательно проверь:

* [ ] Все файлы существуют.
* [ ] `index.html` запускает приложение через `main.js`.
* [ ] Drag & Drop работает.
* [ ] File input работает.
* [ ] Text input работает.
* [ ] File → Base64 работает.
* [ ] Text → Base64 работает.
* [ ] Base64 → Text работает.
* [ ] Unicode работает корректно.
* [ ] Binary files работают корректно.
* [ ] Data URI создаётся правильно.
* [ ] Copy работает.
* [ ] Download работает.
* [ ] Dark/Light theme работает.
* [ ] localStorage работает.
* [ ] PWA manifest корректен.
* [ ] JSON реально используется.
* [ ] Нет backend.
* [ ] Нет отправки файлов в интернет.
* [ ] Нет лишних зависимостей.
* [ ] Нет ошибок в DevTools Console.
* [ ] README содержит полную документацию.
* [ ] LICENSE — WTFPL 2.0 с автором `purple-css`.

## Важное требование

Не создавай псевдокод и заглушки вроде:

```javascript
// TODO: implement
```

или:

```javascript
function convertFile() {
    // implementation here
}
```

Все функции должны быть **реально реализованы и связаны между собой**.

Сгенерируй **полный готовый проект**, а не только дизайн или отдельные фрагменты кода.
