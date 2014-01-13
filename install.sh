#!/usr/bin/env bash

mysql_password="rootpass"

echo "--- Good morning, master. Let's get to work. Installing now. ---"

echo "--- Updating packages list ---"
sudo apt-get update

echo "--- Installing base packages ---"
sudo apt-get install -y curl python-software-properties

echo "--- Updating packages list ---"
sudo apt-get update

echo "--- We want the bleeding edge of PHP, right master? ---"
sudo add-apt-repository -y ppa:ondrej/php5

echo "--- Updating packages list ---"
sudo apt-get update

echo "--- Installing PHP-specific packages ---"
sudo apt-get install -y php5 apache2 libapache2-mod-php5 php5-curl php5-gd php5-mcrypt git-core

echo "--- MySQL time ---"
export DEBIAN_FRONTEND=noninteractive
sudo debconf-set-selections <<< "mysql-server-5.5 mysql-server/root_password password $mysql_password"
sudo debconf-set-selections <<< "mysql-server-5.5 mysql-server/root_password_again password $mysql_password"

sudo apt-get -y install mysql-server
sudo apt-get -y install php5-mysql

echo "--- MySQL permissions ---"
export DEBIAN_FRONTEND=noninteractive
mysql -uroot -p$mysql_password << END

GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY "$mysql_password" WITH GRANT OPTION;

END

sudo sed -i 's/^bind-address.*/bind-address = 0.0.0.0/' /etc/mysql/my.cnf
sudo service mysql restart

echo "--- Installing and configuring Xdebug ---"
sudo apt-get install -y php5-xdebug

cat << EOF | sudo tee -a /etc/php5/mods-available/xdebug.ini
xdebug.scream=1
xdebug.cli_color=1
xdebug.show_local_vars=1
EOF

echo "--- Enabling mod-rewrite ---"
sudo a2enmod rewrite

echo "--- Setting document root ---"
sudo rm -rf /var/www
sudo ln -fs /vagrant/public /var/www


echo "--- What developer codes without errors turned on? Not you, master. ---"
sed -i "s/error_reporting = .*/error_reporting = E_ALL/" /etc/php5/apache2/php.ini
sed -i "s/display_errors = .*/display_errors = On/" /etc/php5/apache2/php.ini

sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

echo "--- Restarting Apache ---"
sudo service apache2 restart

echo "--- Composer is the future. But you knew that, did you master? Nice job. ---"
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Laravel stuff here, if you want
sudo chmod -R o+w /vagrant/app/storage

echo "--- All set to go! Would you like to play a game? ---"