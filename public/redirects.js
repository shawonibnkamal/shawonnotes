// Client-side redirects for old WordPress URLs to new VitePress URLs
(function () {
  'use strict';

  // URL mappings from old WordPress to new VitePress
  const redirects = {
    // Homepage and main sections
    '/index.php/igcse-edexcel-revision-notes/': '/igcse/revision-notes/',
    '/index.php/edexcel-ial-revision-notes/': '/ial/revision-notes/',
    '/index.php/edexcel-past-papers/': '/igcse/past-papers/',
    '/index.php/edexcel-ial-past-papers/': '/ial/past-papers/',
    '/index.php/edexcel-igcse-specifications/': '/igcse/',
    '/index.php/edexcel-ial-specification/': '/ial/',
    '/index.php/about/': '/',
    '/index.php/contact-us/': '/',
    '/index.php/404-error-page/': '/',
    '/index.php/wpms-html-sitemap/': '/',

    // IGCSE Revision Notes
    '/index.php/igcse-edexcel-revision-notes/chemistry/': '/igcse/revision-notes/chemistry/',
    '/index.php/igcse-edexcel-revision-notes/biology/': '/igcse/revision-notes/biology',
    '/index.php/igcse-edexcel-revision-notes/physics/': '/igcse/revision-notes/physics/',
    '/index.php/igcse-edexcel-revision-notes/mathematics-b/': '/igcse/revision-notes/math-b',
    '/index.php/igcse-edexcel-revision-notes/further-pure-mathematics/': '/igcse/revision-notes/pure-math',
    '/index.php/igcse-edexcel-revision-notes/ict/': '/igcse/revision-notes/ict',

    // IAL Revision Notes
    '/index.php/edexcel-ial-revision-notes/edexcel-ial-chemistry-revision-notes/': '/ial/revision-notes/chemistry',
    '/index.php/edexcel-ial-revision-notes/edexcel-ial-math-revision-notes/': '/ial/revision-notes/math',
    '/index.php/edexcel-ial-revision-notes/edexcel-ial-physics-revision-notes/': '/ial/revision-notes/physics',

    // IGCSE Past Papers - Accounting
    '/index.php/edexcel-past-papers/accounting/': '/igcse/past-papers/accounting/',
    '/index.php/edexcel-past-papers/accounting/gce-o-level/': '/igcse/past-papers/accounting/gce-o-level/',
    '/index.php/edexcel-past-papers/accounting/igcse/': '/igcse/past-papers/accounting/igcse-from-2011/',
    '/index.php/edexcel-past-papers/accounting/international-gcse/': '/igcse/past-papers/accounting/igcse-from-2017/',

    // IGCSE Past Papers - Bengali
    '/index.php/edexcel-past-papers/bengali/': '/igcse/past-papers/bangla/',
    '/index.php/edexcel-past-papers/bengali/gce/': '/igcse/past-papers/bangla/gce/',
    '/index.php/edexcel-past-papers/bengali/international-gcse/': '/igcse/past-papers/bangla/igcse-from-2017/',

    // IGCSE Past Papers - Biology
    '/index.php/edexcel-past-papers/biology/': '/igcse/past-papers/biology/',
    '/index.php/edexcel-past-papers/biology/gce-o-level/': '/igcse/past-papers/biology/gce-o-level/',
    '/index.php/edexcel-past-papers/biology/igcse/': '/igcse/past-papers/biology/igcse-from-2011/',
    '/index.php/edexcel-past-papers/biology/international-gcse/': '/igcse/past-papers/biology/igcse-from-2017/',

    // IGCSE Past Papers - Chemistry
    '/index.php/edexcel-past-papers/chemistry/': '/igcse/past-papers/chemistry/',
    '/index.php/edexcel-past-papers/chemistry/gce/': '/igcse/past-papers/chemistry/gce/',
    '/index.php/edexcel-past-papers/chemistry/igcse/': '/igcse/past-papers/chemistry/igcse-from-2011/',
    '/index.php/edexcel-past-papers/chemistry/international-gcse/': '/igcse/past-papers/chemistry/igcse-from-2017/',

    // IGCSE Past Papers - Economics
    '/index.php/edexcel-past-papers/economics/': '/igcse/past-papers/economics/',
    '/index.php/edexcel-past-papers/economics/gce-o-level/': '/igcse/past-papers/economics/gce-o-level/',
    '/index.php/edexcel-past-papers/economics/international-gcse/': '/igcse/past-papers/economics/igcse-from-2017/',

    // IGCSE Past Papers - English Language B
    '/index.php/edexcel-past-papers/english-language-b/': '/igcse/past-papers/english-language-b/',
    '/index.php/edexcel-past-papers/english-language-b/gce-o-level/': '/igcse/past-papers/english-language-b/gce-o-level/',
    '/index.php/edexcel-past-papers/english-language-b/international-gcse/': '/igcse/past-papers/english-language-b/igcse-from-2017/',

    // IGCSE Past Papers - Further Pure Mathematics
    '/index.php/edexcel-past-papers/further-pure-mathematics/': '/igcse/past-papers/further-pure-mathematics/',
    '/index.php/edexcel-past-papers/further-pure-mathematics/gce-o-level/': '/igcse/past-papers/further-pure-mathematics/gce-o-level/',
    '/index.php/edexcel-past-papers/further-pure-mathematics/international-gcse/': '/igcse/past-papers/further-pure-mathematics/igcse-from-2017/',

    // IGCSE Past Papers - Human Biology
    '/index.php/edexcel-past-papers/human-biology/': '/igcse/past-papers/human-biology/',
    '/index.php/edexcel-past-papers/human-biology/gce-o-level/': '/igcse/past-papers/human-biology/gce-o-level/',
    '/index.php/edexcel-past-papers/human-biology/international-gcse/': '/igcse/past-papers/human-biology/igcse-from-2017/',

    // IGCSE Past Papers - ICT
    '/index.php/edexcel-past-papers/ict/': '/igcse/past-papers/ict/',
    '/index.php/edexcel-past-papers/ict/gce-o-level/': '/igcse/past-papers/ict/gce-o-level/',
    '/index.php/edexcel-past-papers/ict/igcse/': '/igcse/past-papers/ict/igcse-from-2011/',
    '/index.php/edexcel-past-papers/ict/international-gcse/': '/igcse/past-papers/ict/igcse-old/',

    // IGCSE Past Papers - Mathematics B
    '/index.php/edexcel-past-papers/mathematics-b/': '/igcse/past-papers/mathematics-b/',
    '/index.php/edexcel-past-papers/mathematics-b/gce-o-level/': '/igcse/past-papers/mathematics-b/gce-o-level/',
    '/index.php/edexcel-past-papers/mathematics-b/international-gcse/': '/igcse/past-papers/mathematics-b/igcse-from-2017/',

    // IGCSE Past Papers - Physics
    '/index.php/edexcel-past-papers/physics/': '/igcse/past-papers/physics/',
    '/index.php/edexcel-past-papers/physics/gce-o-level/': '/igcse/past-papers/physics/gce-o-level/',
    '/index.php/edexcel-past-papers/physics/igcse/': '/igcse/past-papers/physics/igcse-from-2011/',
    '/index.php/edexcel-past-papers/physics/igcse-2011/': '/igcse/past-papers/physics/igcse-from-2011/',

    // IAL Past Papers - Biology
    '/index.php/edexcel-ial-past-papers/edexcel-as-ial-biology-past-papers/': '/ial/past-papers/biology/',

    // IAL Past Papers - Chemistry
    '/index.php/edexcel-ial-past-papers/edexcel-as-ial-chemistry-past-papers/': '/ial/past-papers/chemistry/',

    // IAL Past Papers - Math
    '/index.php/edexcel-ial-past-papers/edexcel-as-ial-math-past-papers/': '/ial/past-papers/math/',
    '/index.php/edexcel-ial-past-papers/edexcel-as-ial-math-past-papers/edexcel-ial-c12-past-papers/': '/ial/past-papers/math/c12/',
    '/index.php/edexcel-ial-past-papers/edexcel-as-ial-math-past-papers/edexcel-ial-c34-past-papers/': '/ial/past-papers/math/c34/',
    '/index.php/edexcel-ial-past-papers/edexcel-as-ial-math-past-papers/edexcel-ial-m1-past-papers/': '/ial/past-papers/math/m1/',
    '/index.php/edexcel-ial-past-papers/edexcel-as-ial-math-past-papers/edexcel-ial-s1-past-papers/': '/ial/past-papers/math/s1/',

    // IAL Past Papers - Physics
    '/index.php/edexcel-ial-past-papers/edexcel-as-ial-physics-past-papers/': '/ial/past-papers/physics/',
  };

  // Get the current path
  const currentPath = window.location.pathname;

  // Check if current path needs to be redirected
  if (redirects[currentPath]) {
    const newUrl = redirects[currentPath];
    console.log('Redirecting from', currentPath, 'to', newUrl);

    // Redirect immediately
    window.location.replace(newUrl);
  }
})();
