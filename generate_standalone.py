import pathlib

def extract_data():
    text = pathlib.Path('KyotoGuide.jsx').read_text()
    start = text.index('const PLACES_DATA = [')
    end = text.index('];', start)
    return text[text.index('[', start):end+2]

def build_file(data_section: str) -> str:
    header = """import React, { useMemo, useState } from \"https://esm.sh/react@18?dev\";
import { createRoot } from \"https://esm.sh/react-dom@18/client?dev\";
import htm from \"https://esm.sh/htm@3.1.1?dev\";
import { MapPin, Clock, Star, Train, Info } from \"https://esm.sh/lucide-react@0.428.0?dev\";

const html = htm.bind(React.createElement);

const PLACES_DATA = """

    body = """const categories = [
  { id: \"A\", label: \"A 食\" },
  { id: \"B\", label: \"B 景點\" },
  { id: \"C\", label: \"C 寺廟\" },
  { id: \"D\", label: \"D 溫泉\" },
  { id: \"E\", label: \"E 同志場所\" },
];

const defaultHours = { open: 10, close: 20 };

const PlaceCard = ({ place, rank }) => {
  const now = new Date();
  const hour = now.getHours();
  const isOpen = hour >= defaultHours.open && hour < defaultHours.close;
  return html`<div className=\"bg-white shadow-sm rounded-xl p-4 flex flex-col gap-2 border border-slate-100\">
    <div className=\"flex items-start justify-between\">
      <div>
        <div className=\"text-sm text-slate-500\">#${rank}</div>
        <h3 className=\"text-lg font-semibold text-slate-800\">${place.name}</h3>
        <p className=\"text-xs text-emerald-600 flex items-center gap-1\">
          <${Clock} size=${14} />
          ${isOpen ? \"Open now\" : \"Closed\"} · ${defaultHours.open}:00 - ${defaultHours.close}:00
        </p>
      </div>
      <div className=\"flex items-center gap-1 text-amber-500 text-sm\">
        <${Star} size=${16} />
        <span>${place.rating ?? \"N/A\"}</span>
      </div>
    </div>
    <div className=\"flex items-center gap-2 text-sm text-slate-600\">
      <${MapPin} size=${16} className=\"text-rose-500\" />
      <span>${place.subCategory}</span>
      ${place.childCategory ? html`<span className=\"text-xs text-slate-400\">/ ${place.childCategory}</span>` : null}
    </div>
    <div className=\"flex items-center gap-2 text-sm text-slate-500\">
      <${Train} size=${16} className=\"text-indigo-500\" />
      <span>${place.transport || \"地點未提供\"}</span>
    </div>
    <p className=\"text-sm text-slate-700 leading-relaxed flex items-start gap-2\">
      <${Info} size=${16} className=\"text-blue-500 mt-0.5\" />
      <span>${place.description || \"\"}</span>
    </p>
  </div>`;
};

const KyotoGuide = () => {
  const [activeCategory, setActiveCategory] = useState(\"A\");
  const [activeSub, setActiveSub] = useState(null);
  const [activeChild, setActiveChild] = useState(null);

  const filteredByCategory = useMemo(() => PLACES_DATA.filter((item) => item.category === activeCategory), [activeCategory]);

  const subCategories = useMemo(() => {
    const map = new Map();
    filteredByCategory.forEach((item) => {
      if (!map.has(item.subCategoryId)) {
        map.set(item.subCategoryId, item.subCategory);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [filteredByCategory]);

  const childCategories = useMemo(() => {
    if (!activeSub) return [];
    const set = new Set(
      filteredByCategory
        .filter((item) => item.subCategoryId === activeSub && item.childCategory)
        .map((item) => item.childCategory)
    );
    return Array.from(set);
  }, [activeSub, filteredByCategory]);

  const places = useMemo(() => {
    let list = filteredByCategory;
    if (activeSub) {
      list = list.filter((item) => item.subCategoryId === activeSub);
    }
    if (activeChild) {
      list = list.filter((item) => item.childCategory === activeChild);
    }
    return list;
  }, [filteredByCategory, activeSub, activeChild]);

  const resetFilters = (cat) => {
    setActiveCategory(cat);
    setActiveSub(null);
    setActiveChild(null);
  };

  return html`<div className=\"min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 sm:p-8 text-slate-900 font-sans\">
    <div className=\"max-w-5xl mx-auto\">
      <header className=\"mb-6 sm:mb-8\">
        <p className=\"text-xs font-semibold text-emerald-600 uppercase tracking-widest\">Kyoto Food & Spot Guide</p>
        <h1 className=\"text-3xl sm:text-4xl font-bold text-slate-900\">城市美食與景點精選</h1>
        <p className=\"text-sm text-slate-600 mt-2\">透過分級篩選快速找到咖哩、甜點、寺廟、溫泉與同志友善場所。</p>
      </header>
      <nav className=\"flex gap-2 overflow-x-auto pb-2 mb-4\">
        ${categories.map((cat) => html`<button
            key=${cat.id}
            onClick=${() => resetFilters(cat.id)}
            className=${`px-4 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
              activeCategory === cat.id ? \"bg-slate-900 text-white border-slate-900\" : \"bg-white text-slate-700 border-slate-200 hover:border-slate-400\"
            }`}
          >${cat.label}</button>`)}
      </nav>
      <div className=\"flex flex-wrap gap-2 mb-3\">
        ${subCategories.map((sub) => html`<button
            key=${sub.id}
            onClick=${() => { setActiveSub(sub.id); setActiveChild(null); }}
            className=${`px-3 py-2 rounded-full text-sm border transition ${
              activeSub === sub.id ? \"bg-emerald-600 text-white border-emerald-600\" : \"bg-white text-slate-700 border-slate-200 hover:border-slate-400\"
            }`}
          >${sub.name}</button>`)}
      </div>
      ${childCategories.length > 0 ? html`<div className=\"flex flex-wrap items-center gap-3 mb-4 text-sm\">
          <span className=\"text-slate-500\">子分類：</span>
          ${childCategories.map((child) => html`<button
              key=${child}
              onClick=${() => setActiveChild(child)}
              className=${`underline-offset-4 transition ${
                activeChild === child ? \"text-emerald-700 underline\" : \"text-slate-600 hover:text-slate-900\"
              }`}
            >${child}</button>`)}
          <button onClick=${() => setActiveChild(null)} className=\"text-xs text-slate-400 hover:text-slate-600\">清除</button>
        </div>` : null}
      <div className=\"grid gap-4 sm:grid-cols-2\">
        ${places.map((place, index) => html`<${PlaceCard} key=${place.id} place=${place} rank=${index + 1} />`)}
      </div>
    </div>
  </div>`;
};

const mountNode = document.getElementById('root');
if (mountNode) {
  createRoot(mountNode).render(html`<${KyotoGuide} />`);
}
"""
    return "\n".join([header, data_section + ';', '', body, ''])


def main():
    data = extract_data()
    content = build_file(data)
    pathlib.Path('kyoto-guide-standalone.js').write_text(content)


if __name__ == '__main__':
    main()
