import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import { Form, Card } from 'react-bootstrap';
import ReactCropper from 'react-cropper';
import { NotificationManager } from 'react-notifications';
import { Button } from 'components/common/common';
import { ICompany } from 'common/interfaces/company/company';

import 'cropperjs/dist/cropper.css';

type Props = {
  company?: ICompany;
  setFile: (file: File) => void;
};

export const EditAvatar: React.FC<Props> = ({ company, setFile }) => {
  const [image, setImage] = useState<string>('');
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (company && company.avatar) {
      setAvatar(company.avatar);
    }
  }, [company]);

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
      setAvatar('');
      const reader = new FileReader();
      reader.addEventListener('load', () => setImage(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const cancel = (): void => {
    const { current } = fileInputRef;

    if (current) {
      current.value = '';
    }
    setImage('');
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
        />
      )}
      {image && (
        <Button variant="gu-blue" className="flex-fill" onClick={cancel}>
          Cancel
        </Button>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default EditAvatar;
