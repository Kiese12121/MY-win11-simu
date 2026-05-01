import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Search, Star, Folder, HardDrive, Clock, Image, Music, Video, FileText, Download, ChevronUp } from 'lucide-react';
import { useWindows } from '../../context/WindowContext';
import { THEMES } from '../../constants';

export default function FileExplorer() {
  const { language, activeViruses, systemTheme } = useWindows();
  const [currentPath, setCurrentPath] = useState(['This PC']);
  const [searchQuery, setSearchQuery] = useState('');
  const isDark = THEMES[systemTheme].mode === 'dark';

  const t = ({
    pt: {
      recent: 'Recentes',
      favorites: 'Favoritos',
      desktop: 'Área de Trabalho',
      downloads: 'Downloads',
      documents: 'Documentos',
      pictures: 'Imagens',
      music: 'Músicas',
      videos: 'Vídeos',
      thisPC: 'Este Computador',
      search: 'Pesquisar em Este Computador',
      name: 'Nome',
      date: 'Data de modificação',
      type: 'Tipo',
      size: 'Tamanho',
      hacked: 'hacked by nooescape'
    },
    en: {
      recent: 'Recent',
      favorites: 'Favorites',
      desktop: 'Desktop',
      downloads: 'Downloads',
      documents: 'Documents',
      pictures: 'Pictures',
      music: 'Music',
      videos: 'Videos',
      thisPC: 'This PC',
      search: 'Search This PC',
      name: 'Name',
      date: 'Date modified',
      type: 'Type',
      size: 'Size',
      hacked: 'hacked by nooescape'
    },
    es: {
      recent: 'Recientes',
      favorites: 'Favoritos',
      desktop: 'Escritorio',
      downloads: 'Descargas',
      documents: 'Documentos',
      pictures: 'Imágenes',
      music: 'Música',
      videos: 'Vídeos',
      thisPC: 'Este Equipo',
      search: 'Buscar en Este Equipo',
      name: 'Nombre',
      date: 'Fecha de modificación',
      type: 'Tipo',
      size: 'Tamaño',
      empty: 'Esta carpeta está vacía.',
      hacked: 'hacked by nooescape'
    },
    it: {
      recent: 'Recenti',
      favorites: 'Preferiti',
      desktop: 'Desktop',
      downloads: 'Download',
      documents: 'Documenti',
      pictures: 'Immagini',
      music: 'Musica',
      videos: 'Video',
      thisPC: 'Questo PC',
      search: 'Cerca in Questo PC',
      name: 'Nome',
      date: 'Data modifica',
      type: 'Tipo',
      size: 'Dimensioni',
      empty: 'Questa cartella è vuota.',
      hacked: 'hacked by nooescape'
    },
    de: {
      recent: 'Zuletzt verwendet',
      favorites: 'Favoriten',
      desktop: 'Desktop',
      downloads: 'Downloads',
      documents: 'Dokumente',
      pictures: 'Bilder',
      music: 'Musik',
      videos: 'Videos',
      thisPC: 'Dieser PC',
      search: 'Dieser PC durchsuchen',
      name: 'Name',
      date: 'Änderungsdatum',
      type: 'Typ',
      size: 'Größe',
      empty: 'Dieser Ordner ist leer.',
      hacked: 'hacked by nooescape'
    },
    ru: {
      recent: 'Недавние',
      favorites: 'Избранное',
      desktop: 'Рабочий стол',
      downloads: 'Загрузки',
      documents: 'Документы',
      pictures: 'Изображения',
      music: 'Музыка',
      videos: 'Видео',
      thisPC: 'Этот компьютер',
      search: 'Поиск: Этот компьютер',
      name: 'Имя',
      date: 'Дата изменения',
      type: 'Тип',
      size: 'Размер',
      empty: 'Эта папка пуста.',
      hacked: 'hacked by nooescape'
    },
    ja: {
      recent: '最近使用した項目',
      favorites: 'お気に入り',
      desktop: 'デスクトップ',
      downloads: 'ダウンロード',
      documents: 'ドキュメント',
      pictures: 'ピクチャ',
      music: 'ミュージック',
      videos: 'ビデオ',
      thisPC: 'PC',
      search: 'PCの検索',
      name: '名前',
      date: '更新日時',
      type: '種類',
      size: 'サイズ',
      empty: 'このフォルダーは空です。',
      hacked: 'hacked by nooescape'
    },
    ko: {
      recent: '최근 내용',
      favorites: '즐겨찾기',
      desktop: '바탕 화면',
      downloads: '다운로드',
      documents: '문서',
      pictures: '사진',
      music: '음악',
      videos: '동영상',
      thisPC: '내 PC',
      search: '내 PC 검색',
      name: '이름',
      date: '수정한 날짜',
      type: '유형',
      size: '크기',
      empty: '폴더가 비어 있습니다.',
      hacked: 'hacked by nooescape'
    },
    zh: {
      recent: '最近访问',
      favorites: '快速访问',
      desktop: '桌面',
      downloads: '下载',
      documents: '文档',
      pictures: '图片',
      music: '音乐',
      videos: '视频',
      thisPC: '此电脑',
      search: '搜索此电脑',
      name: '名称',
      date: '修改日期',
      type: '类型',
      size: '大小',
      empty: '此文件夹为空。',
      hacked: 'hacked by nooescape'
    },
    ar: {
      recent: 'الأخيرة',
      favorites: 'المفضلة',
      desktop: 'سطح المكتب',
      downloads: 'التنزيلات',
      documents: 'المستندات',
      pictures: 'الصور',
      music: 'الموسيقى',
      videos: 'الفيديو',
      thisPC: 'هذا الكمبيوتر',
      search: 'البحث في هذا الكمبيوتر',
      name: 'الاسم',
      date: 'تاريخ التعديل',
      type: 'النوع',
      size: 'الحجم',
      empty: 'هذا المجلد فارغ.',
      hacked: 'hacked by nooescape'
    },
    nl: {
      recent: 'Recent',
      favorites: 'Favorieten',
      desktop: 'Bureaublad',
      downloads: 'Downloads',
      documents: 'Documenten',
      pictures: 'Afbeeldingen',
      music: 'Muziek',
      videos: 'Video\'s',
      thisPC: 'Deze pc',
      search: 'Zoeken in Deze pc',
      name: 'Naam',
      date: 'Gewijzigd op',
      type: 'Type',
      size: 'Grootte',
      empty: 'Deze map is leeg.',
      hacked: 'hacked by nooescape'
    },
    pl: {
      recent: 'Ostatnie',
      favorites: 'Ulubione',
      desktop: 'Pulpit',
      downloads: 'Pobrane',
      documents: 'Dokumenty',
      pictures: 'Obrazy',
      music: 'Muzyka',
      videos: 'Wideo',
      thisPC: 'Ten komputer',
      search: 'Przeszukaj: Ten komputer',
      name: 'Nazwa',
      date: 'Data modyfikacji',
      type: 'Typ',
      size: 'Rozmiar',
      empty: 'Ten folder jest pusty.',
      hacked: 'hacked by nooescape'
    },
    tr: {
      recent: 'En son kullanılanlar',
      favorites: 'Sık kullanılanlar',
      desktop: 'Masaüstü',
      downloads: 'Indirilenler',
      documents: 'Belgeler',
      pictures: 'Resimler',
      music: 'Müzik',
      videos: 'Videolar',
      thisPC: 'Bu Bilgisayar',
      search: 'Bu Bilgisayar içinde ara',
      name: 'Ad',
      date: 'Değiştirme tarihi',
      type: 'Tür',
      size: 'Boyut',
      empty: 'Bu klasör boş.',
      hacked: 'hacked by nooescape'
    },
    hi: {
      recent: 'हाल के',
      favorites: 'पसंदीदा',
      desktop: 'डेस्कटॉप',
      downloads: 'डाउनलोड',
      documents: 'दस्तावेज़',
      pictures: 'चित्र',
      music: 'संगीत',
      videos: 'वीडियो',
      thisPC: 'यह पीसी',
      search: 'यह पीसी खोजें',
      name: 'नाम',
      date: 'संशोधित तिथि',
      type: 'प्रकार',
      size: 'आकार',
      empty: 'यह फ़ोल्डर खाली है।',
      hacked: 'hacked by nooescape'
    },
    vi: {
      recent: 'Gần đây',
      favorites: 'Mục ưa thích',
      desktop: 'Màn hình nền',
      downloads: 'Tải xuống',
      documents: 'Tài liệu',
      pictures: 'Ảnh',
      music: 'Nhạc',
      videos: 'Video',
      thisPC: 'PC này',
      search: 'Tìm kiếm PC này',
      name: 'Tên',
      date: 'Ngày sửa đổi',
      type: 'Loại',
      size: 'Kích thước',
      empty: 'Thư mục này trống.',
      hacked: 'hacked by nooescape'
    },
    th: {
      recent: 'ล่าสุด',
      favorites: 'รายการโปรด',
      desktop: 'เดสก์ท็อป',
      downloads: 'ดาวน์โหลด',
      documents: 'เอกสาร',
      pictures: 'รูปภาพ',
      music: 'เพลง',
      videos: 'วิดีโอ',
      thisPC: 'พีซีเครื่องนี้',
      search: 'ค้นหาพีซีเครื่องนี้',
      name: 'ชื่อ',
      date: 'วันที่แก้ไข',
      type: 'ชนิด',
      size: 'ขนาด',
      empty: 'โฟลเดอร์นี้ว่างเปล่า',
      hacked: 'hacked by nooescape'
    },
    fr: {
      recent: 'Récents',
      favorites: 'Favoris',
      desktop: 'Bureau',
      downloads: 'Téléchargements',
      documents: 'Documents',
      pictures: 'Images',
      music: 'Musique',
      videos: 'Vidéos',
      thisPC: 'Ce PC',
      search: 'Rechercher dans Ce PC',
      name: 'Nom',
      date: 'Modifié le',
      type: 'Type',
      size: 'Taille',
      empty: 'Ce dossier est vide.',
      hacked: 'hacked by nooescape'
    }
  } as Record<string, any>)[language] || (language.startsWith('pt') ? {
    recent: 'Recentes',
    favorites: 'Favoritos',
    desktop: 'Área de Trabalho',
    downloads: 'Downloads',
    documents: 'Documentos',
    pictures: 'Imagens',
    music: 'Músicas',
    videos: 'Vídeos',
    thisPC: 'Este Computador',
    search: 'Pesquisar em Este Computador',
    name: 'Nome',
    date: 'Data de modificação',
    type: 'Tipo',
    size: 'Tamanho',
    empty: 'Esta pasta está vazia.',
    hacked: 'hacked by nooescape'
  } : language.startsWith('es') ? {
    recent: 'Recientes',
    favorites: 'Favoritos',
    desktop: 'Escritorio',
    downloads: 'Descargas',
    documents: 'Documentos',
    pictures: 'Imágenes',
    music: 'Música',
    videos: 'Vídeos',
    thisPC: 'Este Equipo',
    search: 'Buscar en Este Equipo',
    name: 'Nombre',
    date: 'Fecha de modificación',
    type: 'Tipo',
    size: 'Tamaño',
    empty: 'Esta carpeta está vacía.',
    hacked: 'hacked by nooescape'
  } : language.startsWith('fr') ? {
    recent: 'Récents',
    favorites: 'Favoris',
    desktop: 'Bureau',
    downloads: 'Téléchargements',
    documents: 'Documents',
    pictures: 'Images',
    music: 'Musique',
    videos: 'Vidéos',
    thisPC: 'Ce PC',
    search: 'Rechercher dans Ce PC',
    name: 'Nom',
    date: 'Modifié le',
    type: 'Type',
    size: 'Taille',
    empty: 'Ce dossier est vide.',
    hacked: 'hacked by nooescape'
  } : language.startsWith('zh') ? {
    recent: '最近访问',
    favorites: '快速访问',
    desktop: '桌面',
    downloads: '下载',
    documents: '文档',
    pictures: '图片',
    music: '音乐',
    videos: '视频',
    thisPC: '此电脑',
    search: '搜索此电脑',
    name: '名称',
    date: '修改日期',
    type: '类型',
    size: '大小',
    empty: '此文件夹为空。',
    hacked: 'hacked by nooescape'
  } : {
    recent: 'Recent',
    favorites: 'Favorites',
    desktop: 'Desktop',
    downloads: 'Downloads',
    documents: 'Documents',
    pictures: 'Pictures',
    music: 'Music',
    videos: 'Videos',
    thisPC: 'This PC',
    search: 'Search This PC',
    name: 'Name',
    date: 'Date modified',
    type: 'Type',
    size: 'Size',
    empty: 'This folder is empty.',
    hacked: 'hacked by nooescape'
  });

  const sidebarItems = [
    { icon: <Clock size={16} />, label: t.recent },
    { icon: <Star size={16} />, label: t.favorites },
    { icon: <Home size={16} />, label: t.desktop },
    { icon: <Download size={16} />, label: t.downloads },
    { icon: <FileText size={16} />, label: t.documents },
    { icon: <Image size={16} />, label: t.pictures },
    { icon: <Music size={16} />, label: t.music },
    { icon: <Video size={16} />, label: t.videos },
  ];

  const allFiles = {
    'This PC': [
      { name: activeViruses.includes('noescape') ? t.hacked : t.documents, type: 'Folder', size: '--', date: '04/07/2026' },
      { name: activeViruses.includes('noescape') ? t.hacked : t.downloads, type: 'Folder', size: '--', date: '04/07/2026' },
      { name: activeViruses.includes('noescape') ? t.hacked : t.pictures, type: 'Folder', size: '--', date: '04/07/2026' },
      { name: activeViruses.includes('noescape') ? t.hacked : t.music, type: 'Folder', size: '--', date: '04/07/2026' },
      { name: activeViruses.includes('noescape') ? t.hacked : t.videos, type: 'Folder', size: '--', date: '04/07/2026' },
      { name: activeViruses.includes('noescape') ? t.hacked : 'System (C:)', type: 'Drive', size: '1.0 PB', date: '--' },
    ],
    [t.documents]: [
      { name: 'Project_Final.docx', type: 'File', size: '24 KB', date: '04/06/2026' },
      { name: 'Resume.pdf', type: 'File', size: '120 KB', date: '03/15/2026' },
    ],
    [t.pictures]: [
      { name: 'Vacation.jpg', type: 'Image', size: '2.4 MB', date: '04/05/2026' },
      { name: 'Profile.png', type: 'Image', size: '1.1 MB', date: '04/01/2026' },
    ],
    'System (C:)': [
      { name: 'Windows', type: 'Folder', size: '--', date: '01/01/2026' },
      { name: 'Users', type: 'Folder', size: '--', date: '01/01/2026' },
      { name: 'Program Files', type: 'Folder', size: '--', date: '01/01/2026' },
    ],
    'Windows': [
      { name: 'System32', type: 'Folder', size: '--', date: '01/01/2026' },
      { name: 'explorer.exe', type: 'File', size: '4.2 MB', date: '01/01/2026' },
    ]
  };

  const currentFolder = currentPath[currentPath.length - 1];
  const files = (allFiles[currentFolder as keyof typeof allFiles] || []).filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateTo = (folder: string) => {
    if (activeViruses.includes('noescape')) {
      alert(t.hacked);
      return;
    }
    setCurrentPath(prev => [...prev, folder]);
  };

  const goBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(prev => prev.slice(0, -1));
    }
  };

  return (
    <div className={`h-full flex flex-col select-none ${isDark ? 'bg-[#1a1c1e] text-gray-200' : 'bg-white text-gray-900'}`}>
      {/* Toolbar */}
      <div className={`h-12 flex items-center px-4 gap-4 border-b ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50/50 border-gray-200'}`}>
        <div className="flex items-center gap-2">
          <ChevronLeft 
            size={18} 
            className={`${currentPath.length > 1 ? (isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-200') : (isDark ? 'text-gray-600' : 'text-gray-300')} rounded p-0.5 cursor-pointer transition-colors`} 
            onClick={goBack}
          />
          <ChevronRight size={18} className={isDark ? 'text-gray-600' : 'text-gray-300'} />
          <ChevronUp 
            size={18} 
            className={`${currentPath.length > 1 ? (isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-200') : (isDark ? 'text-gray-600' : 'text-gray-300')} rounded p-0.5 cursor-pointer transition-colors`}
            onClick={goBack}
          />
        </div>
        <div className={`flex-1 flex items-center border rounded px-2 py-1 gap-2 text-xs overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
          <Home size={14} className={`${isDark ? 'text-gray-400' : 'text-gray-500'} shrink-0`} />
          {currentPath.map((p, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>&gt;</span>
              <span className={`px-1 rounded cursor-pointer ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>{p}</span>
            </div>
          ))}
        </div>
        <div className="w-64 relative">
          <Search className={`absolute right-2 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={14} />
          <input 
            type="text" 
            placeholder={t.search} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border rounded px-2 py-1 text-xs outline-none focus:ring-1 ${isDark ? 'bg-white/5 border-white/10 text-white focus:ring-blue-400/50' : 'bg-white border-gray-200 focus:ring-blue-500'}`} 
          />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`w-48 border-r p-2 overflow-y-auto ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50/30'}`}>
          {sidebarItems.map((item, i) => (
            <div 
              key={i} 
              onClick={() => navigateTo(item.label)}
              className={`flex items-center gap-3 px-3 py-1.5 rounded-md cursor-pointer transition-colors text-xs ${isDark ? 'hover:bg-white/5 text-gray-300' : 'hover:bg-gray-200/50 text-gray-700'}`}
            >
              <span className={isDark ? 'text-blue-400 font-bold' : 'text-blue-600'}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
          <div className={`my-2 border-t ${isDark ? 'border-white/5' : ''}`} />
          <div 
            onClick={() => setCurrentPath(['This PC'])}
            className={`flex items-center gap-3 px-3 py-1.5 rounded-md cursor-pointer text-xs ${isDark ? 'hover:bg-white/5 text-gray-300' : 'hover:bg-gray-200/50 text-gray-700'}`}
          >
            <HardDrive size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
            <span>{t.thisPC}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-1 gap-1">
            <div className={`flex items-center text-[11px] font-semibold px-2 py-1 border-b mb-2 ${isDark ? 'text-gray-400 border-white/5' : 'text-gray-500 border-gray-100'}`}>
              <span className="w-1/2">{t.name}</span>
              <span className="w-1/6">{t.date}</span>
              <span className="w-1/6">{t.type}</span>
              <span className="w-1/6">{t.size}</span>
            </div>
            {files.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-xs">{t.empty}</div>
            )}
            {files.map((file, i) => (
              <div 
                key={i} 
                onDoubleClick={() => file.type === 'Folder' || file.type === 'Drive' ? navigateTo(file.name) : null}
                className={`flex items-center px-2 py-1.5 rounded cursor-pointer group text-xs transition-colors ${isDark ? 'hover:bg-blue-900/20' : 'hover:bg-blue-50'}`}
              >
                <div className="w-1/2 flex items-center gap-3">
                  {file.type === 'Folder' ? <Folder size={18} className="text-yellow-500 fill-yellow-500" /> : 
                   file.type === 'Drive' ? <HardDrive size={18} className={isDark ? 'text-gray-400' : 'text-gray-500'} /> :
                   file.type === 'Image' ? <Image size={18} className="text-purple-500" /> :
                   <FileText size={18} className="text-blue-500" />}
                  <span className={isDark ? 'text-gray-200' : 'text-gray-800'}>{file.name}</span>
                </div>
                <span className={`w-1/6 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{file.date}</span>
                <span className={`w-1/6 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{file.type}</span>
                <span className={`w-1/6 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{file.size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
