in  package.json change "main": "expo/AppEntry.js",  to   "main": "dist/index.js", and back when publish files

delete   "extends": "expo/tsconfig.base" from tsconfig.json before npm publish

change version on package.json  "version": "1.0.5", +one

run "npm publish"