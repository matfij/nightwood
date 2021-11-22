.ONESHELL:

gen.client:
	cp backend/api-schema.json generator/api-schema.json
	cp generator/openapitools.json openapitools.json 
	npx @openapitools/openapi-generator-cli generate
	rm openapitools.json
