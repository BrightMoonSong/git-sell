第一步  安装node

第二步  安装淘宝镜像     npm install -g cnpm --registry=https://registry.npm.taobao.org

第三步 安装fis3  cnpm install -g fis3

然后启动打包   fis3 release -d ./dist

也可以用这个命令  fis3 release -w -d ./dist    启动监听
其中 ./dist   是同级的目录    输出目录       dist没有会自动生成一个文件夹

绝对路径的方式  fis3 release -d D:\xxx\hyd-manager-web
绝对路径的方式  fis3 release -w -d D:\xxx\hyd-manager-web
