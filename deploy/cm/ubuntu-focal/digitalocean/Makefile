_mkfile_dir := $(dir $(abspath $(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))))
_mkfile_dir := $(_mkfile_dir:/=)

_app_dir := ${_mkfile_dir}/../../../..

_inventory_file := /tmp/ansible/grpc/ubuntu-focal_digitalocean.inventory

-create-inventory-file:
	mkdir -p $$(dirname "${_inventory_file}") && \
	remote_ips="$$(${_mkfile_dir}/config.py ips)" envsubst \
		< ${_mkfile_dir}/inventory.template \
		> ${_inventory_file}

debug:
	./config.py domain

run: -create-inventory-file
	cd "${_mkfile_dir}" && \
	ansible-playbook \
		--inventory-file "${_inventory_file}" \
		--extra-vars "@vars.yml" \
		--extra-vars "domain=$$(${_mkfile_dir}/config.py domain)" \
		"${_mkfile_dir}/playbook.yml"

# # do_reset_and_migrate=yes: run on one server first, then
# #   do_reset_and_migrate=no on the rest of the servers
# cm-ubuntu-focal-digitalocean-run: -cm-ubuntu-focal-digitalocean-build-inventory
# 	cd "${_mkfile_dir}" && \
# 	ansible-playbook \
# 		--inventory-file "${_inventory_file}" \
# 		--extra-vars secrets_dir="${_secrets_dir}" \
# 		--extra-vars do_reset_and_migrate='yes' \
#     --extra-vars "@${_mkfile_dir}/../../vars.yml" \
#     --extra-vars "cm_dir=${_cm_dir}" \
#     --extra-vars "@${_app_dir}/db/postgres.yml" \
#     --extra-vars '{"tls_container":${tls}}' \
#     --extra-vars "fetched_tls_files_dir=${fetched_tls_files_dir}" \
#     --extra-vars '@${domain_config_file}' \
# 		${_mkfile_dir}/playbook.yml

.PHONY: -create-inventory-file
