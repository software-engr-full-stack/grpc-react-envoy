#!/usr/bin/env python

import pathlib
import inspect
import yaml
import sys

# Config file $app_dir/secrets/digitalocean.yml format:
# domain: 'host.domain.tld'
# ips:
#   - '1.2.3.4'


class Config(object):
    def __init__(self, key):
        this_file = pathlib.Path((inspect.getfile(inspect.currentframe())))
        app_dir = this_file.joinpath('..', '..', '..', '..', '..').resolve()

        with open(app_dir.joinpath('secrets', 'digitalocean.yml'), 'r') as stream:
            data = yaml.safe_load(stream)

        ips_key = 'ips'
        if key == ips_key:
            print("\n".join(data[key]))
            return

        print(data[key])


Config(sys.argv[1])
