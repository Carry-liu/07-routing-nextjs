import NotePreview from '@/components/NotePreview/NotePreview';

export default function NotePreviewModal({ params }: { params: { id: string } }) {
  return <NotePreview id={params.id} />;
}
