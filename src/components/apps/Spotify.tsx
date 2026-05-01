import { Play, SkipBack, SkipForward, Repeat, Shuffle, ListMusic, Mic2, Volume2, Search, Home, Library, Star } from 'lucide-react';

export default function Spotify() {
  const playlists = [
    { name: 'Liked Songs', count: '128 songs', color: 'from-indigo-900' },
    { name: 'Daily Mix 1', count: 'Made for you', color: 'from-green-900' },
    { name: 'Discover Weekly', count: 'New music for you', color: 'from-blue-900' },
    { name: 'Lofi Beats', count: 'Focus & Study', color: 'from-orange-900' },
  ];

  const songs = [
    { title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20' },
    { title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', album: 'Stay', duration: '2:21' },
    { title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23' },
    { title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: '3:35' },
    { title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', duration: '3:18' },
  ];

  return (
    <div className="h-full flex flex-col bg-black text-white font-sans">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-60 bg-black p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-gray-400 hover:text-white cursor-pointer transition-colors">
              <Home size={24} />
              <span className="font-bold">Home</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 hover:text-white cursor-pointer transition-colors">
              <Search size={24} />
              <span className="font-bold">Search</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 hover:text-white cursor-pointer transition-colors">
              <Library size={24} />
              <span className="font-bold">Your Library</span>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Playlists</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700 to-blue-500 flex items-center justify-center rounded-sm">
                  <Play size={12} fill="white" />
                </div>
                <span className="text-sm font-medium">Create Playlist</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-700 to-indigo-300 flex items-center justify-center rounded-sm">
                  <Star size={12} fill="white" />
                </div>
                <span className="text-sm font-medium">Liked Songs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Good morning</h1>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {playlists.map((p, i) => (
                <div key={i} className="bg-white/10 hover:bg-white/20 transition-colors rounded flex items-center gap-4 cursor-pointer group overflow-hidden">
                  <div className={`w-20 h-20 bg-gradient-to-br ${p.color} shadow-lg`} />
                  <span className="font-bold">{p.name}</span>
                  <div className="ml-auto mr-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                    <Play size={20} fill="black" className="text-black" />
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Popular Songs</h2>
            <div className="space-y-1">
              {songs.map((song, i) => (
                <div key={i} className="grid grid-cols-[40px_1fr_1fr_80px] items-center p-2 hover:bg-white/10 rounded group cursor-pointer">
                  <span className="text-gray-400 group-hover:hidden">{i + 1}</span>
                  <Play size={12} fill="white" className="hidden group-hover:block" />
                  <div className="flex flex-col">
                    <span className="font-medium">{song.title}</span>
                    <span className="text-xs text-gray-400">{song.artist}</span>
                  </div>
                  <span className="text-sm text-gray-400">{song.album}</span>
                  <span className="text-sm text-gray-400 text-right">{song.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Player Bar */}
      <div className="h-24 bg-black border-t border-white/10 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4 w-1/3">
          <div className="w-14 h-14 bg-gray-800 rounded shadow-lg" />
          <div>
            <p className="text-sm font-medium hover:underline cursor-pointer">Blinding Lights</p>
            <p className="text-[11px] text-gray-400 hover:underline cursor-pointer">The Weeknd</p>
          </div>
          <Star size={16} className="text-green-500 ml-2" />
        </div>

        <div className="flex flex-col items-center gap-2 w-1/3">
          <div className="flex items-center gap-6 text-gray-400">
            <Shuffle size={16} className="hover:text-white cursor-pointer" />
            <SkipBack size={20} fill="currentColor" className="hover:text-white cursor-pointer" />
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
              <Play size={18} fill="black" className="text-black ml-1" />
            </div>
            <SkipForward size={20} fill="currentColor" className="hover:text-white cursor-pointer" />
            <Repeat size={16} className="hover:text-white cursor-pointer" />
          </div>
          <div className="w-full flex items-center gap-2">
            <span className="text-[10px] text-gray-400">1:24</span>
            <div className="flex-1 h-1 bg-gray-600 rounded-full relative group cursor-pointer">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-white group-hover:bg-green-500 rounded-full" />
            </div>
            <span className="text-[10px] text-gray-400">3:20</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 w-1/3 text-gray-400">
          <Mic2 size={16} className="hover:text-white cursor-pointer" />
          <ListMusic size={16} className="hover:text-white cursor-pointer" />
          <Volume2 size={16} className="hover:text-white cursor-pointer" />
          <div className="w-24 h-1 bg-gray-600 rounded-full relative group cursor-pointer">
            <div className="absolute top-0 left-0 h-full w-2/3 bg-white group-hover:bg-green-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
