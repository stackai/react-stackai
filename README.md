
![ghbanner](https://github.com/stackai/react-stackai/assets/32944505/680b4449-2713-4eda-bcbe-4b0de7e66b1a)

![CI](https://github.com/stackai/react-stackai/workflows/Check%20successful%20build/badge.svg)


# react-stackai

**react-stackai** allows you to export and use Stack AI interfaces directly in your React-based applications.

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

<!-- TODO: SCREENSHOT OF HOW TO COPY THE URL -->

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

You should be able to see the chatbot embedded in your app.

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
npm run build
```

or

```bash
pnpm build
```

Open a PR and you should be good to go!
