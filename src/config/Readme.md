## Config structure

```ts
interface Config {
  token: string,
  botAdmin: string,
  mongodb: {
    url: string,
    database: string,
  },
  allowSamePlayer: boolean,
}
```