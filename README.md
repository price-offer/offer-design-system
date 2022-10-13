# @offer-ui/react

<div align="center">
<img width="300" alt="offerlogo" src="https://user-images.githubusercontent.com/70738281/183294312-c87511e2-68fc-4414-af75-0041ee42e289.png">
</div>

<br/>

[![](https://badgen.net/npm/v/@offer-ui/react?icon=npm)](https://www.npmjs.com/package/@offer-ui/react)
[![NPM downloads](http://img.shields.io/npm/dm/@offer-ui/react.svg)](http://npmjs.com/@offer-ui/react)

> Offer Design System UI for React components.

## 🎉 Getting Started

Run the following command using [npm](https://www.npmjs.com/):

```bash
$ npm install @offer-ui/react
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
$ yarn add @offer-ui/react
```

## 🚀 Usage

To start using the components, please follow these steps:

1. Wrap your application with the `OfferStyleProvider` provided by
   **@offer-ui/react**.

```jsx
import { OfferStyleProvider } from "@offer-ui/react"

// Do this at the root of your application
function App({ children }) {
  return <OfferStyleProvider>{children}</OfferStyleProvider>
}
```

1. Now you can start using components like so!:

```jsx
import { Badge } from "@offer-ui/react"

function Example() {
  return <Badge colorType="orange">I just consumed some Offer!</Badge>
}
```

More guides on how to get started are available
[here](https://github.com/price-offer/offer-design-system/wiki/Components)

## 📝 License

@offer-ui/react is made available under the [MIT License](/LICENSE).
