![ghbanner](https://github.com/stackai/react-stackai/assets/32944505/5722bae2-7b87-4e3f-9c10-8a001c3c78a7)

![CI](https://github.com/stackai/react-stackai/workflows/Check%20successful%20build/badge.svg)

# react-stackai

**react-stackai** allows you to export and use Stack AI interfaces as React components.

✨ [StackAI](https://stack-ai.com) is the no-code AI application builder.

[Twitter](https://twitter.com/StackAI_HQ?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor) | [Community](https://discord.gg/sSbwawtNsV) | [Documentation](https://stack-ai.com/docs)

## Install

```bash
npm install react-stackai
```

or

```bash
pnpm install react-stackai
```

## Usage

To use `react-stackai`, first you have to go to the Stack flow builder, click on the `Export` button, select `Website Chatbot` and copy the url your project is served from.

<img width="1496" alt="image" src="https://github.com/stackai/react-stackai/assets/32944505/d89109fb-8c33-41d3-ba67-d3145b6c581e">

You can copy the URL and pass it to the `<Stack />` component in react:

```jsx
import Stack from 'react-stackai';

export default function Home() {
  return (
    <>
      {/* Rest of your code */}
      <Stack project="https://www.stack-ai.com/embed/46bf5b6a-9b4d-48f6-8a13-cdfc4fe58520/11da0c81-afe2-4ccd-b498-807bbde8e7f1/653fefcfcc37c0093d55e6a9" />
    </>
  );
}
```

You should be able to see the chatbot embedded in your app

<img width="858" alt="image" src="https://github.com/stackai/react-stackai/assets/32944505/6df0c532-c85c-4d82-b004-9b4612f52139">

## Props

These are all the props you can pass to the <Stack /> component.

| Name | Type   | Description
| ---- | ------ | -----------
| project | string | The URL of the project you want to embed
| width | string | The width of the iframe (default: 35rem)
| height | string | The height of the iframe (default: 38rem)
| fixed | boolean | True if you want the chatbot to be fixed to the bottom of the screen, False if you want it to be relative to the page

## Contributing

### Install dependencies for development

```bash
npm install
```

or

```bash
pnpm install
```

### Start example development server

Serve the minimal React application inside the `example` folder.

```bash
npm run dev
```

or

```bash
pnpm dev
```

### Build the library

```bash
npm run build:react
```

or

```bash
pnpm build:react
```

Open a PR and you should be good to go!
