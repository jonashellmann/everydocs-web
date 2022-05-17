FROM httpd:2.4
COPY . /usr/local/apache2/htdocs/
RUN rm -rf /usr/local/apache2/htdocs/.git/
