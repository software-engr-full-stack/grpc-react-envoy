variable "name" {
  type = string
  nullable = false
}

variable "backend_port" {
  type = number
}

locals {
  ssh_port = 22
  cidr_block = "10.10.10.0/24"
  region = "us-west-1"
  instance_type = "t2.micro"

  tag = {
    key = "Name"
    value = var.name
  }
}
