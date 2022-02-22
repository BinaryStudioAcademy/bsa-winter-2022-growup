import { ChangeEvent, FormEvent, memo } from 'react';
import { Form } from 'react-bootstrap';
import { useState, useRef, useCallback } from 'hooks/hooks';

import ReactCropper, { Crop } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

type Props = {
  onSave: (data: Blob) => void;
};

const Cropper: React.FC<Props> = memo(({ onSave: save }) => {
  const [crop, setCrop] = useState<Partial<Crop>>({
    unit: 'px',
    width: 200,
    aspect: 1,
  });
  const [upImg, setUpImg] = useState('');
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const onSave = (e: FormEvent): void => {
    e.preventDefault();

    if (
      completedCrop === null ||
      canvasRef.current === null ||
      imgRef.current === null
    )
      return;

    const image = imgRef.current as HTMLImageElement;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const pixelRatio = window.devicePixelRatio;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width * pixelRatio * scaleX;
    canvas.height = completedCrop.height * pixelRatio * scaleY;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        save(blob);
      },
      'image/jpeg',
      1,
    );
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ width: 200, height: 200 }} />
      <Form.Control
        placeholder="Image"
        type="file"
        onChange={onSelectFile}
        accept="image/*"
      />

      <ReactCropper
        src={upImg}
        crop={crop}
        onChange={(e): void => setCrop(e)}
        onComplete={(e): void => setCompletedCrop(e)}
        onImageLoaded={onLoad}
        minHeight={200}
        minWidth={200}
      />
      <div className="d-flex" onClick={onSave}>
        <button className="btn btn-outline-gu-purple flex-fill fw-bold border-2">
          Save
        </button>
      </div>
    </>
  );
});

export default Cropper;
