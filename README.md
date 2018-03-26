## 自制Vue项目模板

## 运行步骤
1. clone本仓库到本地
```base
git clone https://github.com/avakpan/vue-template.git 你的项目名称
```

2. 安装对应的依赖项
```
cd 你的项目名称
npm install
```

3. 修改package.json中的name


4. 运行
```
npm start
//或者
npm run dev
```
# 请不要修改host文件的127.0.0.1 的地址指向否则会报
```
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! vue-template@1.0.0 dev: `webpack-dev-server`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the vue-template@1.0.0 dev script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\lx\AppData\Roaming\npm-cache\_logs\2018-03-26T08_44_03_720Z-debug.log
```
* 此时可以修改host文件 也可以修改`webpack.config.js`里面的端口配置 换个端口即可