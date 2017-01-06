# Angular Yandex Metrika
Модуль добавляет на страницу счетчик яндекс метрики, с возможностью отправки javascipt событий.
```sh
    npm install angularjs-yandex-metrika --save
```
Чтобы подключить, нужно добавить скрипт в шаблон, либо подключить с помощью загрузчика модулей, и подключить в приложение.
CommonJS:
```javascript
    require('angularjs-yandex-metrika');
```
```javascript
    var app = module('somApp', ['yandex-metrika']);
```
Если вам нужно, чтобы счетчик работал без javascript, нужно добавить это:
```html
<noscript><div><img src="https://mc.yandex.ru/watch/put_your_id_here" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
```
Для настройки счетчика(id обязателен):
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
Для отправки данных о просмотре страницы:
```javascript
app.run(['$rootScope', '$location', '$metrika', function ($rootScope, $location, $metrika) {
    $rootScope.$on('$routeChangeSuccess', (event, next, current) => {
        if (!current || !next || !current.$$route || !next.$$route) return;

        $metrika.hit(next.$$route.originalPath, {
            referer: current.$$route.originalPath
        });
    });
}])
```
