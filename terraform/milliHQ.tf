module "tf_next" {
  source  = "milliHQ/next-js/aws"
  version = "1.0.0-canary.5"

  deployment_name = "tf-next-example-complete"

  providers = {
    aws.global_region = aws.global_region
  }

  # Uncomment when using in the cloned monorepo for tf-next development
  # source = "../.."
  # debug_use_local_packages = true
}

output "cloudfront_domain_name" {
  value = module.tf_next.cloudfront_domain_name
}