# Angular Yandex Metrika
Модуль добавляет на страницу счетчик(и) яндекс метрики, доступны все [методы](https://yandex.ru/support/metrika/objects/method-reference.xml) API метрики.
Для методов, в которые можно передать колбэк, возвращается промис ангулара, но колбэки так же работают.

Версия 2 использует АПИ второй метрики.

**Модуль собран при помощи webpack и typescript. В нем содержится typescript definition файл, модуль может был импортирован при помощи любого загрузчика модулей. Если у вас есть проблемы в последней версией, пожалучйста, используйте версию 1.0.1, или лучше создайте тикет на github.**


```sh
    npm install angularjs-yandex-metrika --save
    # или можете скачать с помощью bower, но, к сожалению, он не содержит последней версии,
    # так как компонент был зарегистрирован не мной.
    bower install angularjs-yandex-metrika --save
```
Чтобы подключить, нужно добавить скрипт в шаблон, либо подключить с помощью загрузчика модулей, и подключить в приложение.
```javascript
    require('angularjs-yandex-metrika');
    // или import 'angularjs-yandex-metrika';
    var app = module('somApp', ['yandex-metrika']);
```
Если вам нужно, чтобы счетчик работал без javascript, нужно добавить это:
```html
<noscript><div><img src="https://mc.yandex.ru/watch/put_your_id_here" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
```
Для настройки счетчика(id обязателен):
```javascript
function config($metrikaProvider) { // или ($metrikaProvider: MetrikaProvider) для typescript.
    $metrikaProvider.configureCounter({id: 35567075, webvisor: true});
    // Или массив, если требуется добавить несколько счетчиков,
    // Вторым параметром задается счетчик по умолчанию при вызове методов,
    // Можно задать ид счетчика, либо порядковый номер в массиве.
}
```
Для отправки javascript события:
```javascript
function someCtrl($metrika) { // или ($metrika: Metrika) для typescript.
    // ...
    $metrika.fireEvent('some_event_name');
}
```
Для отправки данных о просмотре страницы:
```javascript
app.run(moduleRun);

moduleRun.$inject = ['$rootScope', '$location', '$metrika'];

function moduleRun($rootScope, $location, $metrika) {
    let path = $location.path();

    $rootScope.$on('$routeChangeSuccess', (event, next, current) => {
        if (!current || !next || !current.$$route || !next.$$route) return;

        let newPath = $location.path();
        $metrika.hit(newPath, {
            referer: path
        });
        path = newPath;
    });
}
```
