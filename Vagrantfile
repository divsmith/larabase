# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

WEB_PORT = 8080
MYSQL_PORT = 3307

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  
  config.vm.box = "precise32"

  config.vm.box_url = "http://file.vagrantup.com/precise32.box"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network :forwarded_port, guest: 80, host: WEB_PORT
  config.vm.network :forwarded_port, guest: 3306, host: MYSQL_PORT

  config.vm.provision :shell, :path => "install.sh"
end
