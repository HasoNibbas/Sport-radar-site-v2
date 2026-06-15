// src/utils/media.ts
import { API_BASE_URL } from '../api/axiosInstance';

export function getMediaUrl(pathOrUrl: string | File | null | undefined): string | undefined {
    // Si le chemin est vide, null ou undefined, on ne fait rien.
    if (!pathOrUrl) {
        return undefined;
    }

    // ✅ NOUVELLE SÉCURITÉ : Si on reçoit un objet File, on essaie de créer une URL locale pour l'aperçu.
    // C'est utile pour les formulaires. Pour les pages d'affichage, cette condition ne sera jamais vraie.
    if (pathOrUrl instanceof File) {
        return URL.createObjectURL(pathOrUrl);
    }

    // Si le chemin est déjà une URL complète, on le renvoie directement.
    if (pathOrUrl.startsWith('http://' ) || pathOrUrl.startsWith('https://' )) {
        return pathOrUrl;
    }

    const apiBaseUrl = import.meta.env.VITE_MEDIA_URL || API_BASE_URL;

    // On nettoie le chemin pour s'assurer qu'il n'y a pas de slash au début.
    const cleanedPath = pathOrUrl.startsWith('/') ? pathOrUrl.substring(1) : pathOrUrl;

    // On construit l'URL finale.
    return `${apiBaseUrl}/media/${cleanedPath}`;
}
