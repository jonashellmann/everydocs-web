# EveryDocs Web

EveryDocs Web is the web interface of [EveryDocs](https://github.com/jonashellmann/everydocs-core). 
As the technology, ReactJS is used. 

## Installation

### Docker (recommended)

Run the following command to be able to access the web interface on port 5656.
<pre>docker run -v /path/to/config.js:/usr/local/apache2/htdocs/config.js /jonashellmann/everydocs-web</pre>

The file ``/path/to/config.js`` needs to have the following content. The URL needs to be replaced by the actual URL you use for your Everydocs Core installation.
<pre>
var config = {
  url: 'https://everydocs.test.com/api/',
}
</pre>

### Manual

1. Install [EveryDocs Core](https://github.com/jonashellmann/everydocs-core)
2. Download the newest release and unzip it into a location your webserver can access
3. Open config.js and change the URL where EveryDocs Core can be accessed. For
   me it helped to run the core part under the same domain. Otherwise the
website problably won't work because cross-site scripts are blocked by the web
browser.
4. To achieve this, you can configure your Apache Virtual Host like I did in
   the following example:
<pre>
# Forward HTTP to HTTPS
&lt;VirtualHost *:80&gt;
  ServerName everydocs.test.com # Your domain

  RewriteEngine on
  RewriteCond %{SERVER_NAME} =everydocs.test.com # Your domain
  RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
&lt;/VirtualHost&gt;

&lt;IfModule mod_ssl.c&gt;
&lt;VirtualHost *:443&gt;
  ServerName everydocs.test.com # Your domain
  ServerAdmin webmaster@localhost

  DocumentRoot /var/www/html/everydocs-web/ # Location where EveryDocs Web is
installed
  
  # Forward all calls to /api/ to EveryDocs Core
  ProxyPass /api/ http://localhost:[PORT]/ # The port under which EveryDocs
Core is running
  ProxyPassReverse /api/ http://localhost:[PORT]/ # The port under which
EveryDocs Core is running

  SSLCertificateFile [SSL Certificate File]
  SSLCertificateKeyFile [SSL Certificate Key File]
  Include /etc/letsencrypt/options-ssl-apache.conf
&lt;/VirtualHost&gt;
&lt;/IfModule&gt;
</pre>
