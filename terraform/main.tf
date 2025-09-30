locals {
  environment = "prod"
  name_prefix = "${var.REPO_NAME}-${local.environment}"  
  common_tags = {
    Environment = local.environment
    Project     = var.REPO_NAME
    Terraform   = "true"
  } 
  domain = "${var.DOMAIN}"
}

module "fe" {
  source = "./modules/s3/"
  name   = "${local.name_prefix}-website-frontend"
}

# module "acm-cert-cf" {
#   source = "./modules/cert/"
#   # providers = {
#   #   aws = aws.us-east-2
#   # }
#   domain = local.domain
#   tags   = local.common_tags
# }

module "cloudfront" {
  depends_on = [ module.fe ]
  source        = "./modules/cloudfront/"
  cert_arn      = "" # module.acm-cert-cf.cert_id
  s3_bucket_url = module.fe.bucket_endpoint
  aliases       = [] # [ "${local.domain}"]
  tags          = local.common_tags
}
