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

```tsx
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

```tsx
...

import { useBetweenPages, BetweenTypes } from "between-pages";

import Home from "./Home";

const Main: React.FC = () => {
  const { startTransition } = useBetweenPages(<Home />);

  const handleAnimation = () => {
    startTransition(
      // First parameter are animation type, duration and others thing about animations.
      {
        type: BetweenTypes.FADE,
        duration: 3000,
      },
      // Second parameter is a callback that happens when the animation is finished.
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

In this case as we can se, importing the **useBetweenPages** you can specify the component that will be animated. All types of animations are inside the **BetweenTypes** object, further below are all types of animations that exist for now.

You can access the types of animations in this way below:

```tsx
...

import {  BetweenTypes } from "between-pages";

...
```

### Transistion Configurable properties

Now here, you specify all types of properties beyond a simple animation type in the **startTransition** function in first parameter.

| Name         | Type    | Description                                                                                                                                                                          | Default value     |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| type         | String  | Between Types is a type of a specific animation that can be access importing, all types is below.                                                                                    | BetweenTypes.FADE |
| endAnimation | boolean | With this proprety we can specific if when animation is finished if the component must stay or return to initial state, this is useful when we want a navigation after an animation. | true              |
| delay        | Number  | Delay in miliseconds to start the transition applied.                                                                                                                                | 0                 |
| duration     | Number  | Duration in miliseconds of one transition applied.                                                                                                                                   | 500               |

The last and second parameter, as I left it in the code comments above, is a **callback** that is always called when an animation is finished. I'll leave an example further down on how this is useful along with a navigation using [react-navigation](https://reactnavigation.org/).

| Type     | Description                                           | Default value |
| -------- | ----------------------------------------------------- | ------------- |
| Function | Callback that happens when the animation is finished. | null          |

### All of Between Types

These are all types of animation that can be used easily:

| Name      | Description                             | value                 |
| --------- | --------------------------------------- | --------------------- |
| FADE      | A transistion moving opacity up 0 to 1  | BetweenTypes.FADE     |
| SPRING    | A transistion moving scale up 0.1 to 1  | BetweenTypes.SPRING   |
| TO UP     | A transistion moving from bottom to top | BetweenTypes.TOUP     |
| TO BOTTOM | A transistion moving from top to bottom | BetweenTypes.TOBOTTOM |
| LEFT      | A transistion moving from right to left | BetweenTypes.LEFT     |
| RIGHT     | A transistion moving from left to right | BetweenTypes.RIGHT    |

## Using BetweenPages with react-navigation

Between pages was developed to facilitate an animation between components before a navigation or before some event. Yeah, there's a good way to implement the two together which is with react-native-navigation.

First of all you need to install and configure your route stack with react-navigation, all the documentation about that is in the react-navigation [documentation](https://reactnavigation.org/docs/hello-react-navigation).

```tsx
...

import { useNavigation } from '@react-navigation/native';
import { useBetweenPages, BetweenTypes } from "between-pages";

import Home from "./Home";

const Main: React.FC = () => {
  const navigation = useNavigation();
  const { startTransition } = useBetweenPages(<Home />);

  const handleAnimation = () => {
    startTransition(
      {
        type: BetweenTypes.FADE,
        endAnimation: false,
        duration: 3000,
      },
      () => {
        navigation.navigate("Home");
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text
        onPress={() => handleAnimation()}
        style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}
      >
        Page 1
      </Text>
    </View>
  );
};


```

As I said above, the endAnimation helps to make the navigation with a great performance when changing routes, making the animation not hide the next screen.

## Contributing

Reporting Bugs

You can't write code without writing the occasional bug. Especially as Betweeng Pages is moving quickly, bugs happen. When you think you've found one here's what to do:

- Search the existing issues for one like what you're seeing. If you see one, there are no other issues like yours then create a new one here: https://github.com/HubertRyanOfficial/between-pages/issues. 


## You got it! 👍😁

Thank you very much, I hope I have helped the great React community. ❤🙌

<p align="center">
  <img src="https://imgur.com/nIAoYGc.png" width="300" title="Whatsapp">
</p>
