# # https://maxrohde.com/2022/01/21/deploy-serverless-next-js-to-aws-with-terraform-1-1

terraform {
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~> 4.0"
    }
  }

  backend "s3" {} // this is called partial configuration https://developer.hashicorp.com/terraform/language/settings/backends/configuration#partial-configuration
}

provider "aws" {
    region = "${var.aws_region}"
}

data "aws_caller_identity" "current" {}

locals {
  account_id = data.aws_caller_identity.current.account_id
}

# # A local value can only be accessed in expressions within the module where it was declared.
# # This lets you broadcast it
# output "account_id" {
#   value = local.account_id
# }
