'use client';

import { useParams } from 'next/navigation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';

import type { Note, NoteTag } from '@/types/note';
import css from './Notes.module.css';

const allowedTags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NotesClient() {
  const params = useParams<{ slug?: string[] }>();
  const raw = params?.slug?.[0] ?? 'all';

  const normalizedTag: NoteTag | undefined =
    raw === 'all' ? undefined : allowedTags.includes(raw as NoteTag) ? (raw as NoteTag) : undefined;

  const { data, isPending, isError } = useQuery({
    queryKey: ['notes', 1, '', normalizedTag ?? 'all'],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
        tag: normalizedTag,
      }),
    placeholderData: keepPreviousData,
  });

  const notes: Note[] = data?.notes ?? [];

  return (
    <div className={css.wrapper}>
      {isPending && <Loader />}
      {isError && !isPending && (
        <ErrorMessage message="Something went wrong. Notes cannot be displayed" />
      )}
      {!isPending && !isError && notes.length > 0 && <NoteList notes={notes} />}
      {!isPending && !isError && notes.length === 0 && <p>No notes found.</p>}
    </div>
  );
}
