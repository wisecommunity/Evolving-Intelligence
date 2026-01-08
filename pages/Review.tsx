
import React, { useState, useMemo, useEffect } from 'react';
import { Section } from '../components/Section';
import { Search, Tag, Clock, ChevronDown, ChevronRight, Filter, X, LayoutGrid, Sparkles, ExternalLink, Loader2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { ARTICLE_CATEGORIES } from '../constants';
import { CategoryNode, Article } from '../types';

// --- Helper Functions ---

// Strip HTML tags from excerpt
const stripHtml = (html: string) => {
   const tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
};

// Decode HTML entities (like &#8217;) in titles
const decodeHtmlEntities = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

// Check if a date is within the last 30 days
const isRecent = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 30;
};

// --- Helper Components ---

interface CategoryItemProps {
  node: CategoryNode;
  selectedIds: string[];
  onSelect: (id: string, name: string) => void;
  depth?: number;
}

// Recursive Category Item
const CategoryItem: React.FC<CategoryItemProps> = ({ 
  node, 
  selectedIds, 
  onSelect, 
  depth = 0 
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedIds.includes(node.id);
  
  // Check if any descendant is selected to auto-expand parent nodes
  const hasSelectedDescendant = useMemo(() => {
      if (!node.children) return false;
      const findSelected = (nodes: CategoryNode[]): boolean => {
          for (const n of nodes) {
              if (selectedIds.includes(n.id)) return true;
              if (n.children && findSelected(n.children)) return true;
          }
          return false;
      };
      return findSelected(node.children);
  }, [node, selectedIds]);

  // Initial state includes check for selected descendants
  const [isExpanded, setIsExpanded] = useState(depth < 1 || hasSelectedDescendant);

  // Sync effect: Expand if a child becomes selected
  useEffect(() => {
      if (hasSelectedDescendant) {
          setIsExpanded(true);
      }
  }, [hasSelectedDescendant]);

  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    }
  };

  const handleClick = () => {
    onSelect(node.id, node.name);
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center py-2 pr-2 cursor-pointer transition-colors rounded-lg group ${
          isSelected ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <button 
            onClick={handleToggle}
            className="p-1 rounded-md hover:bg-slate-200 mr-1 text-slate-400 focus:outline-none"
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
        {!hasChildren && <span className="w-6 mr-1"></span>} {/* Spacer for alignment */}
        
        <span className="text-[15px] leading-snug">{node.name}</span>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-0.5 border-l border-slate-100 ml-4 mb-1">
          {node.children!.map(child => (
            <CategoryItem 
              key={child.id} 
              node={child} 
              selectedIds={selectedIds} 
              onSelect={onSelect} 
              depth={depth + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

// Article Card Component
const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-pointer"
  >
    <div className="relative h-48 overflow-hidden bg-slate-100">
      {article.image ? (
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=800&auto=format&fit=crop';
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
          <Sparkles size={48} opacity={0.2} />
        </div>
      )}
      
      {article.isNew && (
        <div className="absolute top-3 right-3 bg-brand-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md flex items-center z-10">
          <Sparkles size={12} className="mr-1" />
          NEW
        </div>
      )}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
        <div className="flex items-center text-white/90 text-xs font-medium">
           <Clock size={12} className="mr-1.5" />
           {new Date(article.date).toLocaleDateString()}
        </div>
      </div>
    </div>
    
    <div className="p-5 flex-1 flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-brand-700 transition-colors line-clamp-2" title={article.title}>
        {decodeHtmlEntities(article.title)}
      </h3>
      <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
        {stripHtml(article.excerpt)}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {article.categories.slice(0, 2).map((cat, idx) => (
             <span key={`cat-${idx}`} className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-[11px] rounded font-medium">
                {cat}
            </span>
        ))}
        {article.tags.slice(0, 3).map((tag, idx) => (
          <span key={`tag-${idx}`} className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-[11px] rounded font-medium">
             <Tag size={10} className="mr-1 opacity-50" />
             {tag}
          </span>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <span className="text-xs font-bold text-brand-600 flex items-center group-hover:underline">
              閱讀全文 <ArrowRight size={12} className="ml-1" />
          </span>
      </div>
    </div>
  </div>
);

interface ArticleDetailProps {
  article: Article;
  onClose: () => void;
  onCategoryClick: (category: string) => void;
  nextArticle?: Article | null;
  onNextArticle?: () => void;
}

// Full Article Detail View
const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onClose, onCategoryClick, nextArticle, onNextArticle }) => {
    // Scroll to top when mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen">
             {/* Simple Navigation for Detail View */}
            <div className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
                     <button 
                        onClick={onClose}
                        className="flex items-center text-slate-600 hover:text-brand-700 font-bold transition-colors text-sm md:text-base"
                     >
                        <ArrowLeft size={20} className="mr-2" />
                        返回專欄
                     </button>
                     <div className="flex gap-2">
                        {/* Original Link Removed as per request */}
                     </div>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <header className="mb-10 text-center">
                     <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {article.categories.map((cat, i) => (
                            <button 
                              key={i} 
                              onClick={() => onCategoryClick(cat)}
                              className="px-3 py-1 bg-brand-50 text-brand-700 text-sm font-bold rounded-full hover:bg-brand-100 hover:shadow-sm transition-all"
                              title={`查看 "${cat}" 分類的所有文章`}
                            >
                              {cat}
                            </button>
                        ))}
                     </div>
                     <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-slate-900 mb-6 leading-tight">
                        {decodeHtmlEntities(article.title)}
                     </h1>
                     <div className="flex items-center justify-center text-slate-500 text-sm font-medium gap-6">
                        <span className="flex items-center"><Clock size={16} className="mr-2"/> {new Date(article.date).toLocaleDateString()}</span>
                     </div>
                </header>

                {/* Featured Image Removed to prevent duplication with content image */}

                {/* Content - Using Tailwind Typography Plugin Classes */}
                <div 
                    className="prose prose-slate max-w-none lg:prose-lg prose-headings:font-serif prose-headings:text-slate-900 prose-a:text-brand-700 hover:prose-a:text-brand-800 prose-img:rounded-xl prose-img:shadow-md"
                    dangerouslySetInnerHTML={{ __html: article.content || '<p>無內容</p>' }}
                />

                {/* Footer / Tags */}
                <div className="mt-16 pt-8 border-t border-slate-200">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">標籤</h4>
                    <div className="flex flex-wrap gap-2 mb-12">
                        {article.tags.map(tag => (
                            <span key={tag} className="flex items-center text-slate-600 bg-slate-100 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors cursor-default">
                                <Tag size={14} className="mr-2 opacity-50"/> {tag}
                            </span>
                        ))}
                    </div>

                    {/* Next Article Navigation */}
                    {nextArticle && (
                      <div className="border-t border-dashed border-slate-200 pt-8 flex justify-end">
                        <button 
                          onClick={onNextArticle}
                          className="group text-right max-w-md w-full sm:w-auto"
                        >
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-hover:text-brand-600 transition-colors flex items-center justify-end">
                            下一篇 <ArrowRight size={14} className="ml-1" />
                          </div>
                          <div className="flex items-center justify-end gap-4">
                             <div className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-brand-700 transition-colors leading-tight line-clamp-2">
                               {decodeHtmlEntities(nextArticle.title)}
                             </div>
                             <div className="shrink-0 p-3 bg-slate-50 rounded-full group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                                <ChevronRight size={24} />
                             </div>
                          </div>
                        </button>
                      </div>
                    )}
                </div>
            </article>
        </div>
    );
};


export const Review: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(''); // For filtering by WP category name
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // --- WordPress API Fetching ---
  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        setLoading(true);
        const batchSize = 100;
        let allPosts: any[] = [];
        let page = 1;

        // 1. Fetch First Batch to get Total Count
        const response = await fetch(`https://public-api.wordpress.com/rest/v1.1/sites/wisecaseteam.wordpress.com/posts/?number=${batchSize}&page=${page}`);
        if (!response.ok) throw new Error('Failed to fetch initial articles');
        const data = await response.json();
        
        allPosts = [...data.posts];
        const totalPosts = data.found;

        // 2. Fetch Remaining Pages in Parallel if needed
        if (totalPosts > allPosts.length) {
            const totalPages = Math.ceil(totalPosts / batchSize);
            const promises = [];
            for (let i = 2; i <= totalPages; i++) {
                promises.push(
                    fetch(`https://public-api.wordpress.com/rest/v1.1/sites/wisecaseteam.wordpress.com/posts/?number=${batchSize}&page=${i}`)
                        .then(res => res.json())
                        .then(d => d.posts)
                        .catch(e => {
                            console.error(`Error fetching page ${i}`, e);
                            return [];
                        })
                );
            }
            
            const remainingPostsResults = await Promise.all(promises);
            remainingPostsResults.forEach(posts => {
                allPosts = [...allPosts, ...posts];
            });
        }
        
        // 3. Transform API response to our Article type
        const mappedArticles: Article[] = allPosts.map((post: any) => ({
          id: post.ID.toString(),
          title: post.title,
          date: post.date,
          image: post.featured_image || '', 
          excerpt: post.excerpt,
          // Extract category names into an array
          categories: post.categories ? Object.values(post.categories).map((c: any) => c.name) : [],
          // Extract tag names into an array
          tags: post.tags ? Object.values(post.tags).map((t: any) => t.name) : [],
          link: post.URL,
          content: post.content, // Add content mapping
          isNew: isRecent(post.date)
        }));

        setArticles(mappedArticles);
      } catch (err) {
        console.error("Error fetching WP posts:", err);
        setError("目前無法載入文章，請稍後再試。");
      } finally {
        setLoading(false);
      }
    };

    fetchAllArticles();
  }, []);


  // --- Filter Logic Helpers ---

  // Find node by ID in the tree
  const findNodeById = (nodes: CategoryNode[], id: string): CategoryNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // NEW: Find node ID by Name to sync sidebar when clicking article category
  const findCategoryIdByName = (nodes: CategoryNode[], name: string): string | null => {
    for (const node of nodes) {
      // Use trim for safer comparison
      if (node.name.trim() === name) return node.id;
      if (node.children) {
        const found = findCategoryIdByName(node.children, name);
        if (found) return found;
      }
    }
    return null;
  };

  // Handle Category Selection
  const handleCategorySelect = (id: string, name: string) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds([]);
      setSelectedCategoryName('');
    } else {
      setSelectedCategoryIds([id]);
      setSelectedCategoryName(name);
    }
    // Reset visible count when filter changes to show top results first
    setVisibleCount(12);
    if (window.innerWidth < 1024) {
      setIsMobileFilterOpen(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategoryIds([]);
    setSelectedCategoryName('');
    setVisibleCount(12);
  };

  // Reset pagination when search query changes
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery]);

  // Filtering Logic
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // 1. Search Filter
      const query = searchQuery.toLowerCase();
      const title = decodeHtmlEntities(article.title).toLowerCase();
      const tags = article.tags.join(' ').toLowerCase();
      const categories = article.categories.join(' ').toLowerCase();
      
      const matchesSearch = 
        title.includes(query) || 
        tags.includes(query) ||
        categories.includes(query);

      if (!matchesSearch) return false;

      // 2. Category Filter
      if (selectedCategoryName) {
         const filterName = selectedCategoryName.toLowerCase();
         const articleMetadata = [...article.categories, ...article.tags].join(' ').toLowerCase();
         
         if (!articleMetadata.includes(filterName)) {
             return false;
         }
      }

      return true;
    });
  }, [searchQuery, selectedCategoryName, articles]);

  const activeCategoryLabel = selectedCategoryName || '所有文章';
  const visibleArticles = filteredArticles.slice(0, visibleCount);

  // --- Render logic for Detail View vs List View ---
  if (selectedArticle) {
      // Find the index of current article in the filtered list to determine the next one
      const currentIndex = filteredArticles.findIndex(a => a.id === selectedArticle.id);
      const nextArticle = currentIndex >= 0 && currentIndex < filteredArticles.length - 1 
          ? filteredArticles[currentIndex + 1] 
          : null;

      return (
          <div className="pt-20">
             <ArticleDetail 
                article={selectedArticle} 
                onClose={() => setSelectedArticle(null)}
                onCategoryClick={(category) => {
                    setSelectedArticle(null);
                    setSelectedCategoryName(category);

                    // Sync sidebar selection by finding ID from name
                    // Decode entities (e.g. &amp; -> &) and trim to ensure matching
                    const cleanName = decodeHtmlEntities(category).trim();
                    const matchedId = findCategoryIdByName(ARTICLE_CATEGORIES, cleanName);
                    
                    if (matchedId) {
                        setSelectedCategoryIds([matchedId]);
                    } else {
                        // If no match found in sidebar tree, clear IDs so "All" isn't active
                        // We still filter by name via selectedCategoryName
                        setSelectedCategoryIds([]);
                    }
                    
                    setSearchQuery(''); // Clear search
                    window.scrollTo(0, 0);
                }}
                nextArticle={nextArticle}
                onNextArticle={() => {
                  if (nextArticle) {
                    setSelectedArticle(nextArticle);
                    window.scrollTo(0, 0);
                  }
                }}
             />
          </div>
      );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <Section 
        title="實戰專欄 (EIC Review)" 
        subtitle="透過度化智能的文章分享交流，達到眾智共享的目的"
        className="pb-8"
      >
        
        {/* Top Search Bar */}
        <div className="max-w-4xl mx-auto mb-12 relative z-20">
            <div className="relative shadow-lg rounded-full">
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜尋文章標題、關鍵字或標籤..." 
                    className="w-full px-6 py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-base md:text-lg pl-14"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                {searchQuery && (
                   <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors">
                      <X size={16} />
                   </button>
                )}
            </div>
        </div>

        {/* Content Layout: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden w-full flex justify-between items-center mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-20 z-10">
             <span className="font-bold text-slate-800 flex items-center">
               <LayoutGrid size={18} className="mr-2 text-brand-600" />
               {activeCategoryLabel}
             </span>
             <button 
               onClick={() => setIsMobileFilterOpen(true)}
               className="flex items-center px-4 py-2 bg-slate-100 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors"
             >
               <Filter size={16} className="mr-2" />
               分類篩選
             </button>
          </div>

          {/* Sidebar Navigation (Desktop: Sticky, Mobile: Drawer) */}
          <aside className={`
            fixed inset-0 z-50 bg-black/50 lg:bg-transparent lg:static lg:w-1/4 lg:block transition-opacity duration-300
            ${isMobileFilterOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:opacity-100 lg:visible'}
          `}>
             <div className={`
               bg-white h-full w-4/5 max-w-xs lg:w-full lg:rounded-2xl lg:border lg:border-slate-200 lg:shadow-sm lg:h-[calc(100vh-120px)] lg:sticky lg:top-24 overflow-y-auto transform transition-transform duration-300 ease-in-out p-6 lg:p-4
               ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
             `}>
                <div className="flex justify-between items-center mb-6 lg:mb-4">
                   <h3 className="font-bold text-slate-900 text-lg font-serif">文章分類</h3>
                   <button onClick={() => setIsMobileFilterOpen(false)} className="lg:hidden p-2 bg-slate-100 rounded-full">
                     <X size={20} />
                   </button>
                </div>

                <div className="space-y-1">
                   <div 
                      className={`flex items-center py-2 px-3 cursor-pointer transition-colors rounded-lg font-bold ${
                        selectedCategoryIds.length === 0 && !selectedCategoryName ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                      onClick={() => handleCategorySelect('', '')}
                   >
                      <LayoutGrid size={16} className="mr-2" />
                      全部文章
                   </div>
                   <div className="h-px bg-slate-100 my-2"></div>
                   {ARTICLE_CATEGORIES.map(category => (
                     <CategoryItem 
                       key={category.id} 
                       node={category} 
                       selectedIds={selectedCategoryIds}
                       onSelect={handleCategorySelect}
                     />
                   ))}
                </div>
             </div>
          </aside>

          {/* Article Grid Area */}
          <div className="w-full lg:w-3/4 min-h-[500px]">
             
             {/* Header Status */}
             <div className="flex justify-between items-end mb-6 px-2">
                <div>
                   <h2 className="text-2xl font-bold text-slate-900 mb-1">{activeCategoryLabel}</h2>
                   <p className="text-slate-500 text-sm">
                      {loading ? '載入中...' : `共 ${filteredArticles.length}  篇文章`}
                   </p>
                </div>
                {(selectedCategoryIds.length > 0 || searchQuery) && (
                   <button 
                     onClick={clearFilters}
                     className="text-sm text-brand-600 hover:underline font-medium"
                   >
                     清除篩選
                   </button>
                )}
             </div>

             {/* Loading State */}
             {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm h-96 animate-pulse">
                            <div className="h-48 bg-slate-200"></div>
                            <div className="p-5 space-y-4">
                                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-slate-200 rounded"></div>
                                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <div className="h-6 w-16 bg-slate-200 rounded"></div>
                                    <div className="h-6 w-16 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             )}

             {/* Error State */}
             {!loading && error && (
                 <div className="bg-red-50 text-red-700 p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-red-100">
                     <AlertCircle size={48} className="mb-4 opacity-50" />
                     <h3 className="text-lg font-bold mb-2">載入失敗</h3>
                     <p>{error}</p>
                     <button 
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors font-bold"
                     >
                        重新整理
                     </button>
                 </div>
             )}

             {/* Empty State */}
             {!loading && !error && filteredArticles.length === 0 && (
               <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                  <div className="inline-block p-4 bg-slate-50 rounded-full mb-4">
                     <Search size={32} className="text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">找不到相關文章</h3>
                  <p className="text-slate-500">
                    試著調整搜尋關鍵字或選擇其他分類。<br/>
                    (目前分類篩選採用標籤名稱比對，請確認文章是否有對應標籤)
                  </p>
                  <button onClick={clearFilters} className="mt-6 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
                    查看所有文章
                  </button>
               </div>
             )}

             {/* Content Grid with Client-Side Pagination */}
             {!loading && !error && visibleArticles.length > 0 && (
               <>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {visibleArticles.map((article) => (
                       <ArticleCard 
                          key={article.id} 
                          article={article} 
                          onClick={() => setSelectedArticle(article)}
                       />
                     ))}
                   </div>
                   
                   {/* Load More Button */}
                   {visibleCount < filteredArticles.length && (
                        <div className="mt-12 flex justify-center">
                           <button 
                                onClick={() => setVisibleCount(prev => prev + 12)}
                                className="px-6 py-3 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 hover:text-brand-700 transition-colors font-medium shadow-sm"
                           >
                              載入更多文章 ({filteredArticles.length - visibleCount})
                           </button>
                        </div>
                   )}
               </>
             )}
             
          </div>

        </div>
      </Section>
    </div>
  );
};
