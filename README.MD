<p align="center">
  <img src="https://imgur.com/wTw19yZ.png" width="720" title="Whatsapp">
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
  <a href="https://github.com/HubertRyanOfficial/between-pages"><img src="https://img.shields.io/github/stars/HubertRyanOfficial/between-pages"></a>
  <a href="https://www.npmjs.com/package/between-pages"><img src="https://img.shields.io/npm/dm/between-pages.svg"></a> 
</p>

# Between Pages

A library to help you animate and improve the user experience when is moved between pages with animations on react native apps. **Between Pages** uses the underlying native library called Animated from react native itself, thus allowing all animation between routes to be at high FPS.

**Between Pages** was developed to create animations from simple to complex levels before navigation, restoring the entire screen before every route, making the movement natural. Remembering that BetweenPages is not recommended for route management.

_I will show some applications with navigation libraries below._

- 🧪 **Well tested**
  - every module is extensively tested both android and ios.
- 👁 **Well typed**
  - Everthing was strongly typed with typescript
- 🔥 **PR's welcome**
  - If you have any idea how we can improve this library, pls text me
  - You can send pull requests or create an issue

<div style="display: flex; flex-direction: row">
  <img src="https://i.imgur.com/mWCeaFC.gif" width="200" title="Whatsapp">
  <img src="https://i.imgur.com/MW8LTpO.gif" style="margin-left: 40px" width="200" title="Whatsapp">
  <img src="https://i.imgur.com/0BQgNcd.gif" style="margin-left: 40px" width="200" title="Whatsapp">
  <img src="https://i.imgur.com/LwZ9jh2.gif" style="margin-left: 40px" width="200" title="Whatsapp">
 
</div>

</br>

## Getting Started

Before starting to install you need to see the minimum requirements, so between can work very well, check the versions below:

### Minimum Requirements

`react-native` >= 0.59</br>
if you're using `expo` >= 41</br>
if you're using `typescript` >= 4.x
</br>

### Installation

```sh
  npm i between-pages
```

or

```sh
  yarn add between-pages
```

### Expo

If you're using Expo to build beautiful apps, you can execute like this:

```sh
  npx expo install between-pages
```

## Usage

First of all, before we start animating our screens to get some feedback later, we need to insert the Provider inside the root of the project. It's usually in `/App.js`.

```jsx
...

import { BetweenPagesProvider } from "between-pages";

export default function App() {
  return (
    <BetweenPagesProvider>
      <Main />
      {/*.........*/}
    </BetweenPagesProvider>
  );
}
```

### First Transition

In any screen that is already inside our general Provider, we can make a transition together with the Between Types, which are the types of transition that we can make with the page or screen that turns next.

Let's see an example as if we were on a screen called Main, the next screen is Home. So we want an animated transition to the next screen using the **useBetweenPages** passing the next route component like first parameter:

```jsx
...

import { useBetweenPages, BetweenTypes } from "between-pages";

import Home from "./Home";

const Main: React.FC = () => {
  const { startTransition } = useBetweenPages(<Home />);

  const handleAnimation = () => {
    startTransition(
      {
        type: BetweenTypes.FADE,
        duration: 3000,
      },
      () => {}
    );
  };

  return (
    <View style={styles.container}>
      <Text
        onPress={() => handleAnimation()}
        style={{ fontSize: 30, fontWeight: "bold", color: "#FFFFFF" }}
      >
        Page 1
      </Text>
    </View>
  );
};

...
```

In this case as we can se, importing the use...
