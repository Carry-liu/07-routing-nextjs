import NotePreviewClient from './NotePreview.client';

export default function NoteModalPage({ params }: { params: { id: string } }) {
  return <NotePreviewClient id={params.id} />;
}
