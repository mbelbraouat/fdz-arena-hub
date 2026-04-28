import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hidden keyboard shortcut to access the admin panel.
 * Press Ctrl+Shift+A (or Cmd+Shift+A on Mac) anywhere on the site.
 */
export function AdminHotkey() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  return null;
}
