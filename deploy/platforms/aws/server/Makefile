_aws_dir := $(dir $(abspath $(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))))
_aws_dir := $(_aws_dir:/=)

_aws_app_dir := $(abspath ${_aws_dir}/../../../..)

_name := grpc-simple
_backend_port := 50051

_key_pair_file := ${_aws_app_dir}/secrets/${_name}.ed25519

plan:
	cd "${_aws_dir}" && \
	terraform plan -var="name=${_name}" -var="backend_port=${_backend_port}"

apply:
	cd "${_aws_dir}" && \
	terraform apply -auto-approve -var="name=${_name}" -var="backend_port=${_backend_port}"

destroy:
	cd "${_aws_dir}" && \
	terraform destroy -auto-approve -var="name=${_name}" -var="backend_port=${_backend_port}"

key-pair:
	mkdir -p "$$(dirname "${_key_pair_file}")" && \
	[ -f "${_key_pair_file}" ] || \
	aws ec2 create-key-pair \
	  --key-name "${_name}" \
	  --key-type 'ed25519' \
	  --output text --query 'KeyMaterial' \
	  > "${_key_pair_file}" && \
	chmod 600 "${_key_pair_file}"

delete-key-pair:
	aws ec2 delete-key-pair --key-name "${_name}" && \
	rm -f "${_key_pair_file}"

ssh:
	"${_aws_dir}"/ssh.sh "${_name}" "${_key_pair_file}"

.PHONY: plan apply destroy key-pair delete-key-pair
