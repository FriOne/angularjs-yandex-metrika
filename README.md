# Angular Yandex Metrika
Модуль добавляет на страницу счетчик яндекс метрики, с возможностью отправки javascipt событий.
```sh
    npm install angularjs-yandex-metrika
```
Чтобы подключить, нужно добавить скрипт в шаблон, либо подключить с помощью загрузчика модулей, и подключить модуль в приложение.
CommonJS:
```javascript
    require('angularjs-yandex-metrika');
```
```javascript
    var app = module('somApp', ['yandex-metrika']);
```
Если вам нужено, чтобы счетчик работал без javascript, нужно добавить это:
```html
<noscript><div><img src="https://mc.yandex.ru/watch/put_your_id_here" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
```
Для настройки счетчика(как вы понимаете id обязателен):
```javascript
function config($metrikaProvider) {
    $metrikaProvider.configureCounter({id: 35567075, webvisor: true});
}
```
Для отправки javascript события:
```javascript
function someCtrl($metrika) {
    // ...
    $metrika.fireEvent('some_event_name');
}
```
