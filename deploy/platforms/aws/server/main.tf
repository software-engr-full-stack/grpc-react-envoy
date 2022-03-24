terraform {
  required_version = ">= 1.1.5"

  # backend "local" {
  #   path = "./terraform.tfstate"
  # }

  cloud {
    organization = "software-engr-full-stack"
    workspaces {
      name = "grpc-simple"
    }
  }
}

provider "aws" {
  region = local.region
}

module "network" {
  source = "../networking"

  tag = local.tag
  cidr_block = local.cidr_block
  region = local.region

  ssh_port = local.ssh_port
  backend_port = var.backend_port
}
