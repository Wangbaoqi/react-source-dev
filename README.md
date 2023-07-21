
# Learn everything about React

## react-demo

Debugging learning based on the latest react packaged version


## react

The source code of React

1. **build react react-dom scheduler**

```shell
yarn build react/index,react/jsx,react-dom/index,scheduler --type=NODE
```
2. **link builded packages to react-demo**

```shell
cd /react/build/oss-stable-semver/react
npm link
cd /react/build/oss-stable-semver/react-dom
npm link

cd /react-demo
npm link react react-dom
```

### the questions of building react or installing devDependencies

1. Set yarn registry to npmmirror

```shell
yarn config set registry "https://registry.npmmirror.com"
```

2. Set electron_registry to "https://npmmirror.com/mirrors/electron/" in `.npmrc` file

3. If there are problems related to Java, you can install, **update the Java version, or install JDK**.

The above should solve the problem of slowing down or packaging errors.