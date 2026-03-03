import css from './FilterLayout.module.css';

export default function FilterLayout({
  sidebar,
  list,
}: {
  sidebar: React.ReactNode;
  list: React.ReactNode;
}) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.content}>{list}</section>
    </div>
  );
}
