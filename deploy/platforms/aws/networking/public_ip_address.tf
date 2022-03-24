resource "aws_eip" "grpc_simple" {
  tags = {
    Name = var.tag.value
  }
  vpc = true
}

output "eip" {
  value = aws_eip.grpc_simple
}
