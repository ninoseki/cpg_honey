# frozen_string_literal: true

# install Ruby 2.6
"git build-essential".split.each { |name| package name }

execute "yes | sudo apt-add-repository ppa:brightbox/ruby-ng" do
  not_if "grep ^ /etc/apt/sources.list /etc/apt/sources.list.d/* | grep brightbox-ubuntu-ruby-ng"
end

execute "sudo apt-get update" do
  not_if "dpkg -l ruby2.6"
end

"ruby2.6 ruby2.6-dev ruby-bundler ruby-switch".split.each { |name| package name }

execute "sudo ruby-switch --set ruby 2.6" do
  not_if "ruby -v | grep 2.6"
end

gem_package "bundler"

# install sleep_warm
user "cpg-honey" do
  home "/home/cpg-honey"
  shell "/bin/bash"
  create_home true
end

git "/opt/cpg_honey" do
  repository "https://github.com/ninoseki/cpg_honey.git"
end

execute "bundle install --path vendor/bundle" do
  cwd "/opt/cpg_honey"
  not_if "bundle | grep installed"
end

directory "/var/log/cpg_honey" do
  owner "cpg-honey"
  group "cpg-honey"
end

remote_file "/etc/systemd/system/cpg-honey.service"
remote_file "/opt/cpg-honey/.env"

execute "sudo chown -R cpg-honey:cpg-honey /opt/cpg-honey"

# start the service
execute "sudo systemctl daemon-reload"
%i(enable start).each do |action|
  service "cpg-honey" do
    action action
  end
end
