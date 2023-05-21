import { useEffect } from 'react';

export function Modal({ currentImage: { alt, src }, closeModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div>
      <div>
        <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={alt} />
        <button type="button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}
