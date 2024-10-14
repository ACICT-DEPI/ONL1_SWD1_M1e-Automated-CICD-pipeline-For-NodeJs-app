provider "aws" {
  region = "us-east-1"
}

resource "aws_key_pair" "key" {
  key_name   = "deployer-key"
  public_key = file("~/.ssh/id_rsa.pub") // Ensure this file exists and contains your public key
}

resource "aws_security_group" "allow_ssh_http" {
  name        = "allow_ssh_http"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] // Allows SSH access from anywhere (use with caution)
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] // Allows HTTP access from anywhere (use with caution)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" // Allows all outbound traffic
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0fff1b9a61dec8a5f" // Ensure this AMI ID is valid for the region you specified
  instance_type = "t2.micro"
  key_name      = aws_key_pair.key.key_name // Correct reference to the key_name attribute
  security_groups = [aws_security_group.allow_ssh_http.name]

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo yum install docker -y
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo yum install ansible -y
              EOF

  tags = {
    Name = "DevOps-Project-Server"
  }
}
