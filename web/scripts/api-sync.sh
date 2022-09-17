
set -e

cd "$( dirname $0 )/.."


source .env

if [ -z "$GRAPHQL_ENDPOINT" ]; then
  echo "GRAPHQL_ENDPOINT env variable is undefiend"
  exit -1
fi

echo "Clean"

rm -f schema.graphql
rm -rf graphql/generated

echo "Generating graphql schema"

yarn --silent get-graphql-schema $GRAPHQL_ENDPOINT > schema.graphql

echo "Generation graphql queries"

yarn --silent gqlg --schemaFilePath schema.graphql --destDirPath ./graphql/generated --depthLimit 5
find graphql/ -type f -name "*.js" -delete

echo "Generation graphql client"

yarn graphql-codegen