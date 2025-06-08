#!/bin/sh

echo $S3_BUCKET
echo $DISTRIBUTION_ID

pnpm build

if [ $? != 0 ]; then
  exit 1
fi

aws s3 sync ./dist/ s3://$S3_BUCKET

if [ $? != 0 ]; then
  exit 1
fi

aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

if [ $? != 0 ]; then
  exit 1
fi