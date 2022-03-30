import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import { Form, Card } from 'react-bootstrap';
import ReactCropper from 'react-cropper';
import { NotificationManager } from 'react-notifications';
import { Button } from 'components/common/common';
import { ICompany } from 'common/interfaces/company/company';

import 'cropperjs/dist/cropper.css';

type Props = {
  company?: ICompany;
  setFile: (blob: Blob) => void;
  setDisable: (value: boolean) => void;
};

export const EditAvatar: React.FC<Props> = ({
  company,
  setFile,
  setDisable,
}) => {
  const [error, setError] = useState('');
  const [image, setImage] = useState<string>('');
  const [avatar, setAvatar] = useState<string>(company?.avatar || '');

  const [cropper, setCropper] = useState<Cropper>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      NotificationManager.error(error);
    }
  }, [error]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size > 1024 * 1024) {
        setError('File is too big. Max size - 1mb');
        return;
      }

      setError('');
      const reader = new FileReader();
      reader.addEventListener('load', () => setImage(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
      setDisable(true);
    }
  };

  const choose = (): void => {
    if (typeof cropper !== 'undefined') {
      cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          setFile(blob);
          setAvatar('');
          setImage('');
          setDisable(false);
        }
      });
    }
  };

  const cancel = (): void => {
    const { current } = fileInputRef;

    if (current) {
      current.value = '';
    }
    setImage('');
    setDisable(false);
    if (company && company.avatar) {
      setAvatar(company.avatar);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center gap-3">
      <Form.Control
        placeholder="image"
        type="file"
        onChange={onSelectFile}
        accept="image/*"
        ref={fileInputRef}
      />
      {avatar && (
        <Card.Img
          src={avatar ? avatar : 'holder.js/100px180'}
          alt={company ? company.name : 'image'}
          className="w-100"
        />
      )}
      {image && (
        <>
          <ReactCropper
            className="w-100"
            style={{ height: 100 }}
            zoomTo={0.5}
            initialAspectRatio={1}
            aspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={200}
            minCropBoxWidth={200}
            background
            autoCropArea={1}
            checkOrientation={false}
            responsive
            guides
            onInitialized={(instance: Cropper): void => setCropper(instance)}
          />
          <div className="d-flex gap-2">
            <Button
              variant="gu-blue"
              className="flex-fill"
              size="sm"
              onClick={cancel}
            >
              Cancel
            </Button>
            <Button
              variant="gu-pink"
              className="flex-fill text-white"
              size="sm"
              onClick={choose}
            >
              Choose
            </Button>
          </div>
        </>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default EditAvatar;
