# rn-vs-lb

React Native UI библиотека с готовой средой Storybook на базе Expo. Репозиторий предназначен для двух сценариев:

1. локальная разработка и визуальное тестирование компонентов через Storybook;
2. сборка и публикация переиспользуемого npm-пакета.

## Требования окружения

- Node.js 18+
- npm 9+ или Yarn 1.x
- Expo CLI (`npm install -g expo-cli`) для запуска Storybook

Библиотека рассчитана на Expo/React Native окружение. При подключении пакета в стороннем приложении убедитесь, что установлены следующие peer-зависимости и настроены их нативные шаги:

```
expo
react
react-native
react-hook-form
@react-native-async-storage/async-storage
@react-native-community/datetimepicker
@react-native-picker/picker
@gorhom/bottom-sheet
expo-image-picker
react-native-autocomplete-input
react-native-gesture-handler
react-native-reanimated
react-native-vector-icons
```

> Expo автоматически подтягивает большинство из этих зависимостей, однако для bare React Native проекта потребуется ручная установка.

## Установка зависимостей

```bash
npm install
# или
yarn install
```

## Работа со Storybook

Storybook запускается в рамках Expo-приложения `App.tsx`.

```bash
npm run storybook
```

Команда очистит кэш Metro и откроет Expo DevTools. Далее вы сможете открыть Storybook на устройстве/эмуляторе. Для веб-предпросмотра используется `expo start --web`.

### Генерация списка сторис

Если вы добавляете новые файлы сторис, обновите автосгенерированный реестр:

```bash
npm run storybook-generate
```

Скрипт ищет файлы `*.stories.tsx` в каталоге `.storybook/stories`.

## Структура исходников

- `src/` — исходный код библиотеки. Все публичные сущности реэкспортируются из `src/index.ts`.
- `.storybook/` — конфигурация Storybook и корневой компонент, который импортируется в `App.tsx`.
- `typings/` — глобальные декларации TypeScript (например, для SVG).

## Сборка npm-пакета

Перед публикацией соберите проект, чтобы получить готовые `dist`-артефакты (CommonJS + декларации TypeScript):

```bash
npm run build
```

Команда использует конфигурацию `tsconfig.build.json`. Очистить предыдущую сборку можно командой `npm run clean`.

## Публикация

1. Обновите версию в `package.json` (например, `npm version patch`).
2. Убедитесь, что собраны артефакты (`npm run build`).
3. Выполните вход в npm (`npm login`), если необходимо.
4. Запустите публикацию:

   ```bash
   npm publish --access public
   ```

Скрипт `prepublishOnly` автоматически пересоберёт пакет и гарантирует, что в реестр попадёт актуальный `dist/`.

## Использование пакета в приложении

```bash
npm install rn-vs-lb \
  react-native-vector-icons \
  @react-native-async-storage/async-storage \
  @react-native-community/datetimepicker \
  @react-native-picker/picker \
  @gorhom/bottom-sheet \
  expo-image-picker \
  react-hook-form
```

Пример импорта в Expo/React Native проекте:

```tsx
import { Button, appTheme, FormProvider } from 'rn-vs-lb';

export const Example = () => (
  <FormProvider>
    <Button title="Продолжить" onPress={() => {}} />
  </FormProvider>
);
```

## Полезные советы

- `main`, `module`, `react-native` и `types` в `package.json` всегда указывают на готовый `dist`. В Expo-проекте точка входа в Storybook задаётся через `app.json` (`entryPoint: ./App.tsx`), поэтому перед публикацией больше не требуется вручную менять `package.json`.
- Для удобства разработки храните сторисы рядом с компонентами и экспортируйте их в `.storybook/stories` через barrel-файлы.
- Поддерживайте единый стиль кода и типизацию — основной `tsconfig.json` настроен на работу без эмита, а отдельный `tsconfig.build.json` отвечает за генерацию пакета.

