import AWS from 'aws-sdk';
import { UploadedFile } from 'express-fileupload';

type Credentials = {
  secret: string;
  access: string;
};

type UploadProps = Credentials & {
  bucketName: string;
  file: UploadedFile;
};

type DeleteProps = Credentials & {
  bucketName: string;
  fileName: string;
};

const getS3 = ({ secret, access }: Credentials): AWS.S3 => {
  return new AWS.S3({
    credentials: {
      accessKeyId: access,
      secretAccessKey: secret,
    },
  });
};

const uploadImage = ({
  bucketName,
  file,
  ...credentials
}: UploadProps): Promise<AWS.S3.ManagedUpload.SendData> => {
  const s3 = getS3(credentials);

  return s3
    .upload({
      Bucket: bucketName,
      Key: file.name,
      Body: file.data,
    })
    .promise();
};

const deleteImage = ({
  bucketName,
  fileName,
  ...credentials
}: DeleteProps): Promise<unknown> => {
  const s3 = getS3(credentials);

  return s3
    .deleteObject({
      Bucket: bucketName,
      Key: fileName,
    })
    .promise();
};

export { uploadImage, deleteImage };
