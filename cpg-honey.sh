#!/bin/bash
cd /opt/cpg-honey

bundle exec puma -C config/puma.rb
