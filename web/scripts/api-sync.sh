
set -e

cd "$( dirname $0 )/.."

ENV="../.env"
if [[ -f "$ENV" ]]; then
    source $ENV
fi

if [ -z "$GRAPHQL_ENDPOINT" ]; then
  echo "GRAPHQL_ENDPOINT env variable is undefined"
  exit -1
fi

echo "Clean"

BUILD_PATH="./graphql/generated"

rm -f schema.graphql
rm -rf $BUILD_PATH

echo "Generating graphql schema"

yarn --silent get-graphql-schema $GRAPHQL_ENDPOINT > schema.graphql

echo "Generation graphql queries"

yarn --silent gqlg --schemaFilePath schema.graphql --destDirPath $BUILD_PATH --depthLimit 5
find $BUILD_PATH -type f -name "*.js" -delete

echo "Generation graphql client"

yarn graphql-codegen