# Terraform Infrastructure

Infrastructure as Code (IaC) for deploying Ciyex on AWS.

## Directory Structure

```
kube-terraform/
├── modules/
│   ├── vpc/         # Networking (Subnets, NAT Gateway)
│   ├── eks/         # Kubernetes Cluster
│   ├── rds/         # PostgreSQL Database
│   ├── elastic/     # Elasticsearch/OpenSearch
│   └── s3/          # Storage Buckets
├── environments/
│   ├── dev/         # Development config
│   └── prod/        # Production config
└── main.tf          # Root module
```

## Core Modules

### VPC
Creates a secure network topology with Public/Private subnets across 3 Availability Zones.

```hcl
module "vpc" {
  source = "../../modules/vpc"
  cidr_block = "10.0.0.0/16"
  environment = "prod"
}
```

### EKS (Kubernetes)
Provisions the master control plane and worker node groups.

```hcl
module "eks" {
  source = "../../modules/eks"
  cluster_name = "ciyex-prod"
  node_groups = {
    general = {
      instance_types = ["t3.large"]
      scaling_config = {
        min_size = 3
        max_size = 10
      }
    }
  }
}
```

### RDS (Database)
Provisions Multi-AZ PostgreSQL 16.

```hcl
module "rds" {
  source = "../../modules/rds"
  allocated_storage = 100
  instance_class = "db.t3.xlarge"
  multi_az = true
}
```

## State Management
Terraform state is stored remotely in S3 with DynamoDB locking.

```hcl
terraform {
  backend "s3" {
    bucket = "ciyex-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
    dynamodb_table = "terraform-locks"
  }
}
```

## Applying Changes

1. **Init**: `terraform init`
2. **Plan**: `terraform plan -var-file=environments/prod.tfvars`
3. **Apply**: `terraform apply -var-file=environments/prod.tfvars`

## Cost Estimation
Run `infracost` against the plan to see monthly estimates.
