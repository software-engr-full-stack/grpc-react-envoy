resource "aws_instance" "grpc_simple" {
  associate_public_ip_address = true
  ami                         = data.aws_ami.grpc_simple.id
  key_name                    = var.name
  vpc_security_group_ids      = [module.network.firewall.id]

  instance_type               = local.instance_type
  subnet_id                   = module.network.vpc.subnet.id
  source_dest_check           = false

  tags = {
    ResourceType = "instance"
    Name = var.name
  }
}
