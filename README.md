# CPG honey

MERCURY CPG honeypot built on Ruby.

## Supported

- Ubuntu 16.04 LTS and Ruby 2.6.

## Installation

### Deploy by Itamae

```bash
$ git clone https://github.com/ninoseki/cpg_honey.git
$ cd cpg_honey
$ itamae ssh -h HOST -u USER cookbooks/default.rb
$ itamae ssh -h HOST -u USER cookbooks/ufw.rb
```

Then the honeypot works as `cpg-honey.service` on `80/tcp` and `9292/tcp`.

### Configuration

All the application configuration is done via `/opt/cpg-honey/.env`.

```
# Do not change this
RACK_ENV=production
# The hostname which Logstash sends the data for
LOGSTASH_HOST=localhost
# The port which Logstash sends the data for
LOGSTASH_PORT=9300
# (Optional) The token which Logstash send the data with.
LOGSTASH_TOKEN=YOUR_TOKEN
```
