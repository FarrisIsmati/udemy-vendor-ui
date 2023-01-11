# - env | grep -e NEXT_PUBLIC_ >> .env.production will add all NEXT_PUBLIC_* in prod to env var 
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
      APP_ENVIRONMENT = "development"
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

resource "aws_amplify_branch" "master" {
  app_id      = aws_amplify_app.frontend.id
  branch_name = "master"

  stage     = "DEVELOPMENT"

  environment_variables = {
    REACT_APP_API_SERVER = "https://api.example.com"
    NEXT_PUBLIC_VENDORS_WEBSOCKET_URL="wss://8ramd7iqs7.execute-api.us-east-1.amazonaws.com/primary"
    NEXT_PUBLIC_VENDORS_API_URL="https://aak6izqgce.execute-api.us-east-1.amazonaws.com/primary/vendors"
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=var.GOOGLE_MAPS_API_KEY
  }
}

resource "aws_amplify_webhook" "master" { 
  app_id      = aws_amplify_app.frontend.id
  branch_name = aws_amplify_branch.master.branch_name
  description = "triggermaster"
}