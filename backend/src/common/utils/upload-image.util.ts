import AWS from 'aws-sdk';

type Credentials = {
  secret: string;
  access: string;
};

type UploadProps = Credentials & {
  bucketName: string;
  file: Express.Multer.File;
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

const changeFileName = (
  file: Express.Multer.File,
  name: string,
): Express.Multer.File => ({
  ...file,
  originalname: name,
});

const uploadImage = ({
  bucketName,
  file,
  ...credentials
}: UploadProps): Promise<AWS.S3.ManagedUpload.SendData> => {
  const s3 = getS3(credentials);

  return s3
    .upload({
      Bucket: bucketName,
      Key: file.originalname,
      Body: file.buffer,
      ACL: 'public-read',
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

export { uploadImage, deleteImage, changeFileName };
