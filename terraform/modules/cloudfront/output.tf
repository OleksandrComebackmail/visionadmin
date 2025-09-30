output "cloudfront_url" {
  value = module.cdn.cloudfront_distribution_domain_name
}