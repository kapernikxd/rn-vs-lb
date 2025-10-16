![picture of storybook](https://github.com/user-attachments/assets/cf98766d-8b90-44ab-b718-94ab16e63205)

# getting started

```sh
npx create-expo-app --template expo-template-storybook AwesomeStorybook
```

or

```sh
yarn create expo-app --template expo-template-storybook AwesomeStorybook
```

# app

```sh
yarn start
```

# RN Storybook (ondevice)

In this template you can now run `yarn storybook` to start ondevice storybook or `yarn start` to start your expo app.
This works via env variables and expo constants.

```sh
# either
yarn storybook

# ios
yarn storybook:ios

# android
yarn storybook:android
```

If you add new stories on the native (ondevice version) you either need to have the watcher running or run the stories loader

To update the stories one time

```sh
yarn storybook-generate
```

# Web

Start react native web storybook:

```
yarn storybook:web
```

build react native web storybook:

```sh
yarn build-storybook
```

## Публикация в npm

1. **Проверьте метаданные**. Обновите поля `name`, `version`, `description`, `keywords`, `author`, `repository` и `homepage` в `package.json`, чтобы они отражали вашу организацию и назначение пакета.
2. **Подготовьте содержимое пакета**. В корне проекта уже настроено поле `files`, которое ограничивает набор публикуемых файлов. При необходимости добавьте или удалите пути, чтобы в npm попали только нужные артефакты.
3. **Соберите и протестируйте**. Запустите важные проверки перед публикацией, например:
   ```sh
   npm install
   npm run storybook-generate
   npm run build-storybook
   ```
   Убедитесь, что команда `npm pack` создаёт корректный архив.
4. **Авторизуйтесь в npm**. Выполните вход под своей учётной записью и убедитесь, что у вас есть права на публикацию пакета:
   ```sh
   npm login
   ```
5. **Проведите пробную упаковку** (опционально). Запустите dry‑run, чтобы убедиться, что публикуемый состав выглядит корректно:
   ```sh
   npm publish --access public --dry-run
   ```
6. **Опубликуйте релиз**. Убедившись, что версия не занята, выполните:
   ```sh
   npm publish --access public
   ```
7. **Проверьте публикацию**. После успешной публикации обновите теги в git (`git tag vX.Y.Z && git push --tags`) и убедитесь, что пакет появился на npmjs.com.
