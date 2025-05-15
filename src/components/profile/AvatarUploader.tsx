import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import api from '../../services/api';
import type User from '../../types/User';

interface AvatarUploaderProps {
  isEditing: boolean;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  onSuccess?: () => void;
  onStartUpload?: () => void;
}

function AvatarUploader({
  isEditing,
  setUserData,
  onSuccess,
}: AvatarUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setLoading(true);
      const res = await api.patch('/me/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUserData((prev) =>
        prev ? { ...prev, avatar: res.data.avatar } : prev,
      );
      setPreview(null);
      onSuccess?.();
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error("Erreur lors de l'upload de l'avatar", err);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  if (!isEditing) return null;

  return (
    <div {...getRootProps()} className="avatar-dropzone">
      <input {...getInputProps()} />
      {loading ? (
        <p>Chargement...</p>
      ) : preview ? (
        <img src={preview} alt="Preview" className="avatar-preview" />
      ) : (
        <p>Cliquez sur l'image pour en choisir une</p>
      )}
    </div>
  );
}

export default AvatarUploader;
