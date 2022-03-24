variable "region" {
  type = string
}

resource "aws_vpc" "grpc_simple" {
  cidr_block = var.cidr_block

  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Name = var.tag.value
  }
}

resource "aws_subnet" "grpc_simple" {
  vpc_id = aws_vpc.grpc_simple.id
  cidr_block = var.cidr_block
  availability_zone = format("%s%s", var.region, "a")
  tags = {
    Name = var.tag.value
  }
}

resource "aws_internet_gateway" "grpc_simple" {
  vpc_id = aws_vpc.grpc_simple.id

  tags = {
    Name = var.tag.value
  }
}

resource "aws_route_table" "grpc_simple" {
  vpc_id = aws_vpc.grpc_simple.id

  tags = {
    Name = var.tag.value
  }
}

resource "aws_route_table_association" "grpc_simple" {
  route_table_id = aws_route_table.grpc_simple.id

  subnet_id = aws_subnet.grpc_simple.id
}

resource "aws_route" "grpc_simple" {
  route_table_id         = aws_route_table.grpc_simple.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.grpc_simple.id
}

output "vpc" {
  value = {
    subnet = aws_subnet.grpc_simple
    vpc    = aws_vpc.grpc_simple
  }
}
