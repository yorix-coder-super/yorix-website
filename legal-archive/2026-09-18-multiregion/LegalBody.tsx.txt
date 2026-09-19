import { Fragment, type ReactNode } from 'react';

// Legal texts are written as data (Russian and English side by side) and
// rendered here. Inline markup: [label](href) for links, **text** for bold.
export type Block = string | { ul: string[] } | { ol: string[] } | { table: { head: string[]; rows: string[][] } } | { note: string };
export type LegalSection = { id?: string; title: string; blocks: Block[] };

function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      const external = /^https?:/.test(match[2]);
      parts.push(
        <a href={match[2]} key={key++} {...(external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}>
          {match[1]}
        </a>,
      );
    } else {
      parts.push(<strong key={key++}>{match[3]}</strong>);
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function BlockView({ block }: { block: Block }) {
  if (typeof block === 'string') return <p><Inline text={block} /></p>;
  if ('ul' in block) return <ul>{block.ul.map((item) => <li key={item}><Inline text={item} /></li>)}</ul>;
  if ('ol' in block) return <ol>{block.ol.map((item) => <li key={item}><Inline text={item} /></li>)}</ol>;
  if ('note' in block) return <blockquote><p><Inline text={block.note} /></p></blockquote>;
  return (
    <div className="legal-table">
      <table>
        <thead>
          <tr>{block.table.head.map((cell) => <th key={cell}>{cell}</th>)}</tr>
        </thead>
        <tbody>
          {block.table.rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell, index) => (
                <td data-label={block.table.head[index]} key={`${index}-${cell}`}>
                  <Inline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegalBody({ sections }: { sections: LegalSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <Fragment key={section.title}>
          <h2 id={section.id}>{section.title}</h2>
          {section.blocks.map((block, index) => <BlockView block={block} key={index} />)}
        </Fragment>
      ))}
    </>
  );
}
