# https://sreeraj.dev/setting-up-aws-amplify-for-a-next-js-ssr-app-with-terraform/ START WITH THIS DO THIS SHIT
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


