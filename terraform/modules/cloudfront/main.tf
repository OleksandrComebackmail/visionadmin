module "cdn" {
  source  = "terraform-aws-modules/cloudfront/aws"
  version = "3.2.1"

  comment             = "${var.s3_bucket_url}"
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"
  retain_on_delete    = false
  wait_for_deployment = false

  aliases = var.aliases
  #  create_origin_access_identity = false
  #  origin_access_identities = {
  #    s3_bucket_one = "DevOps and locksmith blog bucket CloudFront can access"
  #  }

  origin = {
    "main" = {
      domain_name = "${var.s3_bucket_url}"
      custom_origin_config = {
        http_port              = 80
        https_port             = 443
        origin_protocol_policy = "http-only"
        origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
      }
    }
  }

  default_cache_behavior = {
    target_origin_id       = "main"
    viewer_protocol_policy = "redirect-to-https"


    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD"]
    compress        = true
    query_string    = true
  }

  # viewer_certificate = {
  #   acm_certificate_arn = "${var.cert_arn}"
  #   ssl_support_method  = "sni-only"
  # }
  tags = merge({
    Terraform = "1"
  }, var.tags)
}
