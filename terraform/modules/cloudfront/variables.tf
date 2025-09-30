variable "cert_arn" {
  type        = string
  description = "certificate arn to use with distribution"
}

variable "s3_bucket_url" {
  type        = string
  description = "s3 bucket origin url"
}

variable "aliases" {
  type        = list(string)
  description = "cloudfront aliases"
}

variable "tags" {
  type        = map(any)
  default     = {}
  description = "Resources tags"
}
