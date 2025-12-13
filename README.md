# vp-very-simple-encrypt-plugin

## Warning: This plugin merely performs encryption on the front end. It is extremely easy to break and cannot guarantee the security of your files

## install it 
```bash
npm install vp-very-simple-encrypt-plugin
```

## define the protection scope and set a password

```javascript

export default defineUserConfig({
  plugins: [
    verySimpleEncrypt({
      encryptPaths: [
        {
          file: "/busszing/README.md",
          protectDirectoryIfIndex: true,
          password: "qwer"
        },
      ]
    }),
  ]
})
```
`file` can accept 
1. a single file name
2. a directory name
3. `README.md`, which is the index file of a directory. But `protectDirectoryIfIndex` must be `true`, otherwise, this config is invalid