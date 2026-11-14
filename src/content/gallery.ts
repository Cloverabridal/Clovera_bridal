/**
 * Photo albums shown on /gallery and, via `featured`, in the home-page
 * slideshow.
 *
 * To add an album: put the web-sized photos (about 2000px on the long edge,
 * JPEG) in public/gallery/<slug>/ as 01.jpg, 02.jpg … in display order, then
 * add an entry below with each photo's pixel size. `featured` lists the
 * indexes (0-based, within `photos`) to show in the home-page slideshow.
 */

type Localized = { en: string; vi: string };

export type GalleryPhoto = { file: string; w: number; h: number };

export type Album = {
  slug: string;
  /** Names shown as the album title (English version has no diacritics: Displace lacks them). */
  title: Localized;
  /** Line above the title, e.g. "Bride … & Groom …". */
  couple: Localized;
  photos: GalleryPhoto[];
  featured: number[];
};

export const albums: Album[] = [
  {
    slug: "ngoc-minh-duy-ben",
    title: { en: "Ngoc Minh & Duy Ben", vi: "Ngọc Minh & Duy Ben" },
    couple: {
      en: "Bride Ngoc Minh & Groom Duy Ben",
      vi: "Cô dâu Ngọc Minh & Chú rể Duy Ben",
    },
    featured: [0, 1, 4, 6, 8, 9, 12, 5, 3, 11],
    photos: [
      { file: "01.jpg", w: 1333, h: 2000 },
      { file: "02.jpg", w: 1333, h: 2000 },
      { file: "03.jpg", w: 1333, h: 2000 },
      { file: "04.jpg", w: 1333, h: 2000 },
      { file: "05.jpg", w: 1333, h: 2000 },
      { file: "06.jpg", w: 1333, h: 2000 },
      { file: "07.jpg", w: 2000, h: 1333 },
      { file: "08.jpg", w: 1333, h: 2000 },
      { file: "09.jpg", w: 1333, h: 2000 },
      { file: "10.jpg", w: 1333, h: 2000 },
      { file: "11.jpg", w: 1333, h: 2000 },
      { file: "12.jpg", w: 1333, h: 2000 },
      { file: "13.jpg", w: 2000, h: 1333 },
      { file: "14.jpg", w: 1333, h: 2000 },
      { file: "15.jpg", w: 2000, h: 1333 },
      { file: "16.jpg", w: 1333, h: 2000 },
      { file: "17.jpg", w: 1333, h: 2000 },
      { file: "18.jpg", w: 1333, h: 2000 },
      { file: "19.jpg", w: 1333, h: 2000 },
      { file: "20.jpg", w: 1333, h: 2000 },
      { file: "21.jpg", w: 1333, h: 2000 },
      { file: "22.jpg", w: 1333, h: 2000 },
      { file: "23.jpg", w: 1333, h: 2000 },
      { file: "24.jpg", w: 1333, h: 2000 },
      { file: "25.jpg", w: 1334, h: 2000 },
      { file: "26.jpg", w: 1333, h: 2000 },
      { file: "27.jpg", w: 1333, h: 2000 },
      { file: "28.jpg", w: 1333, h: 2000 },
      { file: "29.jpg", w: 1333, h: 2000 },
    ],
  },
];

export function photoUrl(album: Album, photo: GalleryPhoto) {
  return `/gallery/${album.slug}/${photo.file}`;
}

/** Photos of an album in the shape the gallery grid and viewer expect. */
export function albumPhotos(album: Album, lang: "en" | "vi") {
  return album.photos.map((photo, i) => ({
    src: photoUrl(album, photo),
    w: photo.w,
    h: photo.h,
    alt: `${album.title[lang]} — ${String(i + 1).padStart(2, "0")}`,
  }));
}

/** Featured photos from every album, for the home-page slideshow. */
export function homeSlides(lang: "en" | "vi") {
  return albums.flatMap((album) => {
    const all = albumPhotos(album, lang);
    return album.featured.map((i) => all[i]).filter(Boolean);
  });
}
