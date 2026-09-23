import { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { Link } from 'wouter';
import type { Story } from '@/data/stories';
import { storyAgeLabels } from '@/data/stories';

function StoryPlaceholder({ story }: { story: Story }) {
  return (
    <div className={`story-reader-image story-reader-image-${story.id}`} aria-label={story.imageAlt}>
      {story.image ? (
        <img src={story.image} alt={story.imageAlt} />
      ) : (
        <div className="story-placeholder-content">
          <span className="story-placeholder-icon"><ImageOff size={25} /></span>
          <span>Imagem em breve</span>
        </div>
      )}
    </div>
  );
}

export function StoryReaderPage({ story }: { story: Story }) {
  const [page, setPage] = useState(0);
  const isLastPage = page === story.text.length - 1;
  const currentPage = story.text[page];
  const ageLabel = story.ageRange ? storyAgeLabels[story.ageRange] : 'Faixa etária a definir';

  return (
    <section className="subpage story-reader-page" data-testid={`page-story-${story.id}`}>
      <Link href="/criar" className="story-back-link" data-testid="link-back-to-stories">
        <ChevronLeft size={17} /> voltar para histórias
      </Link>
      <div className="story-reader-layout">
        <div className="story-reader-aside">
          <StoryPlaceholder story={story} />
          <div className="story-reader-meta">
            <span className="eyebrow"><BookOpen size={14} /> HISTÓRIA</span>
            <span className="story-reader-age">{ageLabel}</span>
          </div>
        </div>
        <article className="story-reader-content">
          <div className="story-reader-heading">
            <span className="eyebrow"><span className="eyebrow-line" /> LEITURA DA AMORA</span>
            <h1>{story.title}</h1>
            <span className="story-page-count">página {page + 1} de {story.text.length}</span>
          </div>
          <div className="story-page-text">
            {currentPage.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {isLastPage && (
            <section className="story-interpretation" aria-labelledby="story-interpretation-title">
              <span className="eyebrow"><span className="eyebrow-line" /> DEPOIS DA HISTÓRIA</span>
              <h2 id="story-interpretation-title">O que a história ensina?</h2>
              {story.interpretation.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          )}
          <div className="story-reader-controls">
            <button
              className="story-reader-button story-reader-button-secondary"
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              disabled={page === 0}
              data-testid="button-story-previous"
            >
              <ChevronLeft size={18} /> anterior
            </button>
            <div className="story-page-dots" aria-label={`Página ${page + 1} de ${story.text.length}`}>
              {story.text.map((_, index) => <span key={index} className={index === page ? 'active' : ''} />)}
            </div>
            {isLastPage ? (
              <Link href="/criar" className="story-reader-button story-reader-button-primary" data-testid="button-story-finish">
                voltar às histórias <ChevronRight size={18} />
              </Link>
            ) : (
              <button
                className="story-reader-button story-reader-button-primary"
                onClick={() => setPage((current) => Math.min(story.text.length - 1, current + 1))}
                data-testid="button-story-next"
              >
                próxima <ChevronRight size={18} />
              </button>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}