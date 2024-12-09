import React, { useState, useMemo } from 'react';
import { Brain, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { BodyPart } from './components/BodyPart';
import { SearchBar } from './components/SearchBar';
import { AnimatedTitle } from './components/AnimatedTitle';
import { bodyParts } from './data/bodyParts';

function App() {
  const [openParts, setOpenParts] = useState<number[]>([1]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParts = useMemo(() => {
    return bodyParts.filter(part => 
      part.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const togglePart = (id: number) => {
    setOpenParts(prev => 
      prev.includes(id) 
        ? prev.filter(partId => partId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 shadow-xl relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
        />
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="bg-white/10 p-4 rounded-full backdrop-blur-sm"
            >
              <Brain className="w-12 h-12" />
            </motion.div>
            <AnimatedTitle text="Atlas del Cuerpo Humano" />
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-4 text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Explora las maravillas del cuerpo humano a través de nuestro atlas interactivo. 
            Descubre datos fascinantes y consejos para mantener cada sistema funcionando en su mejor estado.
          </motion.p>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div 
          className="max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredParts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg"
            >
              <Search className="w-16 h-16 mx-auto mb-6 text-gray-400" />
              <p className="text-2xl text-gray-600 font-medium">No se encontraron resultados para "{searchTerm}"</p>
              <p className="text-gray-500 mt-2">Intenta con otros términos de búsqueda</p>
            </motion.div>
          ) : (
            filteredParts.map(part => (
              <BodyPart
                key={part.id}
                {...part}
                isOpen={openParts.includes(part.id)}
                onToggle={() => togglePart(part.id)}
              />
            ))
          )}
        </motion.div>
      </main>

      <footer className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Atlas del Cuerpo Humano</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Una herramienta educativa interactiva diseñada para explorar y comprender 
              la complejidad y belleza del cuerpo humano.
            </p>
            <div className="border-t border-white/10 pt-6 mt-6">
              <p className="text-sm text-blue-200">
                © {new Date().getFullYear()} Atlas del Cuerpo Humano - Todos los derechos reservados
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;