# Work on build first locally
# FIgure this out
resource "aws_amplify_app" "frontend" {
  name = "${var.app_name}"
  repository = "https://github.com/FarrisIsmati/udemy-vendor-ui"
  access_token = var.PAT

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - yarn install
        build:
          commands:
            - yarn run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  enable_auto_branch_creation = true
  enable_branch_auto_build = true
  enable_branch_auto_deletion = true
  platform = "WEB"

  auto_branch_creation_config {
    enable_pull_request_preview = true
    environment_variables = {
      APP_ENVIRONMENT = "develop"
    }
  }

  iam_service_role_arn = aws_iam_role.amplify_role.arn

#   # Comment this on the first run, trigger a build of your branch, This will added automatically on the console after deployment. Add it here to ensure your subsequent terraform runs don't break your amplify deployment.
#   custom_rule {
#     source = "/<*>"
#     status = "200"
#     target = "https://xxx.cloudfront.net/<*>" 
#   }

  custom_rule {
    source = "/<*>"
    status = "404-200"
    target = "/index.html"  
  }

  tags = {
    name     = var.app_name
  }
}