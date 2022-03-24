#!/usr/bin/env bash

run() {
  local tag="${1?:ERROR => must pass tag}"
  local id_file="${2?:ERROR => must pass id file}"
  shift
  shift

  local upload_files="${UPLOAD_FILES-}"

  local external_ip=$(aws ec2 describe-instances \
    --filters "Name=tag:Name,Values=$tag" "Name=instance-state-name,Values=running" \
    --output text --query 'Reservations[].Instances[].PublicIpAddress')

  if [ -n "$upload_files" ]; then
    echo "... uploading files [$upload_files] to host tagged '$tag'..."
    scp -i "$id_file" \
      -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
      $upload_files \
      ubuntu@"$external_ip":~/
  else
    ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
      -i "$id_file" ubuntu@${external_ip} "$@"
  fi
}

set -o errexit
set -o pipefail
set -o nounset
run "$@"
