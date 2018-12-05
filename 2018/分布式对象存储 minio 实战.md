# 分布式对象存储 minio 实战





<center><img src="C:/Users/lenovo/Desktop/picture/Minio_wm_dark_64px.png" width="200px"/></center>


<center><img src="C:/Users/lenovo/Desktop/picture/Minio_Logo_White.png" width="200px"/></center>


















- 版本：V1.0
- 作者：黑志强
- 创建日期：2018-06-07
- 最后修订：2018-06-08




[TOC]



## Minio

- 下载 minio 最新 Linux X64 版本。

- 下载 minio client 最新 Linux X64 版本。

- cd /usr/local/minio ,将 minio ，mc 放在此目录下。

- 创建 minio_startup.sh,赋予 +x 权限，以后 ./minio_startup.sh 启动server。

```shell
#!/bin/bash
 
cd /usr/local/minio
export MINIO_ACCESS_KEY=VACKUOVB50AJZ15BIN0T
export MINIO_SECRET_KEY=dxORRbrilKrum8nXzwvXq1Z/0RkGioutosbpz9Z2
export MINIO_REGION="us-east-1"
./minio server --config-dir /usr/local/minio /Data &
```
- 创建一个 Amazon S3 compatible host，
```shell
./mc config host add myminio http://192.168.128.4:9000 VACKUOVB50AJZ15BIN0T dxORRbrilKrum8nXzwvXq1Z/0RkGioutosbpz9Z2
```
- 创建一个bucket，命名为 elevpic。
```shell
./mc mb myminio/elevpic
```
- 赋予 bucket -> elevpic public 权限。
```shell
./mc policy public myminio/elevpic
```


## Iptables

- 修改iptables 配置，minio 默认端口：9000。
```shell
-A INPUT -p tcp --dport 9000 -j ACCEPT
```
- 重启iptables。  
```shell
service iptables restart
```



## Nginx
- 安装 Nginx。将 nginx 移动至新建目录下：
```shell
sudo mkdir  /usr/local/nginx
```
```shell
yum -y install gcc gcc-c++ make libtool zlib zlib-devel openssl openssl-devel pcre pcre-devel
mv nginx-1.14.0.tar.gz /usr/local/ngnix/
tar -zxvf nginx-1.14.0.tar.gz
cd nginx-1.14.0
./configure --prefix=/usr/local/nginx
make
make install

# Nginx 启动
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```

## Minio + Nginx

- 外网访问
```nginx
listen       8001;
server_name  localhost;

#charset koi8-r;

#access_log  logs/host.access.log  main;

location / {
    proxy_buffering off;	
    proxy_pass http://127.0.0.1:9000;
    proxy_set_header HOST $host:18002; 
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-Client-IP  $remote_addr|$http_x_real_client_ip;
    proxy_redirect http:// $scheme://;

}

location ~ /minio/.*$ {
    root   /usr/local/nginx/html;
    index  index.html index.htm;
}
```
- 内网访问
```nginx
listen 8091;
server_name localhost;

#charset utf-8;

location / {
    proxy_pass http://127.0.0.1:9000;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-Client-IP  $remote_addr|$http_x_real_client_ip;
    proxy_redirect http:// $scheme://;
}

error_page   500 502 503 504  /50x.html;
location = /50x.html {
	root   html;
}
```

## drip-minio
- minio rest service
- 采用方案 jdk8 + minio-java + resteasy + tomcat8 + Nginx
- https://github.com/heizq/drip-minio
- https://github.com/heizq/drip-minio-client

## tomcat
- 部署 drip-minio ,需要 jdk8,如果有jdk 多个版本，需要指定
```shell
# 修改 Tomcat下 bin/setclasspath 首行添加以下代码：
set JAVA_HOME=C:/Program Files/Java/jdk1.8.0_131
set JRE_HOME=C:/Program Files/Java/jre1.8.0_131
```

## 参考

- minio
https://www.minio.io/
https://github.com/minio/minio
https://github.com/minio/awesome-minio
https://github.com/minio/cookbook
https://github.com/minio/minio-service
https://github.com/minio/minio-java
https://github.com/minio/minio-java-rest-example
https://github.com/aboullaite/minio-starter
https://github.com/choerodon/file-service
https://github.com/waylau/rest-in-action

- iptables
https://www.cnblogs.com/alimac/p/5848372.html
https://www.cnblogs.com/bill1015/p/6847841.html
https://blog.csdn.net/wailaizhu/article/details/53488954

- Nginx
http://nginx.org/
https://www.nginx.com/blog/enterprise-grade-cloud-storage-nginx-plus-minio/
https://www.cnblogs.com/bluestorm/p/4574688.html
https://www.cnblogs.com/wyd168/p/6636529.html
http://www.pchou.info/web/2014/03/16/nginx-config-tips.html