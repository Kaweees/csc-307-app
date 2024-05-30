### Prerequisites

Before attempting to build this project, make sure you have [Docker](https://docs.docker.com/engine/install/), [Node.js](https://nodejs.org/en/download), and [pNpM](https://pnpm.io/) installed on your machine.

Additionally, make sure [taze](https://github.com/antfu/taze) and [turbo](https://turbo.build/repo/docs/getting-started/existing-monorepo) and are installed globally:

```sh
pnpm install taze --global
pnpm install turbo --global
```


```log
./
├── Dockerfile
├── .dockerignore
├── .gitignore
├── packages/
│   ├── app1/
│   │   ├── dist/
│   │   ├── package.json
│   │   ├── src/
│   │   └── tsconfig.json
│   ├── app2/
│   │   ├── dist/
│   │   ├── package.json
│   │   ├── src/
│   │   └── tsconfig.json
│   └── common/
│       ├── dist/
│       ├── package.json
│       ├── src/
│       └── tsconfig.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── tsconfig.json
```

```sh
docker build . --target app1 --tag app1:latest
docker build . --target app2 --tag app2:latest
```
