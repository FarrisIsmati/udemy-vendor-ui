variable "aws_region" {
    description = "AWS Region"
}

variable "app_name" {
  type        = string
  description = "Application Name"
  default     = "udemy-vendor-ui"
}

variable "repo" {}

variable "PAT" {}