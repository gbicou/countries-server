target "docker-metadata-action" {}

group "default" {
  inherits = ["docker-metadata-action"]
  targets = ["bootstrap", "server"]
}

target "bootstrap" {
#  platforms = ["linux/amd64"]
#  tags = ["bicou/countries-server-bootstrap:test"]
}

target "server" {
#  platforms = ["linux/amd64"]
#  tags = ["bicou/countries-server-server:test"]
}
